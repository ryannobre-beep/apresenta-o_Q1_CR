const fs = require('fs');

const chartsPath = '../src/charts.js';
let content = fs.readFileSync(chartsPath, 'utf8');

const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf(';');
let data = JSON.parse(content.substring(jsonStart, jsonEnd));

// Update colors for Condominio in chart 10
if (data['chart_10_condominio']) {
  data['chart_10_condominio'].data.forEach(trace => {
    // trace.name is "2025" or "2026"
    if (trace.name === "2026") {
      trace.marker.color = '#E58E26'; // The project's accent-orange
    }
  });
}

const newContent = "window.chartsData = " + JSON.stringify(data, null, 2) + ";\n";
fs.writeFileSync(chartsPath, newContent);
console.log('Updated Condominio color in chart_10');
