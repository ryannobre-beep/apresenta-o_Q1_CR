const fs = require('fs');

function removeSlides(filename, slideIdsToRemove) {
  let content = fs.readFileSync(filename, 'utf-8');
  let newContent = "";
  let inRemoveBlock = false;
  
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Remove the slide section
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

    // Remove the drawer menu items as well
    let removeMenuItem = false;
    for (const id of slideIdsToRemove) {
      if (line.includes(`<li class="drawer-menu-item" data-slide="${id - 1}">`)) {
        removeMenuItem = true;
        break;
      }
    }
    if (removeMenuItem) continue;

    newContent += line + '\n';
  }
  
  fs.writeFileSync(filename, newContent);
}

// Remove the detailed slides from Locacao and Condominio as well!
// The user requested: YoY por Produto (12, 13, 14), Ranking (18), Heatmap (19), Pontes (15, 16), Detalhamentos Individuais (20, 21).
const toRemove = [12, 13, 14, 15, 16, 18, 19, 20, 21];

removeSlides('../locacao.html', toRemove);
removeSlides('../condominio.html', toRemove);

// We also need to fix index.html to ensure it has everything!
// The user said: "Você entendeu errado o index, era pra manter como estava. com todos os gráficos."
// I ALREADY ran restore_index.js previously, so index.html is fully restored.

console.log("All extra slides removed from loc and cond as requested.");
