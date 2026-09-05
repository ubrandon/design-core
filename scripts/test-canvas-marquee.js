import assert from "node:assert/strict";

export async function testCanvasMarquee(page) {
  const cards = page.locator(".canvas-card");
  const a = await cards.nth(0).boundingBox();
  const b = await cards.nth(1).boundingBox();
  const left = Math.min(a.x, b.x) - 20;
  const top = Math.min(a.y, b.y) - 20;
  const right = Math.max(a.x + a.width, b.x + b.width) + 20;
  const bottom = Math.max(a.y + a.height, b.y + b.height) + 20;
  const selectedFiles = () => page.locator(".canvas-card.is-selected").evaluateAll(els => els.map(el => el.dataset.file).sort());
  const expected = ["one.html", "two.html"];
  const drag = async (start, end) => {
    await page.mouse.move(...start);
    await page.mouse.down();
    await page.mouse.move(...end, { steps: 10 });
  };

  // Enclosing both cards must work in every direction, including release on empty canvas.
  for (const [start, end] of [
    [[left, top], [right, bottom]],
    [[right, top], [left, bottom]],
    [[left, bottom], [right, top]],
    [[right, bottom], [left, top]],
  ]) {
    await drag(start, end);
    assert.deepEqual(await selectedFiles(), expected, "Extending the box beyond the cards cleared selection");
    await page.mouse.up();
    assert.deepEqual(await selectedFiles(), expected, "Releasing outside the cards cleared selection");
  }

  // Crossing only part of both cards also selects them, and Shift retains existing selection.
  await cards.nth(2).click({ position: { x: 30, y: 50 } });
  await page.keyboard.down("Shift");
  await drag([left, top], [b.x + b.width / 2, b.y + b.height / 2]);
  await page.mouse.up();
  await page.keyboard.up("Shift");
  assert.deepEqual(await selectedFiles(), ["one.html", "three.html", "two.html"]);

  // Capture loss and cancellation carry no reliable release coordinates.
  for (const type of ["lostpointercapture", "pointercancel"]) {
    await drag([left, top], [right, bottom]);
    await page.locator("#viewport").dispatchEvent(type, { pointerId: 1, pointerType: "mouse", bubbles: true });
    assert.deepEqual(await selectedFiles(), expected, type + " recalculated the box using invalid coordinates");
    await page.mouse.up();
    assert.deepEqual(await selectedFiles(), expected, "Mouse release after interrupted selection cleared the cards");
    assert.equal(await page.locator(".canvas-marquee").count(), 0);
  }

  await page.mouse.click(left, top);
  assert.deepEqual(await selectedFiles(), [], "A new click on empty canvas must still deselect");
  console.log("Canvas marquee enclosure, direction, and interrupted release checks passed.");
}
