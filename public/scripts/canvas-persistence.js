(function (global) {
  function createCanvasPersistence(options) {
    var sync = new CanvasSyncState();
    var interactionActive = false;
    var deferredLoad = null;
    var loadRequest = 0;
    var latestResponse = 0;
    var revision = null;
    var pendingPayload = null;
    var saveInFlight = null;
    var retryTimer = null;
    var retryAttempt = 0;
    var saveInterrupted = false;
    var waiters = [];
    var draftApplied = false;
    var status = "loading";

    function reportStatus(nextStatus) {
      status = nextStatus;
      if (options.onStatusChange) options.onStatusChange(status);
    }

    function state() {
      return options.getState();
    }

    function payload() {
      var current = state();
      return sync.payload(current.screens, current.texts);
    }

    function readDraft() {
      try {
        var draft = JSON.parse(sessionStorage.getItem(options.draftKey) || "null");
        if (!draft || !draft.payload || !Array.isArray(draft.payload.screens)) return null;
        if (Date.now() - draft.savedAt > 12 * 60 * 60 * 1000) return null;
        if (!draft.base || !Array.isArray(draft.base.screens)) {
          clearDraft();
          return null;
        }
        return draft;
      } catch (_) {
        return null;
      }
    }

    function writeDraft(nextPayload) {
      try {
        sessionStorage.setItem(options.draftKey, JSON.stringify({
          savedAt: Date.now(),
          base: sync.remotePayload(),
          payload: nextPayload,
        }));
      } catch (_) {}
    }

    function clearDraft() {
      try { sessionStorage.removeItem(options.draftKey); } catch (_) {}
    }

    function scheduleRetry() {
      if (retryTimer || !pendingPayload) return;
      var delay = Math.min(500 * Math.pow(2, retryAttempt++), 5000);
      retryTimer = setTimeout(function () {
        retryTimer = null;
        startQueue();
      }, delay);
    }

    async function flushQueue() {
      while (pendingPayload) {
        var nextPayload = pendingPayload;
        pendingPayload = null;
        try {
          var headers = { "Content-Type": "application/json" };
          if (revision) headers["If-Match"] = revision;
          var response = await fetch(options.canvasUrl, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(nextPayload, null, 2),
            keepalive: true,
          });
          if (response.status === 409) {
            var conflict = await response.json();
            revision = response.headers.get("ETag") || conflict.revision || null;
            if (!conflict.current || !Array.isArray(conflict.current.screens)) {
              throw new Error("Canvas changed on disk and could not be merged");
            }
            applyRemote(conflict.current, [], false);
            continue;
          }
          if (!response.ok) throw new Error("Canvas save failed with status " + response.status);
          revision = response.headers.get("ETag") || revision;
          acknowledge(nextPayload);
        } catch (error) {
          if (!pendingPayload) pendingPayload = nextPayload;
          console.error(error);
          if (!saveInterrupted) showToast("Canvas save interrupted. Retrying...");
          saveInterrupted = true;
          reportStatus("retrying");
          scheduleRetry();
          return false;
        }
      }
      clearDraft();
      retryAttempt = 0;
      if (saveInterrupted) showToast("Canvas changes saved");
      saveInterrupted = false;
      reportStatus("saved");
      var completed = waiters;
      waiters = [];
      completed.forEach(function (resolve) { resolve(); });
      return true;
    }

    function startQueue() {
      if (saveInFlight || !pendingPayload) return saveInFlight;
      reportStatus(saveInterrupted ? "retrying" : "saving");
      saveInFlight = flushQueue().finally(function () {
        saveInFlight = null;
        if (pendingPayload && !retryTimer) startQueue();
      });
      return saveInFlight;
    }

    function queue(nextPayload) {
      pendingPayload = nextPayload;
      writeDraft(nextPayload);
      reportStatus(saveInterrupted ? "retrying" : "saving");
      if (retryTimer) {
        clearTimeout(retryTimer);
        retryTimer = null;
      }
      return startQueue();
    }

    function acknowledge(savedPayload) {
      var current = state();
      var acknowledged = new CanvasSyncState();
      acknowledged.ingest(savedPayload);
      acknowledged.recover(sync.payload(current.screens, current.texts));
      sync = acknowledged;
    }

    function save() {
      var current = state();
      sync.capture(current.screens, current.texts);
      return queue(payload());
    }

    function saveAndWait() {
      return new Promise(function (resolve) {
        waiters.push(resolve);
        save();
      });
    }

    function applyRemote(data, changedFiles, reloadAllScreens) {
      var recoveredDraft = false;
      var merged = sync.ingest(data);
      if (!draftApplied) {
        draftApplied = true;
        var draft = readDraft();
        if (draft) {
          var recoveredSync = new CanvasSyncState();
          recoveredSync.ingest(draft.base);
          recoveredSync.recover(draft.payload);
          merged = recoveredSync.ingest(data);
          sync = recoveredSync;
          recoveredDraft = true;
        }
      }
      options.applyState(merged, changedFiles, reloadAllScreens);
      if (recoveredDraft || merged.needsSave) queue(payload());
    }

    function flushDeferred() {
      if (interactionActive || !deferredLoad) return;
      var pending = deferredLoad;
      deferredLoad = null;
      applyRemote(pending.data, pending.changedFiles, pending.reloadAllScreens);
    }

    function setInteractionActive(active) {
      interactionActive = Boolean(active);
      if (!interactionActive) flushDeferred();
    }

    function load(changedFiles, reloadAllScreens) {
      var requestId = ++loadRequest;
      return fetch(options.canvasUrl + "?t=" + Date.now())
        .then(function (response) {
          if (!response.ok) throw new Error("Canvas load failed with status " + response.status);
          return response.json().then(function (data) {
            return { data: data, revision: response.headers.get("ETag") };
          });
        })
        .then(function (result) {
          if (requestId < latestResponse) return true;
          latestResponse = requestId;
          revision = result.revision || revision;
          if (interactionActive) {
            var previousFiles = deferredLoad ? deferredLoad.changedFiles : [];
            deferredLoad = {
              data: result.data,
              changedFiles: Array.from(new Set(previousFiles.concat(changedFiles || []))),
              reloadAllScreens: Boolean(reloadAllScreens || (deferredLoad && deferredLoad.reloadAllScreens)),
            };
            return true;
          }
          applyRemote(result.data, changedFiles, reloadAllScreens);
          if (!pendingPayload && !saveInFlight) reportStatus("saved");
          return true;
        })
        .catch(function (error) {
          console.error(error);
          options.onLoadError(error);
          if (!pendingPayload && !saveInFlight) reportStatus("error");
          return false;
        });
    }

    window.addEventListener("online", function () {
      if (retryTimer) {
        clearTimeout(retryTimer);
        retryTimer = null;
      }
      startQueue();
    });

    window.addEventListener("pagehide", function () {
      if (interactionActive || pendingPayload || saveInFlight) writeDraft(payload());
    });

    return {
      get status() { return status; },
      load: load,
      save: save,
      saveAndWait: saveAndWait,
      newText: function (data) { return sync.newText(data); },
      setInteractionActive: setInteractionActive,
    };
  }

  global.createCanvasPersistence = createCanvasPersistence;
})(typeof window !== "undefined" ? window : globalThis);
