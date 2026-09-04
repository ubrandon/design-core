(function (global) {
  var nextTextId = 1;
  var SCREEN_FIELDS = ["x", "y", "width", "name"];
  var TEXT_FIELDS = ["text", "x", "y", "size"];

  function makeTextId(prefix) {
    return prefix + "-" + Date.now().toString(36) + "-" + nextTextId++;
  }

  function cloneScreen(screen) {
    return {
      file: screen.file,
      x: screen.x,
      y: screen.y,
      width: screen.width,
      name: screen.name || "",
    };
  }

  function cloneText(item) {
    return {
      id: item.id,
      text: item.text || "",
      x: item.x,
      y: item.y,
      size: item.size,
    };
  }

  function publicText(item) {
    var out = { text: item.text || "", x: Math.round(item.x), y: Math.round(item.y), size: item.size };
    if (item.id) out.id = item.id;
    return out;
  }

  function fieldsEqual(a, b, fields) {
    return fields.every(function (field) { return a[field] === b[field]; });
  }

  function payloadFor(screens, texts) {
    var payload = {
      screens: screens.map(function (screen) {
        var out = {
          file: screen.file,
          x: Math.round(screen.x),
          y: Math.round(screen.y),
          width: screen.width,
        };
        if (screen.name && screen.name.trim()) out.name = screen.name.trim();
        return out;
      }),
    };
    if (texts.length) payload.texts = texts.map(publicText);
    return payload;
  }

  function payloadsEqual(aScreens, aTexts, bScreens, bTexts) {
    return JSON.stringify(payloadFor(aScreens, aTexts)) === JSON.stringify(payloadFor(bScreens, bTexts));
  }

  function CanvasSyncState() {
    this.remoteScreens = [];
    this.remoteTexts = [];
    this.screenOverrides = new Map();
    this.screenAdditions = new Map();
    this.screenDeletes = new Set();
    this.textOverrides = new Map();
    this.textAdditions = new Map();
    this.textDeletes = new Set();
  }

  CanvasSyncState.prototype.newText = function (data) {
    var item = cloneText(data);
    item.id = item.id || makeTextId("text");
    return item;
  };

  CanvasSyncState.prototype.normalizeScreens = function (rawScreens) {
    var autoX = 0;
    return (Array.isArray(rawScreens) ? rawScreens : []).map(function (screen) {
      var width = screen.width || 390;
      var x = screen.x != null ? screen.x : autoX;
      var y = screen.y != null ? screen.y : 0;
      autoX = x + width + 40;
      return {
        file: screen.file,
        x: x,
        y: y,
        width: width,
        name: typeof screen.name === "string" ? screen.name : "",
      };
    });
  };

  CanvasSyncState.prototype.normalizeTexts = function (rawTexts) {
    var self = this;
    var previous = this.remoteTexts;
    var used = new Set();
    return (Array.isArray(rawTexts) ? rawTexts : []).map(function (raw, index) {
      var requestedId = typeof raw.id === "string" && raw.id && !used.has(raw.id) ? raw.id : "";
      var item = {
        id: requestedId,
        text: typeof raw.text === "string" ? raw.text : "",
        x: raw.x != null ? raw.x : 0,
        y: raw.y != null ? raw.y : 0,
        size: raw.size || 48,
      };
      var match = previous.find(function (candidate) {
        return !used.has(candidate.id) && (item.id ? candidate.id === item.id : fieldsEqual(candidate, item, TEXT_FIELDS));
      });
      if (!match) {
        match = Array.from(self.textAdditions.values()).find(function (candidate) {
          return !used.has(candidate.id) && (item.id ? candidate.id === item.id : fieldsEqual(candidate, item, TEXT_FIELDS));
        });
      }
      if (!match && previous[index] && !used.has(previous[index].id)) match = previous[index];
      item.id = item.id || (match && match.id) || makeTextId("text-legacy");
      used.add(item.id);
      return item;
    });
  };

  CanvasSyncState.prototype.capture = function (screens, texts) {
    var self = this;
    var remoteScreens = new Map(this.remoteScreens.map(function (screen) { return [screen.file, screen]; }));
    var currentScreens = new Map(screens.map(function (screen) { return [screen.file, screen]; }));
    this.screenAdditions.forEach(function (_, file) {
      if (!currentScreens.has(file)) self.screenAdditions.delete(file);
    });

    screens.forEach(function (screen) {
      var remote = remoteScreens.get(screen.file);
      self.screenDeletes.delete(screen.file);
      if (!remote) {
        self.screenAdditions.set(screen.file, cloneScreen(screen));
        return;
      }
      var existing = self.screenOverrides.get(screen.file) || { fields: new Set(), value: cloneScreen(screen) };
      SCREEN_FIELDS.forEach(function (field) {
        if (screen[field] !== remote[field]) existing.fields.add(field);
      });
      existing.value = cloneScreen(screen);
      if (existing.fields.size) self.screenOverrides.set(screen.file, existing);
    });

    this.remoteScreens.forEach(function (screen) {
      if (!currentScreens.has(screen.file)) {
        self.screenDeletes.add(screen.file);
        self.screenOverrides.delete(screen.file);
        self.screenAdditions.delete(screen.file);
      }
    });

    var remoteTexts = new Map(this.remoteTexts.map(function (item) { return [item.id, item]; }));
    var currentTextIds = new Set();
    texts.forEach(function (item) {
      if (!item.id) item.id = makeTextId("text");
      currentTextIds.add(item.id);
      self.textDeletes.delete(item.id);
      var remote = remoteTexts.get(item.id);
      if (!remote) {
        self.textAdditions.set(item.id, cloneText(item));
        return;
      }
      var existing = self.textOverrides.get(item.id) || { fields: new Set(), value: cloneText(item) };
      TEXT_FIELDS.forEach(function (field) {
        if (item[field] !== remote[field]) existing.fields.add(field);
      });
      existing.value = cloneText(item);
      if (existing.fields.size) self.textOverrides.set(item.id, existing);
    });

    this.remoteTexts.forEach(function (item) {
      if (!currentTextIds.has(item.id)) {
        self.textDeletes.add(item.id);
        self.textOverrides.delete(item.id);
        self.textAdditions.delete(item.id);
      }
    });
    this.textAdditions.forEach(function (_, id) {
      if (!currentTextIds.has(id)) self.textAdditions.delete(id);
    });
  };

  CanvasSyncState.prototype.applyLocalChanges = function () {
    var self = this;
    var screens = [];
    var seenScreens = new Set();
    this.remoteScreens.forEach(function (remote) {
      if (self.screenDeletes.has(remote.file)) return;
      var next = cloneScreen(remote);
      var override = self.screenOverrides.get(remote.file);
      if (override) {
        override.fields.forEach(function (field) { next[field] = override.value[field]; });
      }
      screens.push(next);
      seenScreens.add(next.file);
    });
    this.screenAdditions.forEach(function (screen, file) {
      if (!seenScreens.has(file) && !self.screenDeletes.has(file)) screens.push(cloneScreen(screen));
    });

    var texts = [];
    var seenTexts = new Set();
    this.remoteTexts.forEach(function (remote) {
      if (self.textDeletes.has(remote.id)) return;
      var next = cloneText(remote);
      var override = self.textOverrides.get(remote.id);
      if (override) {
        override.fields.forEach(function (field) { next[field] = override.value[field]; });
      }
      texts.push(next);
      seenTexts.add(next.id);
    });
    this.textAdditions.forEach(function (item, id) {
      if (!seenTexts.has(id) && !self.textDeletes.has(id)) texts.push(cloneText(item));
    });
    return { screens: screens, texts: texts };
  };

  CanvasSyncState.prototype.ingest = function (data) {
    this.remoteScreens = this.normalizeScreens(data && data.screens);
    this.remoteTexts = this.normalizeTexts(data && data.texts);
    var merged = this.applyLocalChanges();
    merged.needsSave = !payloadsEqual(merged.screens, merged.texts, this.remoteScreens, this.remoteTexts);
    return merged;
  };

  CanvasSyncState.prototype.recover = function (data) {
    var screens = this.normalizeScreens(data && data.screens);
    var texts = this.normalizeTexts(data && data.texts);
    this.capture(screens, texts);
    return this.applyLocalChanges();
  };

  CanvasSyncState.prototype.payload = function (screens, texts) {
    return payloadFor(screens, texts);
  };

  CanvasSyncState.prototype.remotePayload = function () {
    return payloadFor(this.remoteScreens, this.remoteTexts);
  };

  global.CanvasSyncState = CanvasSyncState;
})(typeof window !== "undefined" ? window : globalThis);
