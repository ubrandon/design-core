import assert from "node:assert/strict";

export async function testCanvasFocus({ browser, url }) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  try {
    await page.goto(url);
    const card = page.locator(".canvas-card").first();
    const viewport = page.locator("#viewport");
    await card.waitFor();
    await page.keyboard.press("v");
    await card.click({ position: { x: 80, y: 100 } });
    assert.equal(await viewport.evaluate(el => getComputedStyle(el).outlineStyle), "none", "Focusing the canvas must not draw an outline around the workspace");

    // Input widgets can stop bubbling key events; Space release must still exit temporary panning.
    await page.keyboard.press("Escape");
    await page.keyboard.down("Space");
    await page.evaluate(() => {
      document.addEventListener("keyup", event => event.stopPropagation(), { once: true });
    });
    await page.keyboard.up("Space");
    await card.click({ position: { x: 80, y: 100 } });
    assert.equal(await card.evaluate(el => el.classList.contains("is-selected")), true, "A swallowed Space keyup left selection locked in pan mode");

    // Embedded browser focus can return without a matching blur or keyup reaching the page.
    await page.keyboard.press("Escape");
    await page.keyboard.down("Space");
    await page.evaluate(() => window.dispatchEvent(new Event("focus")));
    await card.click({ position: { x: 80, y: 100 } });
    assert.equal(await card.evaluate(el => el.classList.contains("is-selected")), true, "Returning focus did not clear stale temporary pan mode");
    await page.keyboard.up("Space");

    // macOS shortcuts can suppress intermediate keyup events while Command is held.
    await page.keyboard.press("Escape");
    await page.keyboard.down("Space");
    await page.keyboard.press("Meta");
    await card.click({ position: { x: 80, y: 100 } });
    assert.equal(await card.evaluate(el => el.classList.contains("is-selected")), true, "Releasing Command did not clear stale temporary pan mode");
    await page.keyboard.up("Space");

    await page.keyboard.press("Escape");
    await page.keyboard.down("Space");
    await page.locator(".dc-rail__toggle").click();
    await card.click({ position: { x: 80, y: 100 } });
    assert.equal(await card.evaluate(el => el.classList.contains("is-selected")), true, "Using the sidebar left temporary pan mode active");
    await page.keyboard.up("Space");

    // Ordinary Space+drag and the explicit Hand tool should still work afterward.
    const before = await page.locator("#stage").evaluate(el => el.style.transform);
    await page.keyboard.down("Space");
    await page.mouse.move(1200, 700);
    await page.mouse.down();
    await page.mouse.move(1100, 650, { steps: 5 });
    await page.mouse.up();
    await page.keyboard.up("Space");
    assert.notEqual(await page.locator("#stage").evaluate(el => el.style.transform), before);
    await card.click({ position: { x: 80, y: 100 } });
    assert.equal(await card.evaluate(el => el.classList.contains("is-selected")), true);
    assert.deepEqual(errors, []);
    console.log("Canvas focus and temporary pan recovery checks passed.");
  } finally {
    await page.close();
  }
}
