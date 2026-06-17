import { chromium } from 'playwright';
const url = process.argv[2], out = process.argv[3];
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: 'networkidle' });
// scroll through to hydrate islands + fire reveals + scrub
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y <= h; y += 500) { await p.mouse.wheel(0, 500); await p.waitForTimeout(120); }
await p.waitForTimeout(600);
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(1500); // let hero anim settle
await p.screenshot({ path: out, fullPage: true });
await b.close();
console.log('captured', out);
