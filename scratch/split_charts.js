const fs = require('fs');

function processCharts(file, verticalToKeep) {
  let text = fs.readFileSync(file, 'utf-8');
  text = text.replace('window.chartsData = ', 'module.exports = ');
  fs.writeFileSync('temp_charts_split.js', text);

  delete require.cache[require.resolve('./temp_charts_split.js')];
  const charts = require('./temp_charts_split.js');

  const vToRemove = verticalToKeep === 'Locação' ? 'Condomínio' : 'Locação';

  if (charts.chart_01 && charts.chart_01.data[0]) {
    let c1 = charts.chart_01.data[0];
    let idx = c1.labels.indexOf(vToRemove);
    if (idx !== -1) {
      c1.labels.splice(idx, 1);
      c1.values.splice(idx, 1);
      if (c1.customdata) c1.customdata.splice(idx, 1);
      if (c1.marker && c1.marker.colors) c1.marker.colors.splice(idx, 1);
      if (c1.customdata && c1.customdata[0]) {
        c1.customdata[0][1] = "100%";
      }
    }
  }

  if (charts.chart_02 && charts.chart_02.data) {
    charts.chart_02.data = charts.chart_02.data.filter(t => t.name !== vToRemove);
  }

  if (charts.chart_03 && charts.chart_03.data) {
    charts.chart_03.data.forEach(t => {
      let idx = t.x.indexOf(vToRemove);
      if (idx !== -1) {
        t.x.splice(idx, 1);
        t.y.splice(idx, 1);
        if (t.text) t.text.splice(idx + 2, 1); 
        if (t.customdata) t.customdata.splice(idx, 1);
      }
      t.text = t.y.map(v => "R$ " + v.toLocaleString('pt-BR'));
    });
  }

  if (charts.chart_04 && charts.chart_04.data) {
    charts.chart_04.data.forEach(t => {
      let idx = t.x.indexOf(vToRemove);
      if (idx !== -1) {
        t.x.splice(idx, 1);
        t.y.splice(idx, 1);
        if (t.text) t.text.splice(idx, 1);
        if (t.customdata) t.customdata.splice(idx, 1);
      }
    });
  }

  if (charts.chart_10 && charts.chart_10.data) {
    charts.chart_10.data = charts.chart_10.data.filter(t => {
      if (t.customdata && t.customdata[0]) {
        let cdStr = JSON.stringify(t.customdata);
        if (cdStr.includes(vToRemove)) {
           return false;
        }
      }
      return true;
    });
  }

  const output = 'window.chartsData = ' + JSON.stringify(charts, null, 2) + ';';
  fs.writeFileSync(file, output);
}

processCharts('../src/charts_locacao.js', 'Locação');
processCharts('../src/charts_condominio.js', 'Condomínio');

console.log("Charts splitting complete.");
