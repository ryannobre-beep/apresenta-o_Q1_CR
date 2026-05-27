const fs = require('fs');

const cssPath = '../src/styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

const ganttCss = `

/* ==========================================================================
   GANTT CHART CUSTOM STYLES
   ========================================================================== */
.gantt-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  border: 1px solid rgba(80, 40, 150, 0.05);
  overflow: hidden;
}

.gantt-header {
  display: flex;
  background: rgba(80, 40, 150, 0.03);
  border-bottom: 1px solid rgba(80, 40, 150, 0.1);
  padding: 15px 0;
  font-weight: 600;
  color: var(--brand-purple-dark);
}

.gantt-header-label {
  width: 25%;
  padding-left: 20px;
  font-size: 14px;
}

.gantt-timeline-ticks {
  width: 75%;
  display: flex;
}

.gantt-tick {
  flex: 1;
  text-align: center;
  font-size: 13px;
  border-left: 1px dashed rgba(80, 40, 150, 0.1);
}

.gantt-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  gap: 15px;
  overflow-y: auto;
}

.gantt-row {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0,0,0,0.02);
}

.gantt-row-label {
  width: 25%;
  padding-left: 20px;
  padding-right: 15px;
  font-weight: 600;
  color: var(--text-dark);
  font-size: 14px;
}

.gantt-row-label span {
  display: block;
  font-size: 12px;
  font-weight: 400;
  color: var(--text-medium);
  margin-top: 4px;
}

.gantt-bars-container {
  width: 75%;
  position: relative;
  height: 40px;
  display: flex;
}

/* Background grid lines for bars */
.gantt-grid-line {
  flex: 1;
  border-left: 1px dashed rgba(0,0,0,0.05);
  height: 100%;
}

.gantt-bar {
  position: absolute;
  top: 4px;
  bottom: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
}

.gantt-bar:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  filter: brightness(1.1);
}

/* Tooltip */
.gantt-bar .gantt-tooltip {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: var(--text-dark);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  width: 250px;
  z-index: 100;
  transition: opacity 0.2s ease;
  text-align: left;
  border: 1px solid rgba(80, 40, 150, 0.1);
  pointer-events: none;
}

.gantt-bar:hover .gantt-tooltip {
  visibility: visible;
  opacity: 1;
}

.gantt-tooltip h4 {
  color: var(--brand-purple-dark);
  font-size: 13px;
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  white-space: normal;
}

.gantt-tooltip p {
  font-size: 12px;
  color: var(--text-medium);
  margin-bottom: 5px;
  line-height: 1.4;
  white-space: normal;
  font-weight: 400;
}

.gantt-tooltip p strong {
  color: var(--text-dark);
  font-weight: 600;
}

/* Specific colors */
.bg-purple { background: var(--brand-purple); }
.bg-orange { background: var(--accent-orange); }
.bg-purple-dark { background: var(--brand-purple-dark); }
.bg-gray { background: var(--text-light); }
`;

if (!css.includes('.gantt-container')) {
  fs.writeFileSync(cssPath, css + '\n' + ganttCss);
}

