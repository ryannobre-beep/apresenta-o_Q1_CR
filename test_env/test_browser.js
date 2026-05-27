const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  
  // Capture console logs from the browser
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err));
  
  console.log("Navigating to index.html...");
  const filePath = "file:///Users/ryansilva/Downloads/Apresentação Q1 2026 - CR/index.html";
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  
  console.log("Page loaded. Navigating slides...");
  
  // Click next button to go through a few slides
  for (let i = 0; i < 25; i++) {
    await page.evaluate(() => {
      const nextBtn = document.querySelector('#next-btn');
      if (nextBtn) nextBtn.click();
    });
    // Wait for animation
    await new Promise(r => setTimeout(r, 500));
    
    // Check if there are plotly charts rendered on this slide
    const chartRendered = await page.evaluate(() => {
      const activeSlide = document.querySelector('.slide.active');
      if (!activeSlide) return false;
      const chartDiv = activeSlide.querySelector('.plotly-chart-container');
      // If there's a chart container, check if it has the svg or gl child
      if (chartDiv) {
        return chartDiv.querySelector('.svg-container') !== null;
      }
      return null;
    });
    
    console.log(`Slide ${i+1} chart status:`, chartRendered === null ? "No chart expected" : (chartRendered ? "Rendered!" : "FAILED/BLANK"));
  }

  await browser.close();
})();
