const fs = require('fs');

function adjustCharts() {
  const filepath = '../src/charts_locacao.js';
  let jsContent = fs.readFileSync(filepath, 'utf8');
  
  // 1. Darken the 2025 color
  // #F2F2F4 -> #D0CDD6
  jsContent = jsContent.replace(/#F2F2F4/g, '#D0CDD6');
  
  // 2. Remove "Acordos Comerciais" from the arrays in any chart that has it in x
  let jsonStr = jsContent.replace('window.chartsData = ', '').trim();
  if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
  
  let data = JSON.parse(jsonStr);
  
  for (let key in data) {
    let chart = data[key];
    if (chart.data) {
      for (let t of chart.data) {
        if (t.x && t.x.includes('Acordos Comerciais')) {
          let idx = t.x.indexOf('Acordos Comerciais');
          t.x.splice(idx, 1);
          if (t.y) t.y.splice(idx, 1);
          if (t.customdata) t.customdata.splice(idx, 1);
          if (t.text) t.text.splice(idx, 1);
          if (t.measure) t.measure.splice(idx, 1);
        } else if (t.name === 'Acordos Comerciais' || t.legendgroup === 'Acordos Comerciais') {
          // If it's a trace instead of an x-axis value
          // We can remove this trace entirely from chart.data
          // We will handle this in a filter below
        }
      }
      
      // Filter out traces that are named "Acordos Comerciais"
      chart.data = chart.data.filter(t => t.name !== 'Acordos Comerciais' && t.legendgroup !== 'Acordos Comerciais');
    }
  }
  
  const outStr = 'window.chartsData = ' + JSON.stringify(data, null, 2) + ';';
  fs.writeFileSync(filepath, outStr);
  console.log('Adjustments applied');
}

adjustCharts();
