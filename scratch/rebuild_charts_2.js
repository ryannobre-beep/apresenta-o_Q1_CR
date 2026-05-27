const fs = require('fs');

const chartsPath = '../src/charts.js';
let content = fs.readFileSync(chartsPath, 'utf8');

const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf(';');
let data = JSON.parse(content.substring(jsonStart, jsonEnd));

if (data['chart_10'] && Array.isArray(data['chart_10'].data)) {
  const traces = data['chart_10'].data;
  // traces[0] = Loc 2025, traces[1] = Loc 2026, traces[2] = Cond 2025, traces[3] = Cond 2026
  // Wait, let's filter them dynamically based on customdata[0][2] which is the vertical name (from my previous dump: "Locação" or "Condomínio")
  
  const locTraces = traces.filter(t => t.customdata && t.customdata[0] && t.customdata[0][2] === "Locação");
  const condTraces = traces.filter(t => t.customdata && t.customdata[0] && t.customdata[0][2] === "Condomínio");
  
  // Clean up xaxis attributes because they will now be in their own charts
  locTraces.forEach(t => { t.xaxis = 'x'; t.yaxis = 'y'; t.showlegend = true; });
  condTraces.forEach(t => { t.xaxis = 'x'; t.yaxis = 'y'; t.showlegend = true; });
  
  const layoutBase = JSON.parse(JSON.stringify(data['chart_10'].layout));
  // Clean layout
  delete layoutBase.xaxis2;
  delete layoutBase.yaxis2;
  delete layoutBase.annotations; // remove old annotations that were centered on subplots
  
  data['chart_10_locacao'] = {
    data: locTraces,
    layout: layoutBase
  };
  
  data['chart_10_condominio'] = {
    data: condTraces,
    layout: layoutBase
  };
}

const newContent = "window.chartsData = " + JSON.stringify(data, null, 2) + ";\n";
fs.writeFileSync(chartsPath, newContent);
console.log('Rebuilt chart_10');
