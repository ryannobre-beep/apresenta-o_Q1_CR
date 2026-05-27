const fs = require('fs');
let content = fs.readFileSync('src/charts.js', 'utf-8');
content = content.replace('window.chartsData = ', 'module.exports = ');
fs.writeFileSync('scratch/charts_temp.js', content);

const charts = require('./charts_temp.js');
for (let key in charts) {
  let chart = charts[key];
  let found = false;
  
  if (chart.layout && chart.layout.title_old) {
     console.log(`\n--- ${key} : ${chart.layout.title_old.text} ---`);
  } else {
     console.log(`\n--- ${key} ---`);
  }

  chart.data.forEach((trace, idx) => {
    if (trace.name && trace.name.includes('AC')) {
      console.log(`Found in trace[${idx}].name = ${trace.name}`);
      found = true;
    }
    if (trace.customdata) {
       trace.customdata.forEach((cd, cidx) => {
         if (Array.isArray(cd) && cd.includes('AC')) {
           console.log(`Found in trace[${idx}].customdata[${cidx}] = ${JSON.stringify(cd)}`);
           found = true;
         }
       });
    }
    if (trace.y && Array.isArray(trace.y)) {
       trace.y.forEach((yval, yidx) => {
         if (typeof yval === 'string' && yval.includes('AC')) {
           console.log(`Found in trace[${idx}].y[${yidx}] = ${yval}`);
           found = true;
         }
       });
    }
    if (trace.x && Array.isArray(trace.x)) {
       trace.x.forEach((xval, xidx) => {
         if (typeof xval === 'string' && xval.includes('AC')) {
           console.log(`Found in trace[${idx}].x[${xidx}] = ${xval}`);
           found = true;
         }
       });
    }
  });
  if (!found) console.log("Not found in this chart.");
}
