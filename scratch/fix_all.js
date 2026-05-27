const fs = require('fs');

// 1. Create diretorias.html
let indexHtml = fs.readFileSync('../index.html', 'utf-8');
fs.writeFileSync('../diretorias.html', indexHtml);

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

// Diretorias: Remove detailed vertical slides
removeSlides('../diretorias.html', [12, 13, 14, 15, 16, 18, 19, 20, 21]);

// Locacao: Remove Condominio slides and base slides from the menu items!
// Because we already removed the sections from locacao.html, the sections are gone.
// We just need to remove the menu items. Wait, if I run it again, it'll remove the menu items.
removeSlides('../locacao.html', [2, 3, 4, 14, 16, 21]);
removeSlides('../condominio.html', [2, 3, 4, 13, 15, 20]);

// 2. Fix the charts_locacao.js and charts_condominio.js product filters
function cleanProducts(file, vertical) {
  let text = fs.readFileSync(file, 'utf-8');
  text = text.replace('window.chartsData = ', 'module.exports = ');
  fs.writeFileSync('temp_charts_clean.js', text);

  delete require.cache[require.resolve('./temp_charts_clean.js')];
  const charts = require('./temp_charts_clean.js');

  const locacaoProds = ['IMOE', 'IMOR', 'FIAN', 'CAP', 'AUTO'];
  const condProds = ['COND', 'CTDR', 'VG', 'RES'];
  
  const prodsToRemove = vertical === 'Locação' ? condProds : locacaoProds;

  function filterTraceByX(chart) {
    if (chart && chart.data) {
      chart.data.forEach(t => {
        if (t.x && Array.isArray(t.x)) {
          for (let i = t.x.length - 1; i >= 0; i--) {
            if (prodsToRemove.includes(t.x[i])) {
              t.x.splice(i, 1);
              if (t.y) t.y.splice(i, 1);
              if (t.customdata) t.customdata.splice(i, 1);
              if (t.text) t.text.splice(i, 1);
              if (t.measure) t.measure.splice(i, 1);
            }
          }
        }
      });
    }
  }

  function filterTraceByY(chart) {
    if (chart && chart.data) {
      chart.data.forEach(t => {
        if (t.y && Array.isArray(t.y)) {
          for (let i = t.y.length - 1; i >= 0; i--) {
            // Check if exact match OR contains the product (for heatmap 'Locação | IMOE')
            if (prodsToRemove.includes(t.y[i]) || prodsToRemove.some(p => t.y[i].includes(`| ${p}`))) {
              t.y.splice(i, 1);
              if (t.x) t.x.splice(i, 1);
              if (t.customdata) t.customdata.splice(i, 1);
              if (t.text) t.text.splice(i, 1);
              if (t.z) t.z.splice(i, 1);
            }
          }
        }
      });
    }
  }

  // Chart 5 (Composição de Rebate por Produto) -> Products are in x
  filterTraceByX(charts.chart_05);
  // Chart 6 (Ranking) -> Products are in y
  filterTraceByY(charts.chart_06);
  // Chart 7 (Mapa de Intensidade) -> Products are in y
  filterTraceByY(charts.chart_07);
  // Chart 12 (YoY por Produto) -> Products are in x
  filterTraceByX(charts.chart_12);

  const output = 'window.chartsData = ' + JSON.stringify(charts, null, 2) + ';';
  fs.writeFileSync(file, output);
}

cleanProducts('../src/charts_locacao.js', 'Locação');
cleanProducts('../src/charts_condominio.js', 'Condomínio');

console.log("All fixes applied successfully.");
