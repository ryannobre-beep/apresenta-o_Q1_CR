const fs = require('fs');

const appPath = '../src/app.js';
let content = fs.readFileSync(appPath, 'utf8');

const replacement = `
    // Native local Plotly chart rendering on active slide (No iframes, 100% CORS-immune)
    const activeSlideEl = slides[currentSlide];
    const chartDivs = activeSlideEl.querySelectorAll('.plotly-chart-container');
    
    if (chartDivs.length > 0) {
      setTimeout(() => {
        chartDivs.forEach(chartDiv => {
          const chartId = chartDiv.getAttribute('id');
          // Support multiple charts (e.g., plotly-chart-05-locacao -> chart_05_locacao)
          const chartKey = chartId.replace('plotly-chart-', 'chart_');
          
          if (window.Plotly && window.chartsData && window.chartsData[chartKey]) {
            const chartData = window.chartsData[chartKey];
            const layout = chartData.layout;
            
            // Enforce 100% transparent and responsively fluid layout
            layout.autosize = true;
            layout.paper_bgcolor = "rgba(0,0,0,0)";
            layout.plot_bgcolor = "rgba(0,0,0,0)";
            
            // Clean titles inside Plotly (since they are in slide headers already)
            layout.title = { text: "" };
            if (layout.title_old) {
              delete layout.title_old;
            }
            
            // Strip hardcoded dimensions
            if (layout.width) delete layout.width;
            if (layout.height) delete layout.height;
            
            // Prevent legend overlaps by fixing margin and legend positioning
            layout.margin = { t: 40, b: 60, l: 65, r: 20 };
            
            if (layout.legend) {
               layout.legend.orientation = 'h';
               layout.legend.y = -0.15;
               layout.legend.yanchor = 'top';
               layout.legend.x = 0.5;
               layout.legend.xanchor = 'center';
            }
            if (!chartDiv.classList.contains('rendered')) {
              // Render from scratch
              Plotly.newPlot(chartId, chartData.data, layout, {
                responsive: true,
                displayModeBar: false
              }).then(() => {
                chartDiv.classList.add('rendered');
              });
            } else {
              // Already rendered, react with layout update and resize to fit container
              Plotly.react(chartId, chartData.data, layout, {
                responsive: true,
                displayModeBar: false
              });
              Plotly.Plots.resize(chartDiv);
            }
          }
        });
      }, 350);
    }
  }
`;

// Replace lines from 85 to 97 (inclusive, up to the end of updateNavigation)
const lines = content.split('\n');
const startIdx = lines.findIndex(l => l.includes('Native local Plotly chart rendering'));
const endIdx = lines.findIndex((l, i) => i > startIdx && l === '  }'); // The closing bracket of updateNavigation

if (startIdx !== -1 && endIdx !== -1) {
  lines.splice(startIdx, endIdx - startIdx + 1, replacement.trim() + '\n  }');
  fs.writeFileSync(appPath, lines.join('\n'));
  console.log('Fixed app.js');
} else {
  console.log('Could not find boundaries');
}
