import assert from "node:assert/strict";

await import("../public/scripts/canvas-sync.js");

const sync = new globalThis.CanvasSyncState();
let state = sync.ingest({
  screens: [
    { file: "one.html", x: 0, y: 0, width: 390, name: "One" },
    { file: "untouched.html", x: 430, y: 0, width: 390 },
  ],
  texts: [{ text: "Original title", x: 0, y: -80, size: 48 }],
});

state.screens[0].x = 120;
state.screens[0].y = 60;
state.texts[0].x = 90;
sync.capture(state.screens, state.texts);

state = sync.ingest({
  screens: [
    { file: "one.html", x: 0, y: 0, width: 390, name: "Externally renamed" },
    { file: "untouched.html", x: 500, y: 20, width: 390 },
    { file: "external-addition.html", x: 930, y: 20, width: 390 },
  ],
  texts: [
    { text: "Original title", x: 0, y: -80, size: 48 },
    { text: "External title", x: 930, y: -80, size: 48 },
  ],
});

assert.equal(state.needsSave, true);
assert.deepEqual(
  state.screens.map(({ file, x, y, name }) => ({ file, x, y, name })),
  [
    { file: "one.html", x: 120, y: 60, name: "Externally renamed" },
    { file: "untouched.html", x: 500, y: 20, name: "" },
    { file: "external-addition.html", x: 930, y: 20, name: "" },
  ],
);
assert.deepEqual(
  state.texts.map(({ text, x }) => ({ text, x })),
  [
    { text: "Original title", x: 90 },
    { text: "External title", x: 930 },
  ],
);

const mergedPayload = sync.payload(state.screens, state.texts);
state = sync.ingest(mergedPayload);
assert.equal(state.needsSave, false);

state = sync.ingest({
  screens: [
    { file: "one.html", x: 0, y: 0, width: 390, name: "Externally renamed again" },
    { file: "untouched.html", x: 550, y: 30, width: 390 },
    { file: "external-addition.html", x: 930, y: 20, width: 390 },
    { file: "later-addition.html", x: 1360, y: 20, width: 390 },
  ],
  texts: mergedPayload.texts,
});
assert.equal(state.screens[0].x, 120);
assert.equal(state.screens[0].name, "Externally renamed again");
assert.equal(state.screens[1].x, 550);
assert.equal(state.screens[3].file, "later-addition.html");

state.screens = state.screens.filter((screen) => screen.file !== "untouched.html");
sync.capture(state.screens, state.texts);
state = sync.ingest({
  screens: [
    { file: "one.html", x: 0, y: 0, width: 390 },
    { file: "untouched.html", x: 600, y: 40, width: 390 },
    { file: "external-addition.html", x: 930, y: 20, width: 390 },
  ],
  texts: mergedPayload.texts,
});
assert.equal(state.screens.some((screen) => screen.file === "untouched.html"), false);

const draftRecovery = new globalThis.CanvasSyncState();
draftRecovery.ingest({
  screens: [{ file: "drafted.html", x: 0, y: 0, width: 390, name: "Original" }],
  texts: [{ text: "Existing title", x: 0, y: -80, size: 36 }],
});
draftRecovery.recover({
  screens: [{ file: "drafted.html", x: 240, y: 120, width: 390, name: "Original" }],
  texts: [{ text: "Existing title", x: 0, y: -80, size: 36 }],
});
const recovered = draftRecovery.ingest({
  screens: [
    { file: "drafted.html", x: 0, y: 0, width: 390, name: "External rename" },
    { file: "new-after-draft.html", x: 430, y: 0, width: 390 },
  ],
  texts: [
    { text: "Existing title", x: 0, y: -80, size: 36 },
    { text: "New after draft", x: 430, y: -80, size: 36 },
  ],
});
assert.equal(recovered.screens[0].x, 240);
assert.equal(recovered.screens[0].y, 120);
assert.equal(recovered.screens[0].name, "External rename");
assert.equal(recovered.screens[1].file, "new-after-draft.html");
assert.equal(recovered.texts[1].text, "New after draft");

const duplicateTextIds = new globalThis.CanvasSyncState().ingest({
  screens: [],
  texts: [
    { id: "repeated-title", text: "First", x: 0, y: 0, size: 36 },
    { id: "repeated-title", text: "Second", x: 100, y: 0, size: 36 },
  ],
});
assert.equal(duplicateTextIds.texts[0].id, "repeated-title");
assert.notEqual(duplicateTextIds.texts[1].id, "repeated-title");
assert.notEqual(duplicateTextIds.texts[0].id, duplicateTextIds.texts[1].id);

console.log("Canvas synchronization regression checks passed.");

const pendingAddition = new globalThis.CanvasSyncState();
pendingAddition.ingest({ screens: [], texts: [] });
pendingAddition.capture([{ file: "copy.html", x: 0, y: 0, width: 390 }], [{ id: "new-title", text: "New", x: 0, y: 0, size: 48 }]);
pendingAddition.capture([], []);
const afterUndo = pendingAddition.ingest({ screens: [], texts: [] });
assert.deepEqual(afterUndo.screens, [], "Undo must discard an unacknowledged screen addition");
assert.deepEqual(afterUndo.texts, [], "Undo must discard an unacknowledged title addition");

await import("../public/scripts/canvas-history.js");
const storage = new Map();
globalThis.sessionStorage = { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) };
const historyOptions = { storageKey: "history-test" };
const history = globalThis.createCanvasHistory(historyOptions);
const initial = { screens: [{ file: "one.html", name: "One", x: 0, y: 0, width: 390 }], texts: [] };
history.observe(initial);
const moved = structuredClone(initial);
moved.screens[0].x = 120;
history.record(moved);
const external = structuredClone(moved);
external.screens[0].name = "External rename";
external.screens.push({ file: "external.html", x: 500, y: 0, width: 390 });
history.observe(external);
const undone = history.undo(external);
assert.equal(undone.screens[0].x, 0);
assert.equal(undone.screens[0].name, "External rename");
assert.equal(undone.screens[1].file, "external.html");
const redone = history.redo(undone);
assert.equal(redone.screens[0].x, 120);
assert.equal(redone.screens[0].name, "External rename");
const deleted = { screens: [redone.screens[1]], texts: [] };
history.record(deleted);
const reloadedHistory = globalThis.createCanvasHistory(historyOptions);
reloadedHistory.observe(deleted);
assert.deepEqual(reloadedHistory.undo(deleted), redone, "Deletion should remain undoable after reload");
assert.deepEqual(reloadedHistory.redo(redone), deleted);
const otherCompanyHistory = globalThis.createCanvasHistory({ storageKey: "another-company" });
assert.equal(otherCompanyHistory.undo(deleted), null);

const changedAgain = structuredClone(redone);
changedAgain.screens[0].x = 240;
history.observe(changedAgain);
history.undo(changedAgain);
assert.equal(history.undo(changedAgain).screens[0].x, 240, "Undo should preserve a newer disk change to the same field");
console.log("Canvas history regression checks passed.");
