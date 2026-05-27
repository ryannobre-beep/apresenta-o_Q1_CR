const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const locacaoMap = {
  "chart_10": "01_comparativo_yoy_mensal.html",
  "chart_11": "02_variacao_yoy_mensal.html",
  "chart_03": "03_meta_vs_realizado.html",
  "chart_05": "04_composicao_2026_com_meta_comercial.html",
  "chart_06": "05_ranking_produtos_operacionais.html",
  "chart_13": "06_yoy_produto_operacional.html",
  "chart_12": "07_variacao_yoy_produto_operacional.html",
  "chart_15": "08_ponte_yoy_produto_operacional_q1.html",
  "chart_07": "09_heatmap_produto_operacional_mes.html",
  "chart_loc_10": "10_meta_comercial_janeiro.html"
};

const condominioMap = {
  "chart_10": "01_comparativo_yoy_mensal.html",
  "chart_11": "02_variacao_yoy_mensal.html",
  "chart_03": "03_meta_vs_realizado.html",
  "chart_05": "04_composicao_produto.html",
  "chart_06": "05_ranking_produtos.html",
  "chart_07": "06_heatmap_produto_mes.html"
};

function extractPlotlyData(htmlPath) {
    const content = fs.readFileSync(htmlPath, 'utf8');
    
    // Use the same extraction logic from previous scripts
    // Plotly.newPlot("...", [...], {...}, {...})
    const regex = /Plotly\.newPlot\(\s*['"][^'"]+['"],\s*(\[.*\]),\s*({.*}),\s*({.*})\s*\)/s;
    const match = content.match(regex);
    
    if (match) {
        return {
            data: match[1],
            layout: match[2],
            config: match[3]
        };
    }
    
    // Alternative regex if format differs slightly
    const regex2 = /Plotly\.newPlot\(\s*document\.getElementById\([^)]+\),\s*(\[.*\]),\s*({.*}),\s*({.*})\s*\)/s;
    const match2 = content.match(regex2);
    if (match2) {
        return {
            data: match2[1],
            layout: match2[2],
            config: match2[3]
        };
    }

    return null;
}

function processVertical(folderName, map, outputFileName) {
  console.log(`Processing ${folderName}...`);
  const existingFile = path.join(projectRoot, 'src', 'charts.js');
  let jsContent = fs.readFileSync(existingFile, 'utf-8');
  
  // Create a new obj for the output
  // We'll read the existing JS, parse it, modify it, and write it.
  // BUT parsing JS as JSON is hard because of 'window.chartsData = '.
  // So we'll just inject/replace text.
  
  for (const [chartId, fileName] of Object.entries(map)) {
    const htmlPath = path.join(projectRoot, folderName, fileName);
    if (fs.existsSync(htmlPath)) {
      console.log(`  Extracting ${fileName} for ${chartId}...`);
      const extracted = extractPlotlyData(htmlPath);
      if (extracted) {
        // Build the new JS string for this chart
        const newChartJs = `  "${chartId}": {
    "data": ${extracted.data},
    "layout": ${extracted.layout},
    "config": ${extracted.config}
  }`;

        // Find if this chart already exists in the file
        const regexFind = new RegExp(`"${chartId}"\\s*:\\s*{[\\s\\S]*?\\}\\s*\\],\\s*"layout"\\s*:[\\s\\S]*?\\}\\s*\\}`, 'g');
        
        let found = false;
        jsContent = jsContent.replace(regexFind, (match) => {
          found = true;
          return newChartJs.trim();
        });

        // If not found, append it before the last closing brace
        if (!found) {
            // Find the last closing brace in window.chartsData = { ... };
            const lastBraceIdx = jsContent.lastIndexOf('}');
            if (lastBraceIdx !== -1) {
                // we need to add a comma if the last character before brace isn't a comma
                jsContent = jsContent.substring(0, lastBraceIdx) + `,\n${newChartJs}\n` + jsContent.substring(lastBraceIdx);
            }
        }
      } else {
        console.error(`    Failed to extract from ${fileName}`);
      }
    } else {
      console.error(`    File not found: ${htmlPath}`);
    }
  }

  // Write the output file
  const outputPath = path.join(projectRoot, 'src', outputFileName);
  fs.writeFileSync(outputPath, jsContent);
  console.log(`Saved to ${outputFileName}`);
}

processVertical('Gráficos Locação', locacaoMap, 'charts_locacao.js');
processVertical('Gráficos Condomínio', condominioMap, 'charts_condominio.js');
