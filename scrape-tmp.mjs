import Firecrawl from '@mendable/firecrawl-js';
const fc = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });
const r = await fc.scrape('https://aceleriq.online', { formats: ['screenshot'], waitFor: 3000 });
console.log(JSON.stringify({ keys: Object.keys(r), screenshot: r.screenshot, meta: r.metadata }, null, 2));
