const fs = require('fs');

const chartsPath = '../src/charts.js';
let content = fs.readFileSync(chartsPath, 'utf8');

const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf(';');
let data = JSON.parse(content.substring(jsonStart, jsonEnd));

// ==========================================
// FIX CHART 10 (Split 2025 and 2026)
// ==========================================
if (data['chart_10']) {
  const oldTraces = data['chart_10'].data;
  const newTraces = [];
  
  const colors = {
    2025: '#D1D5DB', // Light gray
    2026: '#2B0E4A'  // Dark purple
  };

  oldTraces.forEach((trace) => {
    // Trace 0 is Locação, Trace 1 is Condomínio
    const trace25 = JSON.parse(JSON.stringify(trace));
    const trace26 = JSON.parse(JSON.stringify(trace));
    
    // Clear out data
    trace25.x = []; trace25.y = []; trace25.customdata = [];
    trace26.x = []; trace26.y = []; trace26.customdata = [];
    
    trace25.name = "2025";
    trace25.offsetgroup = "2025";
    trace25.marker.color = colors[2025];
    delete trace25.marker.coloraxis; // Remove continuous color scale
    
    trace26.name = "2026";
    trace26.offsetgroup = "2026";
    trace26.marker.color = colors[2026];
    delete trace26.marker.coloraxis;
    
    trace.x.forEach((xVal, i) => {
      const year = trace.customdata[i][1];
      if (year === 2025 || year === "2025") {
        trace25.x.push(xVal);
        trace25.y.push(trace.y[i]);
        trace25.customdata.push(trace.customdata[i]);
      } else {
        trace26.x.push(xVal);
        trace26.y.push(trace.y[i]);
        trace26.customdata.push(trace.customdata[i]);
      }
    });
    
    trace25.showlegend = (trace.xaxis === 'x'); // Show legend only for the first subplot
    trace26.showlegend = (trace.xaxis === 'x');
    
    newTraces.push(trace25);
    newTraces.push(trace26);
  });
  
  data['chart_10'].data = newTraces;
  delete data['chart_10'].layout.coloraxis; // Remove color scale legend
}

// ==========================================
// FIX CHART 05 (Split Locação and Condomínio)
// ==========================================
if (data['chart_05']) {
  const locacaoGroups = {
    'Imobiliário': ['IMOE', 'IMOR'],
    'Garantias Locatícias': ['CAP', 'FIAN'],
    'Elementares': ['VG', 'AUTO', 'EMP', 'RESI']
  };
  
  const condGroups = {
    'Condomínio': ['COND'],
    'Conteúdo': ['CTDE', 'CTDR'],
    'Vida Grupo': ['E&O', 'VG'] // Include both E&O and VG if vertical is Condominio
  };
  
  const allMonths = ['Jan', 'Fev', 'Mar'];
  
  function buildGroupTraces(verticalName, groupsDict) {
    const groupData = {}; // groupName -> { Jan: 0, Fev: 0, Mar: 0 }
    Object.keys(groupsDict).forEach(g => {
      groupData[g] = { 'Jan': 0, 'Fev': 0, 'Mar': 0 };
    });
    
    // Fallback group for anything else
    groupData['Outros'] = { 'Jan': 0, 'Fev': 0, 'Mar': 0 };
    
    data['chart_05'].data.forEach(trace => {
      if (!trace.customdata || !trace.customdata[0]) return;
      const vertical = trace.customdata[0][1];
      if (vertical !== verticalName) return;
      
      const productName = trace.name;
      let matchedGroup = 'Outros';
      
      Object.keys(groupsDict).forEach(g => {
        if (groupsDict[g].includes(productName)) {
          matchedGroup = g;
        }
      });
      
      if (matchedGroup === 'Outros' && verticalName === 'Locação') {
         matchedGroup = 'Elementares'; // Put remaining into elementares
      }
      
      if (!groupData[matchedGroup]) groupData[matchedGroup] = { 'Jan': 0, 'Fev': 0, 'Mar': 0 };
      
      trace.x.forEach((m, i) => {
        groupData[matchedGroup][m] += trace.y[i];
      });
    });
    
    const colors = ['#2B0E4A', '#6B4FB3', '#E58E26', '#F2C94C', '#D1D5DB'];
    const traces = [];
    let colorIdx = 0;
    
    Object.keys(groupData).forEach(g => {
      const vals = allMonths.map(m => groupData[g][m]);
      if (vals.reduce((a,b)=>a+b, 0) === 0) return; // Skip empty groups
      
      const customdata = allMonths.map(m => {
         const val = groupData[g][m];
         return [g, verticalName, "R$ " + val.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})];
      });
      
      traces.push({
        name: g,
        type: 'bar',
        x: allMonths,
        y: vals,
        customdata: customdata,
        hovertemplate: "<b>%{customdata[1]}</b><br>Mês: %{x}<br>Grupo: %{customdata[0]}<br>Valor: %{customdata[2]}<extra></extra>",
        marker: { color: colors[colorIdx % colors.length] },
        text: vals.map(v => v > 0 ? "R$ " + Math.round(v/1000) + "k" : ""),
        textposition: "auto"
      });
      colorIdx++;
    });
    
    return traces;
  }
  
  const layoutBase = JSON.parse(JSON.stringify(data['chart_05'].layout));
  layoutBase.barmode = 'stack'; // Keep it stacked, or grouped? The original was grouped (or stacked? Let's use group so they can see side by side)
  layoutBase.barmode = 'stack'; 
  
  data['chart_05_locacao'] = {
    data: buildGroupTraces('Locação', locacaoGroups),
    layout: layoutBase
  };
  
  const layoutCond = JSON.parse(JSON.stringify(layoutBase));
  // Keep colors consistent for Condominio (e.g. start with orange)
  data['chart_05_condominio'] = {
    data: buildGroupTraces('Condomínio', condGroups),
    layout: layoutCond
  };
  data['chart_05_condominio'].data.forEach((t, i) => {
     const condColors = ['#E58E26', '#6B4FB3', '#2B0E4A'];
     t.marker.color = condColors[i % condColors.length];
  });
}

const newContent = "window.chartsData = " + JSON.stringify(data, null, 2) + ";\n";
fs.writeFileSync(chartsPath, newContent);
console.log('Rebuilt charts.js');
