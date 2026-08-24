(function (global) {
  function createCanvasExporter(options) {
    var getScreens = options.getScreens;
    var projectId = options.projectId;
    var zipPromise = null;
    var toast = null;
    var toastTimer = null;

    function loadZip() {
      if (!zipPromise) zipPromise = import("https://esm.sh/jszip@3.10.1").then(function (module) { return module.default || module; });
      return zipPromise;
    }

    function showToast(message, state) {
      if (!toast) {
        toast = document.createElement("div");
        toast.className = "export-toast";
        toast.innerHTML = '<div class="export-toast__panel"><span class="export-toast__spinner"></span><span class="export-toast__label"></span></div>';
        document.body.appendChild(toast);
      }
      clearTimeout(toastTimer);
      toast.classList.remove("export-toast--done", "export-toast--error");
      if (state) toast.classList.add("export-toast--" + state);
      toast.querySelector(".export-toast__label").textContent = message;
      requestAnimationFrame(function () { toast.classList.add("is-visible"); });
    }

    function hideToast(delay) {
      if (!toast) return;
      toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, delay || 0);
    }

    async function renderScreen(index, scale) {
      var screen = getScreens()[index];
      if (!screen) return null;
      var file = dataPath("projects/" + projectId + "/screens/" + screen.file);
      var width = screen.width || 390;
      var exportScale = scale === 2 ? 2 : 1;
      var url = "/api/render-png?file=" + encodeURIComponent(file) + "&width=" + width + "&scale=" + exportScale;
      var response = await fetch(url);
      if (!response.ok) {
        console.error("render-png failed", response.status, await response.text().catch(function () { return ""; }));
        return null;
      }
      return response.blob();
    }

    function filename(file, scale) {
      return file.replace(/\.html$/, "") + (scale === 2 ? "@2x" : "") + ".png";
    }

    function download(dataUrl, name) {
      var anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = name;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    }

    async function downloadScreens(indices, scale) {
      var screens = getScreens();
      var list = indices.filter(function (index) { return screens[index]; });
      if (!list.length) return;
      var exportScale = scale === 2 ? 2 : 1;

      try {
        if (list.length === 1) {
          showToast("Rendering screen...");
          var index = list[0];
          var singleBlob = await renderScreen(index, exportScale);
          if (!singleBlob) {
            showToast("Couldn't render screen, see console.", "error");
            hideToast(2800);
            return;
          }
          var singleUrl = URL.createObjectURL(singleBlob);
          download(singleUrl, filename(screens[index].file, exportScale));
          setTimeout(function () { URL.revokeObjectURL(singleUrl); }, 1000);
          showToast("Downloaded 1 screen", "done");
          hideToast(1600);
          return;
        }

        showToast("Rendering 1 of " + list.length + "...");
        var JSZip = await loadZip();
        var zip = new JSZip();
        var skipped = [];
        for (var i = 0; i < list.length; i++) {
          var itemIndex = list[i];
          showToast("Rendering " + (i + 1) + " of " + list.length + "...");
          var blob = await renderScreen(itemIndex, exportScale);
          if (!blob) {
            skipped.push(screens[itemIndex].file);
            continue;
          }
          zip.file(filename(screens[itemIndex].file, exportScale), blob);
        }
        showToast("Zipping " + (list.length - skipped.length) + " screens...");
        var zipBlob = await zip.generateAsync({ type: "blob" });
        var zipUrl = URL.createObjectURL(zipBlob);
        var stamp = new Date().toISOString().slice(0, 10);
        download(zipUrl, "screens-" + stamp + (exportScale === 2 ? "@2x" : "") + ".zip");
        setTimeout(function () { URL.revokeObjectURL(zipUrl); }, 1000);
        var doneCount = list.length - skipped.length;
        showToast(skipped.length ? "Downloaded " + doneCount + ", skipped " + skipped.length : "Downloaded " + doneCount + " screens", "done");
        hideToast(skipped.length ? 3200 : 1800);
      } catch (error) {
        console.error("Screen export failed", error);
        showToast("Couldn't export, see console for details.", "error");
        hideToast(3200);
      }
    }

    return { downloadScreens: downloadScreens };
  }

  global.createCanvasExporter = createCanvasExporter;
})(typeof window !== "undefined" ? window : globalThis);
