import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 860 } });
await p.goto('http://localhost:4401/continuity/', { waitUntil: 'networkidle' });
await p.waitForTimeout(2200); // hero anim settle
await p.screenshot({ path: './_hero.png' }); // viewport only
await b.close();
console.log('done');
