import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });
  await page.goto('http://localhost:5173/');
  // Wait a moment for fonts to load
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '/Users/rajan/.gemini/antigravity-ide/brain/2d22a65b-f50b-4e99-a23f-d0bb488c291a/website.png' });
  await browser.close();
})();
