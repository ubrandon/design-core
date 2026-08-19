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
    { file: "one.html", x: 0, y: 0, width: 390, name: "One renamed by AI" },
    { file: "untouched.html", x: 500, y: 20, width: 390 },
    { file: "ai-added.html", x: 930, y: 20, width: 390 },
  ],
  texts: [
    { text: "Original title", x: 0, y: -80, size: 48 },
    { text: "AI title", x: 930, y: -80, size: 48 },
  ],
});

assert.equal(state.needsSave, true);
assert.deepEqual(
  state.screens.map(({ file, x, y, name }) => ({ file, x, y, name })),
  [
    { file: "one.html", x: 120, y: 60, name: "One renamed by AI" },
    { file: "untouched.html", x: 500, y: 20, name: "" },
    { file: "ai-added.html", x: 930, y: 20, name: "" },
  ],
);
assert.deepEqual(
  state.texts.map(({ text, x }) => ({ text, x })),
  [
    { text: "Original title", x: 90 },
    { text: "AI title", x: 930 },
  ],
);

const mergedPayload = sync.payload(state.screens, state.texts);
state = sync.ingest(mergedPayload);
assert.equal(state.needsSave, false);
assert.equal(state.texts.length, 2);

state = sync.ingest({
  screens: [
    { file: "one.html", x: 0, y: 0, width: 390, name: "One renamed by AI" },
    { file: "untouched.html", x: 550, y: 30, width: 390 },
    { file: "ai-added.html", x: 930, y: 20, width: 390 },
    { file: "later-ai-screen.html", x: 1360, y: 20, width: 390 },
  ],
  texts: [
    { text: "Original title", x: 0, y: -80, size: 48 },
    { text: "AI title", x: 930, y: -80, size: 48 },
  ],
});
assert.equal(state.screens[0].x, 120);
assert.equal(state.screens[1].x, 550);
assert.equal(state.screens[3].file, "later-ai-screen.html");
assert.equal(state.texts[0].x, 90);

state.screens.push({ file: "user-copy.html", x: 1790, y: 20, width: 390, name: "User copy" });
state.texts.push(sync.newText({ text: "User title", x: 1790, y: -80, size: 48 }));
sync.capture(state.screens, state.texts);
state = sync.ingest({
  screens: [
    { file: "one.html", x: 0, y: 0, width: 390 },
    { file: "untouched.html", x: 550, y: 30, width: 390 },
    { file: "ai-added.html", x: 930, y: 20, width: 390 },
    { file: "later-ai-screen.html", x: 1360, y: 20, width: 390 },
    { file: "newest-ai-screen.html", x: 2220, y: 20, width: 390 },
  ],
  texts: [
    { text: "Original title", x: 0, y: -80, size: 48 },
    { text: "AI title", x: 930, y: -80, size: 48 },
  ],
});
assert.equal(state.screens.some((screen) => screen.file === "user-copy.html"), true);
assert.equal(state.screens.some((screen) => screen.file === "newest-ai-screen.html"), true);
assert.equal(state.texts.some((item) => item.text === "User title"), true);

state.screens = state.screens.filter((screen) => screen.file !== "untouched.html");
sync.capture(state.screens, state.texts);
state = sync.ingest({
  screens: [
    { file: "one.html", x: 0, y: 0, width: 390 },
    { file: "untouched.html", x: 600, y: 40, width: 390 },
    { file: "ai-added.html", x: 930, y: 20, width: 390 },
  ],
  texts: mergedPayload.texts,
});
assert.equal(state.screens.some((screen) => screen.file === "untouched.html"), false);

console.log("Canvas sync regression checks passed.");