// Now process the HTML
const htmlPath = '../diretorias.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const slidesHtml = `
    <!-- SLIDE: PRINCÍPIOS E GOVERNANÇA -->
    <section class="slide" id="slide-principios">
      <div class="slide-content">
        <header class="slide-header">
          <span class="slide-subtitle">Governança e Evolução Operacional</span>
          <h2 class="slide-title">Princípios da Abordagem</h2>
        </header>

        <div class="message-card" style="margin-bottom: 30px; border-left-color: var(--accent-orange);">
          <p class="message-text">A resposta combina transparência, correção estrutural e governança conjunta. O objetivo é evoluir o modelo operacional da parceria para uma operação mais segura e sustentável.</p>
        </div>

        <div class="projects-grid" style="grid-template-columns: repeat(2, 1fr); gap: 20px;">
          <div class="project-card">
            <div class="project-header">
              <h3 class="project-title" style="color: var(--brand-purple); font-size: 20px;">1. Transparência</h3>
            </div>
            <p style="color: var(--text-medium); line-height: 1.5; padding: 0 20px 20px;">Dar visibilidade aos casos identificados, ao status das tratativas e aos próximos passos da operação conjunta.</p>
          </div>

          <div class="project-card">
            <div class="project-header">
              <h3 class="project-title" style="color: var(--brand-purple); font-size: 20px;">2. Tratamento Individualizado</h3>
            </div>
            <p style="color: var(--text-medium); line-height: 1.5; padding: 0 20px 20px;">Atuar caso a caso, com avaliação objetiva dos impactos e das medidas de regularização apropriadas.</p>
          </div>

          <div class="project-card">
            <div class="project-header">
              <h3 class="project-title" style="color: var(--brand-purple); font-size: 20px;">3. Correção Estrutural</h3>
            </div>
            <p style="color: var(--text-medium); line-height: 1.5; padding: 0 20px 20px;">Ajustar fluxos de renovação, transmissão, faturas e inadimplência para transformar riscos pontuais em controles permanentes.</p>
          </div>

          <div class="project-card">
            <div class="project-header">
              <h3 class="project-title" style="color: var(--brand-purple); font-size: 20px;">4. Governança Conjunta</h3>
            </div>
            <p style="color: var(--text-medium); line-height: 1.5; padding: 0 20px 20px;">Integrar bases de dados, responsáveis, rotinas e evidências para criar um acompanhamento contínuo e auditável.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE: PLANO DE AÇÃO (AÇÕES ESTRUTURAIS) -->
    <section class="slide" id="slide-estrategia">
      <div class="slide-content">
        <header class="slide-header">
          <span class="slide-subtitle">Plano de Ação Estruturado</span>
          <h2 class="slide-title">Estratégia de Regularização e Controle</h2>
        </header>

        <div class="projects-grid" style="grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 40px;">
          
          <div class="project-card" style="border-top: 5px solid var(--accent-orange);">
            <div class="project-header" style="justify-content: center; text-align: center; display: block; border-bottom: none; padding-bottom: 0;">
              <h3 class="project-title" style="color: var(--brand-purple-dark); font-size: 22px; text-align: center;">Cessão de Dívida</h3>
            </div>
            <div style="padding: 20px; text-align: center;">
              <p style="color: var(--text-medium); line-height: 1.6; margin-bottom: 15px;">Mecanismo de salvaguarda excepcional para mitigação de impacto material em casos pontuais.</p>
              <div style="background: rgba(229, 142, 38, 0.1); padding: 10px; border-radius: 8px; font-size: 13px; color: var(--text-dark);">
                Pagamento direto à imobiliária com posterior cobrança do inquilino pela corretora.
              </div>
            </div>
          </div>

          <div class="project-card" style="border-top: 5px solid var(--brand-purple);">
            <div class="project-header" style="justify-content: center; text-align: center; display: block; border-bottom: none; padding-bottom: 0;">
              <h3 class="project-title" style="color: var(--brand-purple-dark); font-size: 22px; text-align: center;">Renovação Compulsória</h3>
            </div>
            <div style="padding: 20px; text-align: center;">
              <p style="color: var(--text-medium); line-height: 1.6; margin-bottom: 15px;">Novo fluxo operacional pós-sinistro focado em reduzir risco por silêncio operacional.</p>
              <div style="background: rgba(107, 79, 179, 0.1); padding: 10px; border-radius: 8px; font-size: 13px; color: var(--text-dark);">
                Na ausência de retorno da tratativa em <strong>5 dias</strong>, prevalece a continuidade da cobertura.
              </div>
            </div>
          </div>

          <div class="project-card" style="border-top: 5px solid var(--brand-purple-dark);">
            <div class="project-header" style="justify-content: center; text-align: center; display: block; border-bottom: none; padding-bottom: 0;">
              <h3 class="project-title" style="color: var(--brand-purple-dark); font-size: 22px; text-align: center;">Supervisão Integrada</h3>
            </div>
            <div style="padding: 20px; text-align: center;">
              <p style="color: var(--text-medium); line-height: 1.6; margin-bottom: 15px;">Rotina de faturas e boletos realocada para maior proximidade da área de contratação.</p>
              <div style="background: rgba(43, 14, 74, 0.1); padding: 10px; border-radius: 8px; font-size: 13px; color: var(--text-dark);">
                Faturas são tratadas como etapa crítica. Monitoramento semanal e escalonamento preventivo.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- SLIDE: ROADMAP DE GANTT -->
    <section class="slide" id="slide-roadmap">
      <div class="slide-content" style="display: flex; flex-direction: column; height: 100%;">
        <header class="slide-header">
          <span class="slide-subtitle">Cronograma de Implementação</span>
          <h2 class="slide-title">Roadmap de Governança (Próximos 90 Dias)</h2>
        </header>

        <div class="gantt-container" style="flex: 1; margin-top: 10px;">
          <div class="gantt-header">
            <div class="gantt-header-label">Verticais / Projetos</div>
            <div class="gantt-timeline-ticks">
              <div class="gantt-tick">0-30 Dias<br><span style="font-size: 11px; font-weight: normal;">(Contenção e Regularização)</span></div>
              <div class="gantt-tick">31-60 Dias<br><span style="font-size: 11px; font-weight: normal;">(Padronização e Validacão)</span></div>
              <div class="gantt-tick">61-90 Dias<br><span style="font-size: 11px; font-weight: normal;">(Integração Recorrente)</span></div>
            </div>
          </div>
          <div class="gantt-body">
            
            <!-- LINHA 1: LOCAÇÃO -->
            <div class="gantt-row">
              <div class="gantt-row-label">
                Locação (Fiança)
                <span>Regularização imediata</span>
              </div>
              <div class="gantt-bars-container">
                <div class="gantt-grid-line"></div>
                <div class="gantt-grid-line"></div>
                <div class="gantt-grid-line"></div>
                
                <!-- Barra 0-30 -->
                <div class="gantt-bar bg-purple-dark" style="left: 2%; width: 29%;">
                  Tratativas & Salvaguarda
                  <div class="gantt-tooltip">
                    <h4>Concluir Casos Pendentes</h4>
                    <p><strong>Prazo:</strong> 0-30 Dias</p>
                    <p><strong>Responsável:</strong> Comercial Corretora</p>
                    <p><strong>Atividade:</strong> Concluir tratativas dos 3 casos de fiança em solução. Avaliar fluxo de salvaguarda (Cessão de dívida) quando aplicável.</p>
                    <p><strong>Status:</strong> Em Andamento</p>
                  </div>
                </div>

                <!-- Barra 61-90 -->
                <div class="gantt-bar bg-purple" style="left: 68%; width: 25%;">
                  Expansão de Fiança
                  <div class="gantt-tooltip">
                    <h4>Modelo de Conferência Fiança</h4>
                    <p><strong>Prazo:</strong> 61-90 Dias</p>
                    <p><strong>Responsável:</strong> Direção / TI</p>
                    <p><strong>Atividade:</strong> Expandir e replicar o modelo de auditoria de base ativa para a Fiança Locatícia e demais produtos.</p>
                    <p><strong>Status:</strong> Planejado</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- LINHA 2: CONDOMÍNIO -->
            <div class="gantt-row">
              <div class="gantt-row-label">
                Condomínio
                <span>Seguro Incêndio e Fluxos</span>
              </div>
              <div class="gantt-bars-container">
                <div class="gantt-grid-line"></div>
                <div class="gantt-grid-line"></div>
                <div class="gantt-grid-line"></div>
                
                <!-- Barra 31-60 -->
                <div class="gantt-bar bg-orange" style="left: 35%; width: 25%;">
                  Relatório & Fluxos (TI)
                  <div class="gantt-tooltip">
                    <h4>Validar Novo Desenho com Área</h4>
                    <p><strong>Prazo:</strong> 31-60 Dias</p>
                    <p><strong>Responsável:</strong> Thiago (TI) e Área Condomínios</p>
                    <p><strong>Atividade:</strong> Redesenhar fluxo de vendas/transmissão identificando lacunas. Validar com TI da CR relatório de conferência do Seguro Incêndio.</p>
                    <p><strong>Status:</strong> Em Construção</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- LINHA 3: TRANSVERSAL / BASE -->
            <div class="gantt-row">
              <div class="gantt-row-label">
                Projetos Transversais
                <span>Base Auditável e Processos</span>
              </div>
              <div class="gantt-bars-container">
                <div class="gantt-grid-line"></div>
                <div class="gantt-grid-line"></div>
                <div class="gantt-grid-line"></div>
                
                <!-- Barra 0-30 -->
                <div class="gantt-bar bg-gray" style="left: 2%; width: 28%; color: var(--brand-purple-dark);">
                  Pós-Sinistro & Faturas
                  <div class="gantt-tooltip">
                    <h4>Rotinas de Manutenção de Cobertura</h4>
                    <p><strong>Prazo:</strong> 0-30 Dias</p>
                    <p><strong>Responsável:</strong> César / Roque</p>
                    <p><strong>Atividade:</strong> Formalizar fluxo pós-sinistro (renovação 5 dias). Consolidar realocação de faturas e iniciar acompanhamento de títulos críticos semanalmente.</p>
                    <p><strong>Status:</strong> Implantado</p>
                  </div>
                </div>

                <!-- Barra 31-60 -->
                <div class="gantt-bar bg-purple-dark" style="left: 36%; width: 28%;">
                  Auditoria Base Ativa
                  <div class="gantt-tooltip">
                    <h4>1ª Rotina de Auditoria Conjunta</h4>
                    <p><strong>Prazo:</strong> 31-60 Dias</p>
                    <p><strong>Responsável:</strong> Priscila (Projetos) / Douglas / Jon</p>
                    <p><strong>Atividade:</strong> Estruturar primeira rotina periódica de auditoria cruzando bases da corretora com a Crédito Real (apólices canceladas, contratos ativos sem cobertura).</p>
                    <p><strong>Status:</strong> Em Desenvolvimento</p>
                  </div>
                </div>

                <!-- Barra 61-90 -->
                <div class="gantt-bar bg-brand-green" style="background: var(--brand-green); left: 70%; width: 28%;">
                  Comitê Operacional
                  <div class="gantt-tooltip">
                    <h4>Cadência Recorrente</h4>
                    <p><strong>Prazo:</strong> 61-90 Dias</p>
                    <p><strong>Responsável:</strong> Diretoria Executiva</p>
                    <p><strong>Atividade:</strong> Estabelecer Comitê Operacional em cadência recorrente para acompanhamento das divergências, e formalizar integração sistêmica de plataforma.</p>
                    <p><strong>Status:</strong> Planejado</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>`;

// Insert the new slides right after slide-acordos
const insertAfterStr = '</section>\n\n    <!-- SLIDE ACORDOS COMERCIAIS -->';
// Wait, slide-acordos is actually:
// <section class="slide" id="slide-acordos">
// ...
// </section>
const insertRegex = /<section class="slide" id="slide-acordos">[\s\S]*?<\/section>/;
const match = html.match(insertRegex);
if (match) {
  html = html.replace(match[0], match[0] + '\n' + slidesHtml);
} else {
  console.log("Could not find slide-acordos to insert after!");
}

// Update the drawer menu to include the 3 new slides
const sidebarAcordosHtml = '<li class="drawer-menu-item" data-slide="acordos"><span class="drawer-item-num">14</span> Acordos Comerciais</li>';
const newSidebarItems = `
        <li class="drawer-menu-item" data-slide="principios"><span class="drawer-item-num">15</span> Princípios</li>
        <li class="drawer-menu-item" data-slide="estrategia"><span class="drawer-item-num">16</span> Plano de Ação</li>
        <li class="drawer-menu-item" data-slide="roadmap"><span class="drawer-item-num">17</span> Roadmap de Governança</li>`;

if (html.includes(sidebarAcordosHtml)) {
  html = html.replace(sidebarAcordosHtml, sidebarAcordosHtml + '\n' + newSidebarItems);
}

fs.writeFileSync(htmlPath, html);
console.log('Added Plano de Acao slides');
