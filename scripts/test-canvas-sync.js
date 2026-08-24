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

console.log("Canvas synchronization regression checks passed.");
