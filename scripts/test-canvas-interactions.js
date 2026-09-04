import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { tmpdir } from "node:os";

export async function testCanvasInteractions({ browser, origin, company, projectId, root }) {
  const projectRoot = resolve(root, "projects", projectId);
  const canvasPath = resolve(projectRoot, "canvas.json");
  const scene = {
    screens: [
      { file: "one.html", x: 0, y: 0, width: 320, name: "One" },
      { file: "two.html", x: 700, y: 100, width: 480, name: "Two" },
      { file: "three.html", x: 1500, y: 200, width: 640, name: "Three" },
    ],
    texts: [{ id: "editable-title", text: "Original title", x: 0, y: -100, size: 48 }],
  };
  const writeScene = data => writeFile(canvasPath, JSON.stringify(data, null, 2) + "\n");
  const readScene = async () => JSON.parse(await readFile(canvasPath, "utf8"));
  await writeScene(scene);
  for (const screen of scene.screens) {
    await writeFile(resolve(projectRoot, "screens", screen.file), '<div style="height:320px;background:white">Canvas test</div>\n');
  }
  const url = `${origin}/canvas.html?project=${projectId}&company=${company}`;
  const errors = [];
  const saves = [];
  const createPage = async () => {
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    page.setDefaultTimeout(10000);
    page.on("pageerror", error => { errors.push(error.message); console.error("Canvas page error:", error.message); });
    page.on("request", request => {
      if (request.method() === "PUT" && request.url().endsWith("/canvas.json")) saves.push(request.postDataJSON());
    });
    return page;
  };
  const transform = page => page.locator("#stage").evaluate(el => el.style.transform);
  const saved = page => page.waitForFunction(() => document.getElementById("canvas-save-status").dataset.state === "saved");
  const waitFor = async (check, message) => {
    const started = Date.now();
    while (Date.now() - started < 8000) {
      try {
        if (await check()) return;
      } catch (error) {
        if (!(error instanceof SyntaxError)) throw error;
      }
      await new Promise(done => setTimeout(done, 50));
    }
    throw new Error(message + "\nDisk: " + JSON.stringify(await readScene()) + "\nRecent saves: " + JSON.stringify(saves.slice(-4)));
  };

  // Exercise both delayed framing paths, including a deep link reloaded with a saved view.
  for (const afterTimeout of [false, true]) {
    const zoomPage = await createPage();
    const target = url + (afterTimeout ? "&screen=one.html" : "");
    if (afterTimeout) await zoomPage.goto(target);
    let releaseScreens;
    const screenGate = new Promise(done => { releaseScreens = done; });
    await zoomPage.route("**/screens/**", async route => { await screenGate; await route.continue(); });
    if (afterTimeout) await zoomPage.reload({ waitUntil: "domcontentloaded" });
    else await zoomPage.goto(target, { waitUntil: "domcontentloaded" });
    await zoomPage.locator('.canvas-card[data-file="one.html"]').waitFor();
    await zoomPage.getByTitle("Zoom out", { exact: true }).click();
    const chosenView = await transform(zoomPage);
    if (afterTimeout) await zoomPage.waitForTimeout(1800);
    assert.equal(await transform(zoomPage), chosenView, "Delayed fallback must preserve manual zoom");
    releaseScreens();
    await zoomPage.waitForLoadState("load");
    await zoomPage.waitForTimeout(1800);
    assert.equal(await transform(zoomPage), chosenView, "Iframe loading must preserve manual zoom");
    await zoomPage.close();
  }
  console.log("Canvas zoom preservation checks passed.");

  const page = await createPage();
  await page.goto(url);
  await saved(page);
  await page.keyboard.press("Shift+Digit1");
  const title = page.locator('.canvas-text[data-text-id="editable-title"]');
  for (const value of ["First edit", "Second edit"]) {
    await title.dblclick();
    await title.locator("input").fill(value);
    await title.locator("input").press("Enter");
    assert.equal(await title.locator("input").count(), 0, "Committed title must exit editing");
    await waitFor(async () => (await readScene()).texts[0].text === value, "Title edit was not saved: " + value);
  }
  await title.dblclick();
  await title.locator("input").fill("Cancelled edit");
  await title.locator("input").press("Escape");
  assert.equal(await title.textContent(), "Second edit");
  assert.equal(await title.locator("input").count(), 0);

  await page.keyboard.press("Control+z");
  await waitFor(async () => (await readScene()).texts[0].text === "First edit", "Undo title edit failed");
  await page.keyboard.press("Control+Shift+z");
  await waitFor(async () => (await readScene()).texts[0].text === "Second edit", "Redo title edit failed");

  let releaseSave;
  const saveGate = new Promise(done => { releaseSave = done; });
  let delayedSave = false;
  await page.route("**/canvas.json", async route => {
    if (route.request().method() !== "PUT" || delayedSave) return route.continue();
    delayedSave = true;
    const response = await route.fetch();
    await saveGate;
    await route.fulfill({ response });
  });
  try {
    await title.dblclick();
    await title.locator("input").fill("Queued first edit");
    await title.locator("input").press("Enter");
    await waitFor(async () => (await readScene()).texts[0].text === "Queued first edit", "First queued edit failed");
    assert.equal(await page.locator("#canvas-save-status").textContent(), "Saving...");
    await title.dblclick();
    await title.locator("input").fill("Queued second edit");
    await title.locator("input").press("Enter");
  } finally {
    releaseSave();
  }
  await waitFor(async () => (await readScene()).texts[0].text === "Queued second edit", "A slow save overwrote a newer title edit");
  await saved(page);
  await page.unroute("**/canvas.json");

  // A disk update during an edit should merge after commit without changing the edited target.
  await title.dblclick();
  await title.locator("input").fill("Edited alongside disk update");
  const external = await readScene();
  external.screens[1].name = "External rename";
  await writeScene(external);
  await page.waitForTimeout(300);
  await title.locator("input").press("Enter");
  await waitFor(async () => {
    const state = await readScene();
    return state.texts[0].text === "Edited alongside disk update" && state.screens[1].name === "External rename";
  }, "Editing and external changes did not merge");

  const first = page.locator('.canvas-card[data-file="one.html"]');
  await first.click({ position: { x: 50, y: 80 } });
  await page.keyboard.press("Delete");
  await waitFor(async () => (await readScene()).screens.length === 2, "Delete did not save");
  assert.ok(await readFile(resolve(projectRoot, "screens/one.html"), "utf8"), "Delete must retain the screen file");
  await saved(page);
  await page.reload();
  await saved(page);
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  await waitFor(async () => (await readScene()).screens.length === 3, "Delete could not be undone after reload");
  await page.getByRole("button", { name: "Redo", exact: true }).click();
  await waitFor(async () => (await readScene()).screens.length === 2, "Redo deletion failed");
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  await waitFor(async () => (await readScene()).screens.length === 3, "Second undo deletion failed");
  await page.keyboard.press("Shift+Digit1");

  // Alignment and equal gaps should handle screens of different widths and remain undoable.
  await page.keyboard.press("Escape");
  for (const screen of scene.screens) {
    await page.locator(`.canvas-card[data-file="${screen.file}"]`).click({ position: { x: 50, y: 80 }, modifiers: ["Shift"] });
  }
  await page.getByRole("button", { name: "Align and distribute selection" }).click();
  await page.getByRole("menuitem", { name: "Align top", exact: true }).click();
  await waitFor(async () => (await readScene()).screens.every(screen => screen.y === 0), "Align top failed");
  await page.getByRole("button", { name: "Align and distribute selection" }).click();
  await page.getByRole("menuitem", { name: "Distribute horizontal spacing" }).click();
  await waitFor(async () => (await readScene()).screens[1].x === 670, "Equal horizontal gaps failed for mixed widths");
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  await waitFor(async () => (await readScene()).screens[1].x === 700, "Undo distribution failed");

  await first.click({ position: { x: 50, y: 80 } });
  await page.keyboard.press("Control+d");
  await waitFor(async () => (await readScene()).screens.length === 4, "Screen duplication failed");
  await saved(page);
  const duplicateFile = (await readScene()).screens[3].file;
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  await waitFor(async () => (await readScene()).screens.length === 3, "Undo duplication failed");
  assert.ok(await readFile(resolve(projectRoot, "screens", duplicateFile), "utf8"));
  await page.getByRole("button", { name: "Redo", exact: true }).click();
  await waitFor(async () => (await readScene()).screens.some(screen => screen.file === duplicateFile), "Redo duplication failed");
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  await waitFor(async () => (await readScene()).screens.length === 3, "Undo restored duplicate failed");

  await page.keyboard.press("t");
  await page.mouse.click(1200, 670);
  await page.locator(".canvas-text-input").fill("New canvas title");
  await page.locator(".canvas-text-input").press("Enter");
  await waitFor(async () => (await readScene()).texts.length === 2, "New title did not save");
  await page.keyboard.press("Control+z");
  await waitFor(async () => (await readScene()).texts.length === 1, "Undo new title failed");
  await page.keyboard.press("Control+Shift+z");
  await waitFor(async () => (await readScene()).texts.length === 2, "Redo new title failed");
  await page.keyboard.press("Control+z");
  await waitFor(async () => (await readScene()).texts.length === 1, "Undo restored title failed");
  console.log("Canvas editing, history, and arrangement checks passed.");

  // A focused sidebar button must not block Space+drag on return to the canvas.
  await page.locator(".dc-rail__toggle").click();
  const viewport = await page.locator("#viewport").boundingBox();
  const panStart = { x: viewport.x + viewport.width - 140, y: viewport.y + viewport.height - 220 };
  const beforePan = await transform(page);
  await page.keyboard.down("Space");
  await page.mouse.move(panStart.x, panStart.y);
  await page.mouse.down();
  await page.mouse.move(panStart.x - 80, panStart.y - 40, { steps: 5 });
  await page.mouse.up();
  await page.keyboard.up("Space");
  assert.notEqual(await transform(page), beforePan, "Sidebar focus blocked Space+drag");
  assert.equal(await page.locator(".canvas-marquee").count(), 0);

  // Escape and focus loss must end marquee and object drag sessions even before mouseup.
  await page.mouse.move(panStart.x, panStart.y);
  await page.mouse.down();
  await page.mouse.move(panStart.x - 90, panStart.y - 50, { steps: 4 });
  assert.equal(await page.locator(".canvas-marquee").count(), 1);
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".canvas-marquee").count(), 0);
  await page.mouse.up();
  await page.keyboard.press("Shift+Digit1");
  const firstBox = await first.boundingBox();
  await page.mouse.move(firstBox.x + 50, firstBox.y + 80);
  await page.mouse.down();
  await page.mouse.move(firstBox.x + 110, firstBox.y + 110, { steps: 4 });
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  assert.equal(await page.locator("#viewport.dragging-card").count(), 0);
  await page.mouse.up();
  await saved(page);
  await page.getByRole("button", { name: "Hand tool", exact: true }).click();
  const afterBlur = await transform(page);
  await page.mouse.move(panStart.x, panStart.y);
  await page.mouse.down();
  await page.mouse.move(panStart.x - 60, panStart.y - 30, { steps: 4 });
  await page.mouse.up();
  assert.notEqual(await transform(page), afterBlur, "Pan remained stuck after focus loss");
  await page.getByRole("button", { name: "Select tool", exact: true }).click();
  console.log("Canvas pointer recovery checks passed.");

  // Reload must retain its icon and distinguish failed loads from successful ones.
  const reload = page.getByRole("button", { name: "Reload screens", exact: true });
  const icon = await reload.innerHTML();
  await page.route("**/canvas.json?*", route => route.fulfill({ status: 503, body: "Unavailable" }));
  await reload.click();
  await page.waitForFunction(() => document.getElementById("canvas-save-status").dataset.state === "error");
  assert.equal(await reload.innerHTML(), icon);
  assert.equal(await reload.isEnabled(), true);
  await page.unroute("**/canvas.json?*");
  await reload.click();
  await saved(page);
  assert.equal(await reload.innerHTML(), icon);

  // Save failures should show a durable retry status and recover automatically.
  let failSaves = true;
  await page.route("**/canvas.json", route => {
    if (route.request().method() === "PUT" && failSaves) return route.fulfill({ status: 503, body: "Unavailable" });
    return route.continue();
  });
  await page.keyboard.press("Shift+Digit1");
  await first.click({ position: { x: 50, y: 80 } });
  await page.keyboard.press("ArrowRight");
  await page.waitForFunction(() => document.getElementById("canvas-save-status").dataset.state === "retrying");
  failSaves = false;
  await saved(page);
  await page.unroute("**/canvas.json");

  await page.getByRole("button", { name: "Keyboard shortcuts", exact: true }).click();
  assert.equal(await page.locator("#canvas-shortcuts").evaluate(el => el.open), true);
  await page.screenshot({ path: resolve(tmpdir(), "design-core-canvas-shortcuts.png") });
  const beforeHelp = await readScene();
  await page.keyboard.press("Delete");
  assert.deepEqual(await readScene(), beforeHelp, "Canvas shortcuts must be disabled while the help dialog is open");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#canvas-shortcuts").evaluate(el => el.open), false);
  await page.keyboard.press("Control+a");
  await page.screenshot({ path: resolve(tmpdir(), "design-core-canvas-controls.png") });
  await page.close();

  // Frame all must use the same zoom range as manual zoom.
  const wide = structuredClone(scene);
  wide.screens[2].x = 9500;
  await writeScene(wide);
  const widePage = await createPage();
  await widePage.goto(url);
  await widePage.keyboard.press("Shift+Digit1");
  const visible = await widePage.locator("#viewport").boundingBox();
  const rail = await widePage.locator("#dc-rail").boundingBox();
  for (const screen of wide.screens) {
    const box = await widePage.locator(`.canvas-card[data-file="${screen.file}"]`).boundingBox();
    assert.ok(box.x >= rail.x + rail.width && box.x + box.width <= visible.x + visible.width, "Frame all clipped a wide canvas or put screens under the sidebar");
  }
  await widePage.close();
  assert.deepEqual(errors, []);
  console.log("Canvas interaction regression checks passed.");
}
