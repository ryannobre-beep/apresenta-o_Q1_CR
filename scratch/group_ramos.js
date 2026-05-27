const fs = require('fs');

const locacaoMap = {
  "IMOE": "Imobiliário",
  "IMOR": "Imobiliário",
  "CAP": "Garantias Locatícias",
  "FIAN": "Garantias Locatícias",
  "VG": "Elementares",
  "AUTO": "Elementares",
  "EMP": "Elementares",
  "RESI": "Elementares",
  "AC": "Acordos Comerciais"
};

const condMap = {
  "COND": "Condomínio",
  "CTDE": "Conteúdo",
  "CTDR": "Conteúdo",
  "E&O": "Vida Grupo (E&O)"
};

const colors = {
  "Imobiliário": "#2B0E4A",
  "Garantias Locatícias": "#E58E26",
  "Elementares": "#3ACF9A",
  "Acordos Comerciais": "#D64545",
  "Condomínio": "#2B0E4A",
  "Conteúdo": "#E58E26",
  "Vida Grupo (E&O)": "#3ACF9A"
};

function processCharts(filepath, mapping) {
  let jsContent = fs.readFileSync(filepath, 'utf8');
  jsContent = jsContent.replace('window.chartsData = ', '').trim();
  if (jsContent.endsWith(';')) jsContent = jsContent.slice(0, -1);
  
  let data = JSON.parse(jsContent);
  let changedCount = 0;

  for (let key in data) {
    let chart = data[key];
    let isProductChart = false;
    
    // Check if it's a Waterfall chart
    let isWaterfall = chart.data.some(t => t.type === 'waterfall');
    if (isWaterfall) {
      let t = chart.data[0];
      if (t.x && t.x.some(x => mapping[x])) {
        isProductChart = true;
        
        let newX = [];
        let newY = [];
        let newMeasure = [];
        let groupSums = {};

        // Find the start and end indices
        let startIndex = t.x.indexOf(t.x.find(x => x.startsWith('Base') || x.startsWith('Resultado') == false && !mapping[x]));
        let endIndex = t.x.indexOf(t.x.find(x => x.startsWith('Resultado')));
        
        // Sum the middle values
        for (let i = 0; i < t.x.length; i++) {
          let cat = t.x[i];
          if (mapping[cat]) {
            let group = mapping[cat];
            groupSums[group] = (groupSums[group] || 0) + t.y[i];
          }
        }
        
        // Rebuild Arrays
        for (let i = 0; i < t.x.length; i++) {
          let cat = t.x[i];
          if (!mapping[cat]) {
             newX.push(cat);
             newY.push(t.y[i]);
             newMeasure.push(t.measure[i]);
          } else {
             let group = mapping[cat];
             if (groupSums[group] !== undefined) {
               newX.push(group);
               newY.push(groupSums[group]);
               newMeasure.push("relative");
               delete groupSums[group]; // Only push once
             }
          }
        }
        
        // Format text as currency
        let newText = newY.map(val => {
           let absVal = Math.abs(val);
           return (val < 0 ? 'R$ -' : 'R$ ') + absVal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        });
        
        t.x = newX;
        t.y = newY;
        t.measure = newMeasure;
        t.text = newText;
        changedCount++;
      }
    } else {
      // Check for Bar charts with traces as products OR x-axis as products
      let isXAxisProducts = chart.data.some(t => t.type === 'bar' && t.x && t.x.some(x => mapping[x]));
      let isTraceProducts = chart.data.some(t => t.type === 'bar' && (mapping[t.name] || mapping[t.legendgroup]));

      if (isXAxisProducts) {
         isProductChart = true;
         for (let t of chart.data) {
           let newX = [];
           let newY = [];
           let newCustomData = [];
           let groupSums = {};
           let groupCustom = {};
           
           for (let i = 0; i < t.x.length; i++) {
             let cat = t.x[i];
             let group = mapping[cat] || (cat === 'Outros/Ajuste' || cat === 'AC' ? 'Acordos Comerciais' : cat);
             
             if (!groupSums[group]) {
               groupSums[group] = 0;
               groupCustom[group] = t.customdata ? [...t.customdata[i]] : [];
             }
             groupSums[group] += t.y[i];
           }
           
           for (let group in groupSums) {
             newX.push(group);
             newY.push(groupSums[group]);
             if (groupCustom[group].length > 0) {
                // Update money string
                let formatted = 'R$ ' + groupSums[group].toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                if (groupCustom[group][0] && groupCustom[group][0].toString().startsWith('R$')) {
                  groupCustom[group][0] = formatted;
                }
                newCustomData.push(groupCustom[group]);
             }
           }
           
           t.x = newX;
           t.y = newY;
           if (t.customdata) t.customdata = newCustomData;
         }
         changedCount++;
      } else if (isTraceProducts) {
         isProductChart = true;
         
         let groupedTraces = {};
         
         for (let t of chart.data) {
           let group = mapping[t.name] || mapping[t.legendgroup];
           if (group) {
             if (!groupedTraces[group]) {
               groupedTraces[group] = {
                 type: t.type,
                 name: group,
                 legendgroup: group,
                 offsetgroup: group,
                 x: JSON.parse(JSON.stringify(t.x)),
                 y: JSON.parse(JSON.stringify(t.y)),
                 marker: { color: colors[group] || t.marker.color },
                 orientation: t.orientation,
                 showlegend: t.showlegend,
                 hovertemplate: t.hovertemplate,
                 customdata: JSON.parse(JSON.stringify(t.customdata || []))
               };
               
               // Fix customdata group name
               for (let c of groupedTraces[group].customdata) {
                 if (c[0] === t.name) c[0] = group;
               }
             } else {
               // Sum the y values
               for (let i = 0; i < t.y.length; i++) {
                 groupedTraces[group].y[i] += t.y[i];
               }
             }
           } else {
             // Keep non-product traces as is (e.g. Total, Average)
             groupedTraces[t.name || Math.random()] = t;
           }
         }
         
         // Update customdata currency texts
         for (let key in groupedTraces) {
            let t = groupedTraces[key];
            if (mapping[key] || Object.values(mapping).includes(key)) {
                for (let i = 0; i < t.y.length; i++) {
                   if (t.customdata && t.customdata[i]) {
                     let formatted = 'R$ ' + t.y[i].toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                     // Assume customdata has value at index 1 or 2
                     if (t.customdata[i][1] && t.customdata[i][1].toString().startsWith('R$')) t.customdata[i][1] = formatted;
                     if (t.customdata[i][2] && t.customdata[i][2].toString().startsWith('R$')) t.customdata[i][2] = formatted;
                     if (t.customdata[i][0] && t.customdata[i][0].toString().startsWith('R$')) t.customdata[i][0] = formatted;
                   }
                }
            }
         }
         
         chart.data = Object.values(groupedTraces);
         changedCount++;
      }
    }
  }

  if (changedCount > 0) {
     const outStr = 'window.chartsData = ' + JSON.stringify(data, null, 2) + ';';
     fs.writeFileSync(filepath, outStr);
     console.log('Processed', filepath, '- updated', changedCount, 'charts');
  } else {
     console.log('Processed', filepath, '- no charts updated');
  }
}

processCharts('../src/charts_locacao.js', locacaoMap);
processCharts('../src/charts_condominio.js', condMap);
