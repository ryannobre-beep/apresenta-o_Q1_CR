const puppeteer = require('puppeteer');
const PptxGenJS = require('pptxgenjs');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function run() {
  console.log('Starting Puppeteer...');
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Presentation is 16:9, so let's use standard 1080p
  await page.setViewport({ width: 1920, height: 1080 });

  const url = 'file://' + path.resolve('../diretorias.html');
  console.log('Loading ' + url);
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Hide UI elements
  await page.evaluate(() => {
    const hide = (sel) => {
      const el = document.querySelector(sel);
      if (el) el.style.display = 'none';
    };
    hide('.hud-nav-buttons');
    hide('.hud-footer');
    hide('.drawer-toggle');
    hide('.keyboard-hint');
    
    // Disable transitions to make screenshots instant
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        transition: none !important;
        animation: none !important;
      }
    `;
    document.head.appendChild(style);
  });

  // Wait a bit for initial charts
  await new Promise(r => setTimeout(r, 2000));

  const totalSlides = await page.evaluate(() => document.querySelectorAll('.slide').length);
  console.log('Total slides found:', totalSlides);

  const imagePaths = [];

  for (let i = 0; i < totalSlides; i++) {
    console.log(`Capturing slide ${i + 1}/${totalSlides}...`);
    // Wait for any plotly charts to finish drawing
    await new Promise(r => setTimeout(r, 800));
    
    const imgPath = path.join(__dirname, `slide_${i}.png`);
    await page.screenshot({ path: imgPath });
    imagePaths.push(imgPath);

    if (i < totalSlides - 1) {
      // Go to next slide
      await page.keyboard.press('ArrowRight');
    }
  }

  await browser.close();

  const exportDir = path.resolve('../Exportações');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
  }

  // Generate PPTX
  console.log('Generating PPTX...');
  let pres = new PptxGenJS();
  pres.layout = 'LAYOUT_16x9';

  for (const img of imagePaths) {
    let slide = pres.addSlide();
    // 16x9 aspect ratio dimensions in inches: w: 10, h: 5.625
    slide.addImage({ path: img, x: 0, y: 0, w: 10, h: 5.625 });
  }

  const pptxPath = path.join(exportDir, 'Apresentacao_Diretorias_Q1_2026.pptx');
  await pres.writeFile({ fileName: pptxPath });
  console.log('PPTX created:', pptxPath);

  // Generate PDF
  console.log('Generating PDF...');
  const pdfDoc = await PDFDocument.create();
  for (const img of imagePaths) {
    const imageBytes = fs.readFileSync(img);
    const image = await pdfDoc.embedPng(imageBytes);
    // 1920x1080 matches 16:9
    const page = pdfDoc.addPage([1920, 1080]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: 1920,
      height: 1080,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const pdfPath = path.join(exportDir, 'Apresentacao_Diretorias_Q1_2026.pdf');
  fs.writeFileSync(pdfPath, pdfBytes);
  console.log('PDF created:', pdfPath);

  // Clean up images
  for (const img of imagePaths) {
    fs.unlinkSync(img);
  }

  console.log('All exports completed successfully!');
}

run().catch(console.error);
