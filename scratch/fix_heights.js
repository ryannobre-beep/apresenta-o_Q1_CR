const fs = require('fs');

const htmlPath = '../diretorias.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Update Slide 10 (Slide 11 visually)
const slide10Regex = /<div class="split-layout">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/;
const slide10Match = html.match(slide10Regex);

if (slide10Match) {
  const newInner10 = `
          <div class="split-layout" style="height: 100%; margin-top: 0;">
            <div class="chart-side" style="width: 100%; display: flex; flex-direction: column; gap: 10px; height: 100%;">
              <h3 style="text-align: center; color: var(--brand-purple-dark); font-size: 18px;">Vertical Locação</h3>
              <div class="plotly-iframe-container" style="flex: 1; height: auto;">
                <div id="plotly-chart-10_locacao" class="plotly-chart-container"></div>
              </div>
            </div>
            <div class="chart-side" style="width: 100%; display: flex; flex-direction: column; gap: 10px; height: 100%;">
              <h3 style="text-align: center; color: var(--accent-orange); font-size: 18px;">Vertical Condomínio</h3>
              <div class="plotly-iframe-container" style="flex: 1; height: auto;">
                <div id="plotly-chart-10_condominio" class="plotly-chart-container"></div>
              </div>
            </div>
          </div>
        </div>
    </section>`;
  html = html.replace(slide10Regex, newInner10);
}

// Update Slide 17 (Slide 13 visually)
const slide17Regex = /<div class="split-layout">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>\s*<!-- SLIDE ACORDOS COMERCIAIS -->/;
const slide17Match = html.match(slide17Regex);

if (slide17Match) {
  const newInner17 = `
          <div class="split-layout" style="height: 100%; margin-top: 0;">
            <div class="chart-side" style="width: 100%; display: flex; flex-direction: column; gap: 10px; height: 100%;">
              <h3 style="text-align: center; color: var(--brand-purple-dark); font-size: 18px;">Vertical Locação</h3>
              <div class="plotly-iframe-container" style="flex: 1; height: auto;">
                <div id="plotly-chart-05_locacao" class="plotly-chart-container"></div>
              </div>
            </div>
            <div class="chart-side" style="width: 100%; display: flex; flex-direction: column; gap: 10px; height: 100%;">
              <h3 style="text-align: center; color: var(--accent-orange); font-size: 18px;">Vertical Condomínio</h3>
              <div class="plotly-iframe-container" style="flex: 1; height: auto;">
                <div id="plotly-chart-05_condominio" class="plotly-chart-container"></div>
              </div>
            </div>
          </div>
        </div>
    </section>

    <!-- SLIDE ACORDOS COMERCIAIS -->`;
  html = html.replace(slide17Regex, newInner17);
}

// Ensure the parent full-screen-layout also flexes correctly
html = html.replace(/<div class="full-screen-layout">/g, '<div class="full-screen-layout" style="height: calc(100% - 90px); flex: 1;">');

fs.writeFileSync(htmlPath, html);
console.log('Fixed HTML heights');
