const fs = require('fs');

function removeSlides(filename, slideIdsToRemove) {
  let content = fs.readFileSync(filename, 'utf-8');
  let newContent = "";
  
  let inRemoveBlock = false;
  
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    let isStartOfSlide = false;
    for (const id of slideIdsToRemove) {
      if (line.includes(`<section class="slide`) && line.includes(`id="slide-${id}"`)) {
        isStartOfSlide = true;
        inRemoveBlock = true;
        break;
      }
    }
    
    if (inRemoveBlock) {
      if (line.includes(`</section>`)) {
        inRemoveBlock = false;
      }
      continue;
    }
    
    newContent += line + '\n';
  }
  
  // Also we must update the JS link if it's locacao or condominio
  if (filename === 'locacao.html') {
    newContent = newContent.replace('src="src/charts.js"', 'src="src/charts_locacao.js"');
  } else if (filename === 'condominio.html') {
    newContent = newContent.replace('src="src/charts.js"', 'src="src/charts_condominio.js"');
  }
  
  fs.writeFileSync(filename, newContent);
}

// Diretorias (index.html)
// Remove slides 12, 13, 14, 15, 16, 18, 19, 20, 21
removeSlides('index.html', [12, 13, 14, 15, 16, 18, 19, 20, 21]);

// Locacao (locacao.html)
// Keep ONLY Locacao specific slides + macro + cover
// Remove Condominio slides (14, 16, 21)
// Remove base slides (2, 3, 4) -- "1 ano de lado bom, pessoas chaves, etc. foram pensados para diretorias"
removeSlides('locacao.html', [2, 3, 4, 14, 16, 21]);

// Condominio (condominio.html)
// Keep ONLY Condominio specific slides + macro + cover
// Remove Locacao slides (13, 15, 20)
// Remove base slides (2, 3, 4)
removeSlides('condominio.html', [2, 3, 4, 13, 15, 20]);

console.log("HTML files updated!");
