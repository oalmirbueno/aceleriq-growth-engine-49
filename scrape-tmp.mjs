import Firecrawl from '@mendable/firecrawl-js';
import fs from 'fs';

const fc = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });
const r = await fc.scrape('https://aceleriq.online', {
  formats: [{ type: 'screenshot', fullPage: true }],
  onlyMainContent: false,
  waitFor: 8000,
  timeout: 60000,
});

const shot = r.screenshot || r.data?.screenshot;
console.log('keys:', Object.keys(r));
console.log('shot type:', typeof shot, shot?.slice?.(0, 60));

if (typeof shot === 'string' && shot.startsWith('http')) {
  const res = await fetch(shot);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync('src/assets/painel-aceleriq-online.png', buf);
  console.log('saved', buf.length, 'bytes');
} else if (typeof shot === 'string') {
  const b64 = shot.replace(/^data:image\/\w+;base64,/, '');
  fs.writeFileSync('src/assets/painel-aceleriq-online.png', Buffer.from(b64, 'base64'));
  console.log('saved from base64');
}
