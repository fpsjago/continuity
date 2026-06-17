import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4402/continuity/', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
// scroll to backbone
await p.evaluate(() => document.getElementById('backbone')?.scrollIntoView());
await p.waitForTimeout(1500);
await p.screenshot({ path: './_backbone.png' });
await b.close(); console.log('done');
