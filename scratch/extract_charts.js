const fs = require('fs');
const path = require('path');

function extractPlotlyArgs(htmlStr) {
  // Finds Plotly.newPlot("id", [DATA], {LAYOUT})
  // Since regex with nested brackets is hard, let's use string indexOf
  const searchStr = "Plotly.newPlot(";
  const plotIdx = htmlStr.indexOf(searchStr);
  if (plotIdx === -1) return null;

  const startIdx = plotIdx + searchStr.length;
  // We need to parse arguments.
  // 1st arg: "id"
  // 2nd arg: [ ... ] (DATA)
  // 3rd arg: { ... } (LAYOUT)
  
  let depthArray = 0;
  let depthObj = 0;
  let inString = false;
  let escape = false;
  
  let dataStart = -1;
  let dataEnd = -1;
  
  let layoutStart = -1;
  let layoutEnd = -1;
  
  for (let i = startIdx; i < htmlStr.length; i++) {
    const char = htmlStr[i];
    
    if (escape) {
      escape = false;
      continue;
    }
    
    if (char === '\\') {
      escape = true;
      continue;
    }
    
    if (char === '"' || char === "'") {
      if (!inString) inString = char;
      else if (inString === char) inString = false;
    }
    
    if (!inString) {
      if (char === '[') {
        if (depthArray === 0 && dataStart === -1) dataStart = i;
        depthArray++;
      } else if (char === ']') {
        depthArray--;
        if (depthArray === 0 && dataStart !== -1 && dataEnd === -1) dataEnd = i + 1;
      }
      
      if (char === '{') {
        if (depthObj === 0 && dataEnd !== -1 && layoutStart === -1) layoutStart = i;
        depthObj++;
      } else if (char === '}') {
        depthObj--;
        if (depthObj === 0 && layoutStart !== -1 && layoutEnd === -1) {
           layoutEnd = i + 1;
           break; // Done!
        }
      }
    }
  }
  
  if (dataStart !== -1 && dataEnd !== -1 && layoutStart !== -1 && layoutEnd !== -1) {
    const dataStr = htmlStr.slice(dataStart, dataEnd);
    const layoutStr = htmlStr.slice(layoutStart, layoutEnd);
    return { dataStr, layoutStr };
  }
  return null;
}

function processFolder(folderPath, mapConfig, existingFile) {
  let text = fs.readFileSync(existingFile, 'utf-8');
  text = text.replace('window.chartsData = ', 'module.exports = ');
  fs.writeFileSync('temp_merge.js', text);
  delete require.cache[require.resolve('./temp_merge.js')];
  let chartsDataObj = require('./temp_merge.js');
  
  for (const [chartKey, fileName] of Object.entries(mapConfig)) {
    const fullPath = path.join(folderPath, fileName);
    if (fs.existsSync(fullPath)) {
      const htmlContent = fs.readFileSync(fullPath, 'utf-8');
      const extracted = extractPlotlyArgs(htmlContent);
      if (extracted) {
        try {
          const data = JSON.parse(extracted.dataStr);
          const layout = JSON.parse(extracted.layoutStr);
          chartsDataObj[chartKey] = { data, layout };
        } catch (e) {
          console.error("Failed to parse JSON for " + fileName, e);
        }
      }
    } else {
      console.warn("File not found: " + fullPath);
    }
  }
  
  return chartsDataObj;
}

const locacaoMap = {
  "chart_10": "locacao_01_comparativo_yoy_mensal.html",
  "chart_11": "locacao_02_variacao_yoy_mensal.html",
  "chart_03": "locacao_03_meta_vs_realizado.html", // Or maybe chart_08? Wait, chart_03 is Meta x Realizado
  "chart_05": "locacao_04_composicao_produto_2026.html",
  "chart_06": "locacao_05_ranking_produtos_2026.html",
  "chart_13": "locacao_06_yoy_produto.html",
  "chart_12": "locacao_07_variacao_yoy_produto.html", // Variação YoY Produto
  "chart_15": "locacao_08_ponte_yoy_produto_q1.html",
  "chart_07": "locacao_09_heatmap_produto_mes_2026.html"
};

const condMap = {
  "chart_10": "condominio_01_comparativo_yoy_mensal.html",
  "chart_11": "condominio_02_variacao_yoy_mensal.html",
  "chart_03": "condominio_03_meta_vs_realizado.html",
  "chart_05": "condominio_04_composicao_produto_2026.html",
  "chart_06": "condominio_05_ranking_produtos_2026.html",
  "chart_14": "condominio_06_yoy_produto.html", // Cond YoY
  "chart_12": "condominio_07_variacao_yoy_produto.html",
  "chart_16": "condominio_08_ponte_yoy_produto_q1.html",
  "chart_07": "condominio_09_heatmap_produto_mes_2026.html"
};

const locData = processFolder('../Gráficos Locação', locacaoMap, '../src/charts_locacao.js');
const condData = processFolder('../Gráficos Condomínio', condMap, '../src/charts_condominio.js');

// For missing charts (like chart_02), let's keep the base ones?
// The user says "Dele vai ser 3 novos arquivos, loc, cond e diretorias. com Slides removidos..."
// Let's just output the charts_locacao.js
fs.writeFileSync('../src/charts_locacao.js', "window.chartsData = " + JSON.stringify(locData, null, 2) + ";");
fs.writeFileSync('../src/charts_condominio.js', "window.chartsData = " + JSON.stringify(condData, null, 2) + ";");

console.log("Charts perfectly extracted and saved!");
