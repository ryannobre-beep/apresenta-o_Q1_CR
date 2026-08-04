const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const files = [
  'diretorias.html',
  'locacao.html',
  'condominio.html'
];

const exportDir = path.join(__dirname, 'PDFs');

if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir);
}

async function exportPresentations() {
  const randomProfile = './puppeteer_tmp_profile_' + Math.random().toString(36).substring(7);
  const browser = await puppeteer.launch({
    headless: "new",
    userDataDir: randomProfile,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const file of files) {
    console.log(`\nStarting export for: ${file}`);
    const filePath = path.join(__dirname, file);
    const pdfDoc = await PDFDocument.create();
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    
    // Load the file
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

    // Hide the UI elements to ensure they don't overlap the presentation in the PDF
    await page.evaluate(() => {
      const elementsToHide = [
        '.drawer-toggle',
        '.drawer-sidebar',
        '.hud-nav-buttons',
        '.hud-footer',
        '.keyboard-hint'
      ];
      elementsToHide.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.style.display = 'none';
      });
      
      const drawer = document.querySelector('.drawer-sidebar');
      if (drawer) drawer.classList.remove('open');
      
      // FIX CHROMIUM PDF RENDER BUG: Remove all shadows and backdrop-filters
      // Chromium renders box-shadows on border-radius elements as solid grey rectangles in PDF.
      const style = document.createElement('style');
      style.innerHTML = `
        * { 
          box-shadow: none !important; 
          text-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
      `;
      document.head.appendChild(style);
    });

    // Get number of slides
    const slideHandles = await page.$$('.drawer-menu-item');
    console.log(`Found ${slideHandles.length} slides in ${file}`);

    for (let i = 0; i < slideHandles.length; i++) {
      console.log(`Exporting slide ${i + 1}/${slideHandles.length}...`);
      
      // Click the menu item via evaluation to avoid element-not-clickable issues
      await page.evaluate((index) => {
        const items = document.querySelectorAll('.drawer-menu-item');
        if (items[index]) items[index].click();
      }, i);
      
      // Wait for Plotly and CSS transitions
      await new Promise(r => setTimeout(r, 2000));

      // Capture PDF of the current state
      const pdfBuffer = await page.pdf({
        width: '1920px',
        height: '1080px',
        printBackground: true,
        pageRanges: '1'
      });

      // Load buffer into pdf-lib
      const tempPdf = await PDFDocument.load(pdfBuffer);
      const copiedPages = await pdfDoc.copyPages(tempPdf, [0]);
      pdfDoc.addPage(copiedPages[0]);
    }

    const pdfBytes = await pdfDoc.save();
    const outputName = `Apresentacao_${file.replace('.html', '').charAt(0).toUpperCase() + file.replace('.html', '').slice(1)}.pdf`;
    const outputPath = path.join(exportDir, outputName);
    
    fs.writeFileSync(outputPath, pdfBytes);
    console.log(`Successfully saved: ${outputPath}`);
    
    await page.close();
  }

  await browser.close();
  console.log('\nAll presentations exported successfully!');
}

exportPresentations().catch(err => {
  console.error("Error during export:", err);
  process.exit(1);
});
