const fs = require('fs');

const htmlPath = '../diretorias.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const slidePlataformaRegex = /<section class="slide" id="slide-plataforma">[\s\S]*?<\/section>/;
const match = html.match(slidePlataformaRegex);

if (match) {
  let slideHtml = match[0];

  // 1. Update the Ticks from 8 to 7
  const oldTicks = `
              <div class="gantt-tick">1</div>
              <div class="gantt-tick">2</div>
              <div class="gantt-tick">3</div>
              <div class="gantt-tick">4</div>
              <div class="gantt-tick">5</div>
              <div class="gantt-tick">6</div>
              <div class="gantt-tick">7</div>
              <div class="gantt-tick">8</div>`;
  const newTicks = `
              <div class="gantt-tick">1</div>
              <div class="gantt-tick">2</div>
              <div class="gantt-tick">3</div>
              <div class="gantt-tick">4</div>
              <div class="gantt-tick">5</div>
              <div class="gantt-tick">6</div>
              <div class="gantt-tick">7</div>`;
  slideHtml = slideHtml.replace(oldTicks, newTicks);

  // 2. Change Rollout em 8 Etapas to 7 Etapas
  slideHtml = slideHtml.replace('<span>Rollout em 8 Etapas</span>', '<span>Rollout em 7 Etapas</span>');

  // 3. Remove 8 Grid lines and make it 7
  const oldGrid = `<div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div>
                <div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div>`;
  const newGrid = `<div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div>
                <div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div>`;
  // There are two of these (one for Fiança, one for Incêndio)
  slideHtml = slideHtml.replace(oldGrid, newGrid).replace(oldGrid, newGrid);

  // 4. Update the bars. 
  // We will completely replace the "gantt-bars-container" content for Fiança Locatícia
  const fiancaRegex = /<div class="gantt-bars-container" style="width: 80%;">[\s\S]*?<!-- LINHA 2: INCÊNDIO -->/;
  
  const newFiancaHtml = `<div class="gantt-bars-container" style="width: 80%;">
                <!-- 7 Grid lines -->
                <div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div>
                <div class="gantt-grid-line"></div><div class="gantt-grid-line"></div><div class="gantt-grid-line"></div>
                
                <!-- Bar 1 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-purple-dark" style="left: 0%; width: 14.1%;">
                  Sinistros
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>1. Abertura de Sinistros</h4>
                    <p><strong>Status:</strong> <span style="color:var(--brand-green); font-weight:bold;">Feito</span></p>
                    <p>Todo sinistro agora pode ser tratado pela plataforma da Lado Bom, trazendo rastreabilidade e histórico.</p>
                  </div>
                </div>

                <!-- Bar 2 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-purple" style="left: 14.28%; width: 14.1%;">
                  Análises
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>2. Análises e Contratação</h4>
                    <p><strong>Status:</strong> <span style="color:var(--brand-green); font-weight:bold;">Feito</span></p>
                    <p>Análises e contratações de fiança habilitadas na plataforma, concentrando em um só lugar, permitindo analisar indicadores e acompanhar as cotações.</p>
                  </div>
                </div>

                <!-- Bar 3 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-orange" style="left: 28.56%; width: 14.1%;">
                  Taxa-Setup
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>3. Taxa-Setup</h4>
                    <p><strong>Status:</strong> <span style="color:var(--accent-orange); font-weight:bold;">Em Andamento</span></p>
                    <p>Corretor da ponta pode cobrar uma taxa de setup que varia de R$ 100 a R$ 250 e o valor fica integralmente para o corretor.</p>
                  </div>
                </div>

                <!-- Bar 4 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-gray" style="left: 42.84%; width: 14.1%; color: var(--brand-purple-dark);">
                  Faturas
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>4. Faturas</h4>
                    <p><strong>Status:</strong> <span style="color:var(--brand-purple); font-weight:bold;">Planejado</span></p>
                    <p>Gestão centralizada e automatização do controle de faturas dentro da plataforma.</p>
                  </div>
                </div>

                <!-- Bar 5 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-gray" style="left: 57.12%; width: 14.1%; color: var(--brand-purple-dark);">
                  Base Atual
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>5. Importação da Base Atual</h4>
                    <p><strong>Status:</strong> <span style="color:var(--brand-purple); font-weight:bold;">Planejado</span></p>
                    <p>Migração das apólices ativas e histórico de sinistros para a nova plataforma, integrando as bases legadas para centralizar a gestão e permitir auditorias.</p>
                  </div>
                </div>

                <!-- Bar 6 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-purple-dark" style="left: 71.4%; width: 14.1%;">
                  Renovação
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>6. Renovação Manual/Indiv.</h4>
                    <p><strong>Status:</strong> <span style="color:var(--text-medium); font-weight:bold;">Aberto</span></p>
                    <p>Mapeando o processo e integrando as equipes para viabilizar que a renovação seja mais fluida e automatizada por meio da plataforma.</p>
                  </div>
                </div>

                <!-- Bar 7 -->
                <div onclick="toggleGanttTooltip(this, event)" class="gantt-bar bg-purple-dark" style="left: 85.68%; width: 14.1%;">
                  Cancelam.
                  <div class="gantt-tooltip" onclick="event.stopPropagation()">
                    <div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>
                    <h4>7. Cancelamento Manual/Indiv.</h4>
                    <p><strong>Status:</strong> <span style="color:var(--text-medium); font-weight:bold;">Aberto</span></p>
                    <p>Mapeando o processo e integrando as equipes para viabilizar que o cancelamento seja mais fluido e automatizado por meio da plataforma.</p>
                  </div>
                </div>

              </div>
            </div>

            <!-- LINHA 2: INCÊNDIO -->`;

  slideHtml = slideHtml.replace(fiancaRegex, newFiancaHtml);

  // Update Incêndio bars width since ticks changed from 8 to 7
  // Bar 1 (Cotação Manual) should occupy tick 1-3. Total width = 3/7 = 42.85%
  // Bar 2 (Cotação Aut) should occupy tick 4-5. Width = 2/7 = 28.57%
  // Bar 3 (Integração Massa) should occupy tick 6-7. Width = 2/7 = 28.57%

  slideHtml = slideHtml.replace(/style="left: 0%; width: 37\.3%;"/, 'style="left: 0%; width: 42.6%;"');
  slideHtml = slideHtml.replace(/style="left: 37\.5%; width: 24\.8%;"/, 'style="left: 42.84%; width: 28.4%;"');
  slideHtml = slideHtml.replace(/style="left: 62\.5%; width: 37\.3%; color: var\(--brand-purple-dark\);"/, 'style="left: 71.4%; width: 28.4%; color: var(--brand-purple-dark);"');

  html = html.replace(match[0], slideHtml);
} else {
  console.log('Slide Plataforma not found!');
}

// Bump cache
html = html.replace(/src="src\/charts\.js\?v=8\.4"/, 'src="src/charts.js?v=8.5"');
html = html.replace(/src="src\/app\.js\?v=8\.4"/, 'src="src/app.js?v=8.5"');

fs.writeFileSync(htmlPath, html);
console.log('Updated Plataforma Fiança Content');
