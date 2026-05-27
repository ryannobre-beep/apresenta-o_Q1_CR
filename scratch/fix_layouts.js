const fs = require('fs');

const chartsPath = '../src/charts.js';
let content = fs.readFileSync(chartsPath, 'utf8');

const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf(';');
let data = JSON.parse(content.substring(jsonStart, jsonEnd));

function cleanLayout(chartId) {
  if (data[chartId] && data[chartId].layout) {
    const layout = data[chartId].layout;
    if (layout.xaxis && layout.xaxis.domain) delete layout.xaxis.domain;
    if (layout.yaxis && layout.yaxis.domain) delete layout.yaxis.domain;
    if (layout.annotations) delete layout.annotations;
  }
}

cleanLayout('chart_05_locacao');
cleanLayout('chart_05_condominio');
cleanLayout('chart_10_locacao');
cleanLayout('chart_10_condominio');

const newContent = "window.chartsData = " + JSON.stringify(data, null, 2) + ";\n";
fs.writeFileSync(chartsPath, newContent);
console.log('Fixed Plotly layouts');
