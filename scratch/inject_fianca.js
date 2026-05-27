const fs = require('fs');

const locacaoPath = '../locacao.html';
const chartPath = '../Gráficos Locação/evolucao_premio_combo_barras_linha.html';

let locacaoHtml = fs.readFileSync(locacaoPath, 'utf8');
const chartHtml = fs.readFileSync(chartPath, 'utf8');

// Extract the Plotly.newPlot arguments
const match = chartHtml.match(/Plotly\.newPlot\(\s*".*?",\s*(\[\{.*?\}\]),\s*(\{.*?\}),\s*(\{.*?\})\s*\)/s);

if (!match) {
    console.error("Could not find Plotly data in chart HTML");
    process.exit(1);
}

const dataStr = match[1];
const layoutStr = match[2];
const configStr = match[3];

const newSlide = `
<section class="slide" id="slide-producao-fianca">
  <div class="slide-content" style="display: flex; flex-direction: column; height: 100%;">
    <header class="slide-header">
      <span class="slide-subtitle">Desempenho da Vertical</span>
      <h2 class="slide-title">Produção do Fiança</h2>
    </header>

    <div class="split-layout reversed" style="flex: 1; margin-top: 10px;">
      
      <!-- Lado Esquerdo: Mensagem e Texto de Apoio -->
      <div class="commentary-side" style="display: flex; flex-direction: column; gap: 20px;">
        <!-- Mensagem do Slide -->
        <div class="message-card" style="background: var(--bg-white); border-left: 4px solid var(--accent-orange); border-radius: 8px; box-shadow: var(--card-shadow); padding: 20px;">
          <p class="message-text" style="font-size: 1.1rem; color: var(--text-dark); line-height: 1.5; margin: 0;">
            <strong>A vertical Fiança apresentou retração gradual ao longo do trimestre, com destaque para a redução da participação da Pottencial no resultado consolidado.</strong> O movimento reforça a necessidade de atenção sobre mix, conversão e competitividade da seguradora dentro da carteira.
          </p>
        </div>

        <!-- Texto de Apoio -->
        <div class="narrative-card" style="background: var(--bg-light); border-radius: 8px; padding: 20px;">
          <p class="narrative-text" style="font-size: 0.95rem; color: var(--text-medium); line-height: 1.6; margin: 0;">
            Ao longo do Q1, o resultado de Fiança mostrou perda de ritmo mês a mês, encerrando março abaixo do volume observado no início do trimestre. <em>A principal pressão vem da <strong>Pottencial</strong>, que apresenta redução contínua de performance no período e impacta diretamente o consolidado da vertical. O comportamento indica necessidade de aprofundar a análise sobre conversão comercial, competitividade da oferta e distribuição entre seguradoras para retomada de crescimento no próximo ciclo.</em>
          </p>
        </div>
      </div>

      <!-- Lado Direito: Gráfico -->
      <div class="chart-side" style="background: var(--bg-white); border-radius: var(--border-radius-md); box-shadow: var(--card-shadow); padding: 20px; display: flex; flex-direction: column;">
        <div id="plotly-fianca-chart" style="flex: 1; width: 100%;"></div>
      </div>
      
    </div>
  </div>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
        // Only render when visible to avoid sizing issues
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const data = ${dataStr};
                    const layout = ${layoutStr};
                    
                    // Override layout for responsive fit
                    layout.width = undefined;
                    layout.height = undefined;
                    layout.margin = { t: 50, b: 60, l: 60, r: 20 };
                    layout.legend = { orientation: "h", y: -0.2, x: 0.5, xanchor: "center" };
                    layout.title = { text: "Evolução do Prêmio Emitido | Porto x Pottencial", font: { size: 18, color: "var(--brand-purple-dark)" } };

                    Plotly.newPlot("plotly-fianca-chart", data, layout, { responsive: true, displayModeBar: false });
                    observer.disconnect();
                }
            });
        });
        observer.observe(document.getElementById("plotly-fianca-chart"));
    });
  </script>
</section>
`;

const startIndex = locacaoHtml.indexOf('<section class="slide" id="slide-producao-fianca">');
const endIndex = locacaoHtml.indexOf('</section>', startIndex) + '</section>'.length;

if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find slide-producao-fianca");
    process.exit(1);
}

const newHtml = locacaoHtml.substring(0, startIndex) + newSlide + locacaoHtml.substring(endIndex);

fs.writeFileSync(locacaoPath, newHtml, 'utf8');
console.log("Successfully injected Fianca slide!");
