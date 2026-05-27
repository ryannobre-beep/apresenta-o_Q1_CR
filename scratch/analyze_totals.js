const charts = require('./charts_temp.js');

console.log("chart_01:", charts.chart_01 && charts.chart_01.layout.title_old ? charts.chart_01.layout.title_old.text : "N/A");
console.log("chart_02:", charts.chart_02 && charts.chart_02.layout.title_old ? charts.chart_02.layout.title_old.text : "N/A");
console.log("chart_03:", charts.chart_03 && charts.chart_03.layout.title_old ? charts.chart_03.layout.title_old.text : "N/A");
console.log("chart_10:", charts.chart_10 && charts.chart_10.layout.title_old ? charts.chart_10.layout.title_old.text : "N/A");

if (charts.chart_03 && charts.chart_03.data[0]) {
  console.log("chart_03 y:", JSON.stringify(charts.chart_03.data[0].y));
}
if (charts.chart_10 && charts.chart_10.data[0]) {
  console.log("chart_10 y:", JSON.stringify(charts.chart_10.data[0].y));
}
