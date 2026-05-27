const fs = require('fs');

const htmlPath = '../diretorias.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const newSlideHtml = `
    <!-- SLIDE: PROJETO PLATAFORMA -->
    <section class="slide" id="slide-plataforma">
      <div class="slide-content" style="display: flex; flex-direction: column; height: 100%;">
        <header class="slide-header" style="position: relative;">
          <span class="slide-subtitle">Implantação Tecnológica</span>
          <h2 class="slide-title">Roadmap: Plataforma</h2>
          
          <!-- WIP Badge -->
          <div style="position: absolute; top: 0; right: 0; background: var(--accent-orange); color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; font-weight: bold; display: flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Slide em Construção
          </div>
        </header>

        <div class="gantt-container" style="flex: 1; margin-top: 10px;">
          <div class="gantt-header">
            <div class="gantt-header-label" style="width: 20%;">Frente / Produto</div>
            <div class="gantt-timeline-ticks" style="width: 80%;">
              <div class="gantt-tick">1</div>
              <div class="gantt-tick">2</div>
              <div class="gantt-tick">3</div>
              <div class="gantt-tick">4</div>
              <div class="gantt-tick">5</div>
              <div class="gantt-tick">6</div>
              <div class="gantt-tick">7</div>
              <div class="gantt-tick">8</div>
            </div>
          </div>
          <div class="gantt-body">
            
            <!-- LINHA 1: FIANÇA -->
            <div class="gantt-row">
              <div class="gantt-row-label" style="width: 20%;">
                Fiança Locatícia
                <span>Rollout em 8 Etapas</span>
              </div>
              <div class="gantt-bars-container" style="width: 80%;">
                <!-- 8 Grid lines -->
                <div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div>
                <div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div>
                
                <!-- Bar 1 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-purple-dark" style="left: 0%; width: 12.3%;">
                  Sinistros
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>1. Abertura de Sinistros</h4>
                    <p><strong>Status:</strong> A definir</p>
                    <p>Detalhes do processo de abertura de sinistros na plataforma.</p>
                  </div>
                </div>

                <!-- Bar 2 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-purple" style="left: 12.5%; width: 12.3%;">
                  Análises
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>2. Análises e Contratações</h4>
                    <p><strong>Status:</strong> A definir</p>
                    <p>Detalhes sobre este passo.</p>
                  </div>
                </div>

                <!-- Bar 3 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-gray" style="left: 25%; width: 12.3%; color: var(--brand-purple-dark);">
                  Setup
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>3. Taxa-Setup</h4>
                    <p><strong>Status:</strong> A definir</p>
                    <p>Detalhes sobre este passo.</p>
                  </div>
                </div>

                <!-- Bar 4 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-orange" style="left: 37.5%; width: 12.3%;">
                  Faturas
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>4. Faturas</h4>
                    <p><strong>Status:</strong> A definir</p>
                    <p>Detalhes sobre este passo.</p>
                  </div>
                </div>

                <!-- Bar 5 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-purple-dark" style="left: 50%; width: 12.3%;">
                  Base Atual
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>5. Importação da base atual</h4>
                    <p><strong>Status:</strong> A definir</p>
                    <p>Detalhes sobre este passo.</p>
                  </div>
                </div>

                <!-- Bar 6 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-purple" style="left: 62.5%; width: 12.3%;">
                  Renov Indiv.
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>6. Renovação Individual/Manual</h4>
                    <p><strong>Status:</strong> A definir</p>
                    <p>Detalhes sobre este passo.</p>
                  </div>
                </div>

                <!-- Bar 7 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-gray" style="left: 75%; width: 12.3%; color: var(--brand-purple-dark);">
                  Canc. Indiv.
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>7. Cancelamento Individual/Manual</h4>
                    <p><strong>Status:</strong> A definir</p>
                    <p>Detalhes sobre este passo.</p>
                  </div>
                </div>

                <!-- Bar 8 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-orange" style="left: 87.5%; width: 12.3%;">
                  Massa
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>8. Integração (Massa)</h4>
                    <p><strong>Status:</strong> A definir</p>
                    <p>Integração das bases para renovação e cancelamento em massa.</p>
                  </div>
                </div>

              </div>
            </div>

            <!-- LINHA 2: INCÊNDIO -->
            <div class="gantt-row">
              <div class="gantt-row-label" style="width: 20%;">
                Seguro Incêndio
                <span>Rollout em 3 Etapas</span>
              </div>
              <div class="gantt-bars-container" style="width: 80%;">
                <!-- 8 Grid lines -->
                <div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div>
                <div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div>
                
                <!-- Bar 1 (occupies tick 1-3) -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-purple-dark" style="left: 0%; width: 37.3%;">
                  Cotação Manual
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>1. Cotação Manual</h4>
                    <p><strong>Status:</strong> A definir</p>
                    <p>Detalhes sobre cotação manual.</p>
                  </div>
                </div>

                <!-- Bar 2 (occupies tick 4-5) -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-orange" style="left: 37.5%; width: 24.8%;">
                  Cotação Aut.
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>2. Cotação Automatizada</h4>
                    <p><strong>Status:</strong> A definir</p>
                    <p>Detalhes sobre cotação automatizada.</p>
                  </div>
                </div>
                
                <!-- Bar 3 (occupies tick 6-8) -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-gray" style="left: 62.5%; width: 37.3%; color: var(--brand-purple-dark);">
                  Integração Massa
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>3. Integração das bases</h4>
                    <p><strong>Status:</strong> A definir</p>
                    <p>Integração das bases para contratação, renovação e cancelamento em massa.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
`;

const slide24Regex = /<section class="slide cover-theme" id="slide-24">/;
if (html.match(slide24Regex)) {
  html = html.replace(slide24Regex, newSlideHtml + '\n\n    <!-- SLIDE 24: OBRIGADO -->\n    <section class="slide cover-theme" id="slide-24">');
} else {
  console.log("Could not find slide-24!");
}

// Add to Sidebar
// Find the last item which is <li class="drawer-menu-item" data-slide="roadmap"><span class="drawer-item-num">18</span> Roadmap de Governança</li>
const oldNav = '<li class="drawer-menu-item" data-slide="roadmap"><span class="drawer-item-num">18</span> Roadmap de Governança</li>';
const newNav = oldNav + '\n        <li class="drawer-menu-item" data-slide="plataforma"><span class="drawer-item-num">19</span> Plataforma (WIP)</li>';
if (html.includes(oldNav)) {
  html = html.replace(oldNav, newNav);
}

// Bump cache
html = html.replace(/src="src\/charts\.js\?v=8\.2"/, 'src="src/charts.js?v=8.3"');
html = html.replace(/src="src\/app\.js\?v=8\.2"/, 'src="src/app.js?v=8.3"');

fs.writeFileSync(htmlPath, html);
console.log('Added Slide Plataforma');
