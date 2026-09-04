(function (global) {
  const fields = { screens: ["x", "y", "width", "name"], texts: ["text", "x", "y", "size"] };
  const keyFor = (kind, item) => kind === "screens" ? item.file : item.id;
  const clone = value => JSON.parse(JSON.stringify(value));

  function changesBetween(before, after) {
    const changes = [];
    for (const kind of Object.keys(fields)) {
      const previous = new Map(before[kind].map((item, index) => [keyFor(kind, item), { item, index }]));
      const next = new Map(after[kind].map((item, index) => [keyFor(kind, item), { item, index }]));
      for (const key of new Set([...previous.keys(), ...next.keys()])) {
        const a = previous.get(key);
        const b = next.get(key);
        const changedFields = fields[kind].filter(field => a?.item[field] !== b?.item[field]);
        if (!a || !b || changedFields.length) {
          changes.push({ kind, key, before: a || null, after: b || null, fields: changedFields });
        }
      }
    }
    return changes;
  }

  function createCanvasHistory(options) {
    let baseline = null;
    let undoStack = [];
    let redoStack = [];
    try {
      const saved = JSON.parse(sessionStorage.getItem(options.storageKey) || "null");
      if (saved && Array.isArray(saved.undo) && Array.isArray(saved.redo)) {
        undoStack = saved.undo.slice(-100);
        redoStack = saved.redo.slice(-100);
      }
    } catch (_) {}

    function notify() {
      try {
        sessionStorage.setItem(options.storageKey, JSON.stringify({ undo: undoStack, redo: redoStack }));
      } catch (_) {}
      options.onChange?.({ canUndo: undoStack.length > 0, canRedo: redoStack.length > 0 });
    }

    function observe(state) {
      baseline = clone(state);
      notify();
    }

    function record(state) {
      const next = clone(state);
      if (baseline) {
        const changes = changesBetween(baseline, next);
        if (changes.length) {
          undoStack.push(changes);
          undoStack = undoStack.slice(-100);
          redoStack = [];
        }
      }
      baseline = next;
      notify();
    }

    function travel(state, from, to, reverse) {
      if (!from.length) return null;
      const next = clone(state);
      const changes = from.pop();
      for (const change of changes) {
        const expected = reverse ? change.after : change.before;
        const target = reverse ? change.before : change.after;
        const items = next[change.kind];
        const index = items.findIndex(item => keyFor(change.kind, item) === change.key);
        if (!expected) {
          if (index < 0 && target) items.splice(Math.min(target.index, items.length), 0, clone(target.item));
        } else if (!target) {
          if (index >= 0 && fields[change.kind].every(field => items[index][field] === expected.item[field])) items.splice(index, 1);
        } else if (index >= 0) {
          // Only reverse our own fields, preserving newer edits made on disk.
          for (const field of change.fields) {
            if (items[index][field] === expected.item[field]) items[index][field] = target.item[field];
          }
        }
      }
      const applied = changesBetween(state, next);
      if (applied.length) {
        to.push(reverse ? applied.map(change => ({ ...change, before: change.after, after: change.before })) : applied);
      }
      baseline = clone(next);
      notify();
      return next;
    }

    return {
      observe,
      record,
      undo: state => travel(state, undoStack, redoStack, true),
      redo: state => travel(state, redoStack, undoStack, false),
    };
  }

  global.createCanvasHistory = createCanvasHistory;
})(typeof window !== "undefined" ? window : globalThis);
