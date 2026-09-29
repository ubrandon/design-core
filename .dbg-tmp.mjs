import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto('http://localhost:3000/data/companies/mixedroutes/projects/mixedroutes-phase-v2/prototypes/v2-app/index.html#home');
await p.waitForTimeout(2000);
const D = '/private/tmp/claude-501/-Users-ubrandon-Documents-Git-design-core/a147495c-1f44-4968-919e-61c00be691ff/scratchpad/proto/';
const tests = ['#sheet-host', '#toast', '#tabbar', '.h2-row', '.home-banner-stack', '.toolbar'];
for (const t of tests) {
  await p.evaluate(s => document.querySelectorAll(s).forEach(e => e.style.display = 'none'), t);
  const px = await p.screenshot({ clip: { x: 0, y: 0, width: 390, height: 300 } });
  const { default: zlib } = await import('zlib');
  console.log(t, px.length);
}
await p.screenshot({ path: D + 'dbg2.png' });
await b.close();
