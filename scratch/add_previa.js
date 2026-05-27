const fs = require('fs');

const chartsPath = '../src/charts.js';
let content = fs.readFileSync(chartsPath, 'utf8');

const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf(';');
let data = JSON.parse(content.substring(jsonStart, jsonEnd));

if (data['chart_02'] && data['chart_02'].data.length === 2) {
  const locBase = data['chart_02'].data[0];
  const condBase = data['chart_02'].data[1];
  
  // Locação Prev
  const locPrev = JSON.parse(JSON.stringify(locBase));
  locPrev.name = "Locação (Prévia)";
  locPrev.showlegend = false;
  locPrev.x = ["Mar", "Abr"];
  locPrev.y = [locBase.y[2], 154129.55]; // Mar value to Abr value
  locPrev.customdata = [
    locBase.customdata[2],
    ["R$ 154.129,55"]
  ];
  locPrev.line.dash = "dash";
  
  // Condomínio Prev
  const condPrev = JSON.parse(JSON.stringify(condBase));
  condPrev.name = "Condomínio (Prévia)";
  condPrev.showlegend = false;
  condPrev.x = ["Mar", "Abr"];
  condPrev.y = [condBase.y[2], 56345.22];
  condPrev.customdata = [
    condBase.customdata[2],
    ["R$ 56.345,22"]
  ];
  condPrev.line.dash = "dash";
  
  data['chart_02'].data.push(locPrev, condPrev);
}

const newContent = "window.chartsData = " + JSON.stringify(data, null, 2) + ";\n";
fs.writeFileSync(chartsPath, newContent);
console.log('Added April previews to chart_02');
