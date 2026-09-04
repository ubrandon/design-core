import assert from "node:assert/strict";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { createServer } from "vite";
import { testCanvasInteractions } from "./test-canvas-interactions.js";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixtureSuffix = process.pid + "-" + Date.now();
const companyA = "canvas-test-a-" + fixtureSuffix;
const companyB = "canvas-test-b-" + fixtureSuffix;
const projectId = "persistence";
const companiesRoot = resolve(repoRoot, "public/data/companies");
const companyARoot = resolve(companiesRoot, companyA);
const companyBRoot = resolve(companiesRoot, companyB);
const canvasAPath = resolve(companyARoot, "projects", projectId, "canvas.json");
const canvasBPath = resolve(companyBRoot, "projects", projectId, "canvas.json");
let server;
let browser;

async function writeJson(path, data) {
  await writeFile(path, JSON.stringify(data, null, 2) + "\n", "utf8");
}

async function createCompanyFixture(root, x) {
  const projectRoot = resolve(root, "projects", projectId);
  await mkdir(resolve(projectRoot, "screens"), { recursive: true });
  await mkdir(resolve(root, "users"), { recursive: true });
  await writeJson(resolve(root, "projects/index.json"), {
    projects: [{ id: projectId, name: "Canvas persistence", description: "Regression fixture" }],
  });
  await writeJson(resolve(projectRoot, "project.json"), {
    name: "Canvas persistence",
    description: "Regression fixture",
  });
  await writeJson(resolve(projectRoot, "canvas.json"), {
    screens: [{ file: "one.html", x, y: 0, width: 390, name: "One" }],
    texts: [{ text: "Original title", x, y: -70, size: 36 }],
  });
  await writeFile(
    resolve(projectRoot, "screens/one.html"),
    '<style>html,body{margin:0;height:0}</style><div style="height:40px"></div><div data-fixed-footer style="position:fixed;top:500px;height:120px;width:390px;background:white"></div>\n',
    "utf8",
  );
  await writeJson(resolve(root, "users/index.json"), { users: [] });
}

async function waitFor(check, message, timeout = 8000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    try {
      if (await check()) return;
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 80));
  }
  throw new Error(message);
}

