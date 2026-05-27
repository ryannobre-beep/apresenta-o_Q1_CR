const fs = require('fs');

function formatCurrency(val) {
  return "R$ " + val.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
}

function formatPercent(val) {
  return val.toLocaleString('pt-BR', {minimumFractionDigits:1, maximumFractionDigits:1}) + "%";
}

let text = fs.readFileSync('../src/charts.js', 'utf-8');
text = text.replace('window.chartsData = ', 'module.exports = ');
fs.writeFileSync('charts_module2.js', text);

const charts = require('./charts_module2.js');

const addAC = 15122.62;

// 1. Update Chart 02 (Evolução Mensal)
let c2Loc = charts.chart_02.data.find(t => t.name === "Locação");
if (c2Loc) {
  c2Loc.y[0] += addAC; // Jan is index 0
  if (c2Loc.text) c2Loc.text[0] = formatCurrency(c2Loc.y[0]);
  if (c2Loc.customdata) c2Loc.customdata[0][0] = formatCurrency(c2Loc.y[0]);
}

// 2. Update Chart 03 (Meta x Realizado)
let c3Realizado = charts.chart_03.data.find(t => t.name === "Realizado Q1");
if (c3Realizado) {
  let c3xIdx = c3Realizado.x.indexOf("Locação");
  if (c3xIdx !== -1) {
    c3Realizado.y[c3xIdx] += addAC;
    c3Realizado.customdata[c3xIdx][0] = formatCurrency(c3Realizado.y[c3xIdx]);
    c3Realizado.text[c3xIdx+2] = "R$ " + c3Realizado.y[c3xIdx].toLocaleString('pt-BR', {minimumFractionDigits:0, maximumFractionDigits:0});
  }
}

// 3. Update Chart 01 (Participação)
let c1 = charts.chart_01.data[0];
let c1LocIdx = c1.labels.indexOf("Locação");
if (c1LocIdx !== -1) {
  c1.values[c1LocIdx] += addAC;
  let totalQ1 = c1.values.reduce((a,b) => a+b, 0);
  c1.values.forEach((v, i) => {
    if (c1.customdata) c1.customdata[i][0] = formatCurrency(v);
    if (c1.customdata) c1.customdata[i][1] = formatPercent((v / totalQ1) * 100);
  });
}

// 4. Update Chart 04 (Atingimento da Meta)
let c4 = charts.chart_04.data[0];
let c4LocIdx = c4.x.indexOf("Locação");
if (c4LocIdx !== -1) {
  let c3Meta = charts.chart_03.data.find(t => t.name === "Meta Q1").y[c4LocIdx];
  let c3RealizadoVal = charts.chart_03.data.find(t => t.name === "Realizado Q1").y[c4LocIdx];
  c4.y[c4LocIdx] = (c3RealizadoVal / c3Meta) * 100;
  if (c4.customdata) c4.customdata[c4LocIdx][1] = formatCurrency(c3RealizadoVal);
  if (c4.text) c4.text[c4LocIdx] = formatPercent(c4.y[c4LocIdx]);
}

// 5. Remove "AC" traces from ALL detailing charts
[charts.chart_05, charts.chart_08].forEach(chart => {
  if (chart && chart.data) {
    chart.data = chart.data.filter(t => t.name !== "AC");
  }
});

// 6. Remove "AC" inside array traces for other detailing charts
[charts.chart_06, charts.chart_12, charts.chart_13].forEach(chart => {
  if (chart && chart.data) {
    chart.data.forEach(t => {
      if (t.y && Array.isArray(t.y)) {
        let idx = t.y.indexOf("AC");
        if (idx !== -1) {
          t.y.splice(idx, 1);
          if (t.x) t.x.splice(idx, 1);
          if (t.customdata) t.customdata.splice(idx, 1);
          if (t.text) t.text.splice(idx, 1);
        }
      }
      if (t.x && Array.isArray(t.x)) {
        let idx = t.x.indexOf("AC");
        if (idx !== -1) {
          t.x.splice(idx, 1);
          if (t.y) t.y.splice(idx, 1);
          if (t.customdata) t.customdata.splice(idx, 1);
          if (t.text) t.text.splice(idx, 1);
        }
      }
    });
  }
});

// 7. Remove "Locação | AC" from Heatmap (chart_07)
if (charts.chart_07 && charts.chart_07.data && charts.chart_07.data[0]) {
  let hmap = charts.chart_07.data[0];
  let hmapIdx = hmap.y.indexOf("Locação | AC");
  if (hmapIdx !== -1) {
    hmap.y.splice(hmapIdx, 1);
    if (hmap.z) hmap.z.splice(hmapIdx, 1);
  }
}

// 8. Fix Waterfall Locação (chart_15)
if (charts.chart_15 && charts.chart_15.data && charts.chart_15.data[0]) {
  let c15 = charts.chart_15.data[0];
  let acIdx15 = c15.x.indexOf("AC");
  if (acIdx15 !== -1) {
    let acVal = c15.y[acIdx15]; // should be 9383.35
    c15.x.splice(acIdx15, 1);
    c15.y.splice(acIdx15, 1);
    if (c15.measure) c15.measure.splice(acIdx15, 1);
    if (c15.text) c15.text.splice(acIdx15, 1);

    // Also update "Resultado 2026"
    let resIdx = c15.x.indexOf("Resultado 2026");
    if (resIdx !== -1) {
      c15.y[resIdx] -= acVal;
      if (c15.text) c15.text[resIdx] = formatCurrency(c15.y[resIdx]);
    }
  }
}

// Write back to file
const output = 'window.chartsData = ' + JSON.stringify(charts, null, 2) + ';';
fs.writeFileSync('../src/charts.js', output);
console.log('Done modifying charts.');