try {
  await createCompanyFixture(companyARoot, 0);
  await createCompanyFixture(companyBRoot, 800);
  await writeFile(
    resolve(companyARoot, "projects", projectId, "screens/two.html"),
    '<div style="width:390px;height:280px;background:white"></div>\n',
    "utf8",
  );
  await writeFile(
    resolve(companyARoot, "projects", projectId, "screens/three.html"),
    '<div style="width:390px;height:240px;background:white"></div>\n',
    "utf8",
  );

  server = await createServer({
    configFile: resolve(repoRoot, "vite.config.js"),
    server: { host: "127.0.0.1", port: 0, strictPort: false },
    logLevel: "silent",
  });
  await server.listen();
  const address = server.httpServer.address();
  const port = typeof address === "object" && address ? address.port : 3000;

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${port}/canvas.html?project=${projectId}&company=${companyA}`);
  const firstCard = page.locator('.canvas-card[data-file="one.html"]');
  await firstCard.waitFor();
  await waitFor(async () => {
    const height = await firstCard.locator("iframe").evaluate((iframe) => parseFloat(iframe.style.height) || 0);
    return height >= 620;
  }, "Fixed content outside document flow was clipped by iframe sizing");
  await firstCard.locator("iframe").evaluate((iframe) => { iframe.dataset.identity = "preserve-me"; });

  let conflictInjected = false;
  await page.route("**/canvas.json", async (route) => {
    if (route.request().method() !== "PUT" || conflictInjected) {
      await route.continue();
      return;
    }
    conflictInjected = true;
    const staleExternal = JSON.parse(await readFile(canvasAPath, "utf8"));
    staleExternal.screens[0].name = "External rename";
    staleExternal.screens.push({ file: "two.html", x: 430, y: 0, width: 390, name: "External addition" });
    staleExternal.texts.push({ id: "external-title", text: "External title", x: 430, y: -70, size: 36 });
    await writeJson(canvasAPath, staleExternal);
    await route.continue();
  });

  const box = await firstCard.locator(".canvas-card-body").boundingBox();
  await page.mouse.move(box.x + 80, box.y + 80);
  await page.mouse.down();
  await page.mouse.move(box.x + 230, box.y + 145, { steps: 6 });
  await page.mouse.up();

  await waitFor(async () => {
    const canvas = JSON.parse(await readFile(canvasAPath, "utf8"));
    return canvas.screens[0].x === 150 && canvas.screens[0].y === 65 && canvas.screens.length === 2;
  }, "Browser movement and external canvas update did not merge");

  assert.equal(conflictInjected, true);
  assert.equal(await firstCard.evaluate((card) => card.style.left), "150px");
  assert.equal(await firstCard.locator(".canvas-card-label").textContent(), "External rename");
  assert.equal(await firstCard.locator("iframe").getAttribute("data-identity"), "preserve-me");
  await page.locator('.canvas-card[data-file="two.html"]').waitFor();

  const merged = JSON.parse(await readFile(canvasAPath, "utf8"));
  assert.ok(merged.texts[0].id, "Legacy titles should gain a stable ID on the next save");
  assert.equal(merged.texts.some((text) => text.id === "external-title"), true);

  const firstTitle = page.locator(`.canvas-text[data-text-id="${merged.texts[0].id}"]`);
  const titleBox = await firstTitle.boundingBox();
  await page.keyboard.down("Meta");
  await page.mouse.move(titleBox.x + 20, titleBox.y + 15);
  await page.mouse.down();
  await page.mouse.move(titleBox.x + 80, titleBox.y + 55, { steps: 5 });
  await page.mouse.up();
  await page.keyboard.up("Meta");
  await waitFor(async () => {
    const canvas = JSON.parse(await readFile(canvasAPath, "utf8"));
    const title = canvas.texts.find((text) => text.id === merged.texts[0].id);
    return title && title.x === merged.texts[0].x + 60 && title.y === merged.texts[0].y + 40;
  }, "Title movement did not persist");

  const isolated = JSON.parse(await readFile(canvasBPath, "utf8"));
  assert.equal(isolated.screens[0].x, 800);
  assert.equal(isolated.screens.length, 1);

  const afterTitleMove = JSON.parse(await readFile(canvasAPath, "utf8"));
  const externalAfterSave = structuredClone(afterTitleMove);
  externalAfterSave.screens[0].x = 175;
  await writeJson(canvasAPath, externalAfterSave);
  await waitFor(async () => {
    const canvas = JSON.parse(await readFile(canvasAPath, "utf8"));
    const cardX = await firstCard.evaluate((card) => card.style.left);
    return canvas.screens[0].x === 175 && cardX === "175px";
  }, "A disk update after a successful save was overwritten by stale local state");

  const draftBase = structuredClone(externalAfterSave);
  const draftPayload = structuredClone(externalAfterSave);
  draftPayload.screens[0].x = 260;
  draftPayload.screens[0].y = 120;
  const draftKey = `design-core:canvas-draft:${companyA}:${projectId}`;
  await page.evaluate(({ key, base, payload }) => {
    sessionStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), base, payload }));
  }, { key: draftKey, base: draftBase, payload: draftPayload });

  const currentWithAddition = structuredClone(externalAfterSave);
  currentWithAddition.screens.push({ file: "three.html", x: 860, y: 0, width: 390, name: "Added after draft" });
  await writeJson(canvasAPath, currentWithAddition);
  await page.reload();
  await page.locator('.canvas-card[data-file="three.html"]').waitFor();

  await waitFor(async () => {
    const canvas = JSON.parse(await readFile(canvasAPath, "utf8"));
    return canvas.screens[0].x === 260 && canvas.screens[0].y === 120 && canvas.screens.length === 3;
  }, "Draft recovery did not preserve the newer external addition");
  assert.equal(await page.locator('.canvas-card[data-file="one.html"]').evaluate((card) => card.style.left), "260px");
  assert.deepEqual(errors, []);

  await testCanvasInteractions({ browser, origin: `http://127.0.0.1:${port}`, company: companyB, projectId, root: companyBRoot });

  console.log("Canvas browser regression checks passed.");
} finally {
  if (browser) await browser.close();
  if (server) await server.close();
  await rm(companyARoot, { recursive: true, force: true });
  await rm(companyBRoot, { recursive: true, force: true });
}
