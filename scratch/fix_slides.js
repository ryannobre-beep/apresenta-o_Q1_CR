const fs = require('fs');

const htmlPath = '../diretorias.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// --- Rewrite Slide 12 (slide-principios) ---
const slidePrincipiosRegex = /<section class="slide" id="slide-principios">[\s\S]*?<\/section>/;
const newSlidePrincipios = `
    <!-- SLIDE: PRINCÍPIOS E GOVERNANÇA -->
    <section class="slide" id="slide-principios">
      <div class="slide-content" style="display: flex; flex-direction: column; height: 100%;">
        <header class="slide-header">
          <span class="slide-subtitle">Governança e Evolução Operacional</span>
          <h2 class="slide-title">Princípios da Abordagem Conjunta</h2>
        </header>

        <div class="message-card" style="margin-bottom: 20px; border-left-color: var(--brand-purple);">
          <p class="message-text"><strong>A prioridade é transformar riscos identificados em controles permanentes, com responsáveis claros e bases auditáveis.</strong> A resposta da Corretora combina transparência, correção estrutural e foco na manutenção da parceria.</p>
        </div>

        <div class="projects-grid" style="grid-template-columns: repeat(4, 1fr); gap: 15px; flex: 1;">
          <div class="project-card" style="display: flex; flex-direction: column; justify-content: center; padding: 20px;">
            <div style="font-size: 32px; font-weight: 800; color: var(--brand-purple); margin-bottom: 10px;">01</div>
            <h3 style="color: var(--brand-purple-dark); font-size: 18px; margin-bottom: 15px;">Transparência</h3>
            <p style="color: var(--text-medium); font-size: 14px; line-height: 1.5;">Dar total visibilidade aos casos identificados, ao status real das tratativas em andamento e aos próximos passos da operação.</p>
          </div>

          <div class="project-card" style="display: flex; flex-direction: column; justify-content: center; padding: 20px;">
            <div style="font-size: 32px; font-weight: 800; color: var(--brand-purple); margin-bottom: 10px;">02</div>
            <h3 style="color: var(--brand-purple-dark); font-size: 18px; margin-bottom: 15px;">Tratamento Específico</h3>
            <p style="color: var(--text-medium); font-size: 14px; line-height: 1.5;">Atuar caso a caso de forma isolada, com avaliação objetiva e minuciosa dos impactos financeiros e das medidas de regularização.</p>
          </div>

          <div class="project-card" style="display: flex; flex-direction: column; justify-content: center; padding: 20px;">
            <div style="font-size: 32px; font-weight: 800; color: var(--brand-purple); margin-bottom: 10px;">03</div>
            <h3 style="color: var(--brand-purple-dark); font-size: 18px; margin-bottom: 15px;">Correção Estrutural</h3>
            <p style="color: var(--text-medium); font-size: 14px; line-height: 1.5;">Ajustar fluxos de renovação, transmissão e acompanhamento de faturas e inadimplência, reduzindo drasticamente a recorrência.</p>
          </div>

          <div class="project-card" style="display: flex; flex-direction: column; justify-content: center; padding: 20px;">
            <div style="font-size: 32px; font-weight: 800; color: var(--brand-purple); margin-bottom: 10px;">04</div>
            <h3 style="color: var(--brand-purple-dark); font-size: 18px; margin-bottom: 15px;">Governança Conjunta</h3>
            <p style="color: var(--text-medium); font-size: 14px; line-height: 1.5;">Integrar bases de dados, definir responsáveis, implantar rotinas e registrar evidências para criar um acompanhamento 100% auditável.</p>
          </div>
        </div>
      </div>
    </section>`;
html = html.replace(slidePrincipiosRegex, newSlidePrincipios);

// --- Rewrite Slide 13 (slide-estrategia) ---
const slideEstrategiaRegex = /<section class="slide" id="slide-estrategia">[\s\S]*?<\/section>/;
const newSlideEstrategia = `
    <!-- SLIDE: PLANO DE AÇÃO (AÇÕES ESTRUTURAIS) -->
    <section class="slide" id="slide-estrategia">
      <div class="slide-content" style="display: flex; flex-direction: column; height: 100%;">
        <header class="slide-header">
          <span class="slide-subtitle">Plano de Ação Estruturado</span>
          <h2 class="slide-title">Estratégia de Regularização e Controle</h2>
        </header>

        <div class="projects-grid" style="grid-template-columns: repeat(3, 1fr); gap: 25px; margin-top: 20px; flex: 1;">
          
          <div class="project-card" style="border-top: 5px solid var(--accent-orange); display: flex; flex-direction: column; padding: 30px 20px;">
            <div class="project-header" style="justify-content: center; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 15px; margin-bottom: 20px;">
              <h3 class="project-title" style="color: var(--brand-purple-dark); font-size: 24px;">Cessão de Dívida</h3>
            </div>
            <p style="color: var(--text-medium); font-size: 15px; line-height: 1.6; margin-bottom: auto; text-align: center;">Mecanismo de salvaguarda excepcional, acionado apenas para mitigação de impacto material em casos pontuais.</p>
            <div style="background: rgba(229, 142, 38, 0.1); padding: 15px; border-radius: 8px; font-size: 14px; color: var(--text-dark); text-align: center; margin-top: 20px;">
              <strong>Operacionalização:</strong> Pagamento direto à imobiliária com posterior cobrança do inquilino pela corretora, assumindo a inadimplência.
            </div>
          </div>

          <div class="project-card" style="border-top: 5px solid var(--brand-purple); display: flex; flex-direction: column; padding: 30px 20px;">
            <div class="project-header" style="justify-content: center; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 15px; margin-bottom: 20px;">
              <h3 class="project-title" style="color: var(--brand-purple-dark); font-size: 24px;">Renovação Compulsória</h3>
            </div>
            <p style="color: var(--text-medium); font-size: 15px; line-height: 1.6; margin-bottom: auto; text-align: center;">Novo fluxo operacional pós-sinistro criado especificamente para reduzir o risco de cancelamento por silêncio operacional.</p>
            <div style="background: rgba(107, 79, 179, 0.1); padding: 15px; border-radius: 8px; font-size: 14px; color: var(--text-dark); text-align: center; margin-top: 20px;">
              <strong>Regra:</strong> Na ausência de retorno da tratativa em <strong>5 dias</strong>, a apólice é renovada preservando a continuidade da cobertura.
            </div>
          </div>

          <div class="project-card" style="border-top: 5px solid var(--brand-purple-dark); display: flex; flex-direction: column; padding: 30px 20px;">
            <div class="project-header" style="justify-content: center; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 15px; margin-bottom: 20px;">
              <h3 class="project-title" style="color: var(--brand-purple-dark); font-size: 24px;">Supervisão Integrada</h3>
            </div>
            <p style="color: var(--text-medium); font-size: 15px; line-height: 1.6; margin-bottom: auto; text-align: center;">Toda a rotina de faturas e boletos foi realocada estrategicamente para atuação sob a supervisão da área de contratação.</p>
            <div style="background: rgba(43, 14, 74, 0.1); padding: 15px; border-radius: 8px; font-size: 14px; color: var(--text-dark); text-align: center; margin-top: 20px;">
              <strong>Nova Postura:</strong> Faturas tratadas como etapa crítica. Monitoramento semanal com escalonamento preventivo ativo.
            </div>
          </div>

        </div>
      </div>
    </section>`;
html = html.replace(slideEstrategiaRegex, newSlideEstrategia);

// --- Rewrite Slide 14 (slide-roadmap) ---
const slideRoadmapRegex = /<section class="slide" id="slide-roadmap">[\s\S]*?<\/section>/;
const matchRoadmap = html.match(slideRoadmapRegex);
if (matchRoadmap) {
  let newSlideRoadmap = matchRoadmap[0];
  
  // 1. Rename "Projetos Transversais" to "Integração e Dados"
  newSlideRoadmap = newSlideRoadmap.replace('Projetos Transversais', 'Integração e Dados');
  newSlideRoadmap = newSlideRoadmap.replace('<span>Base Auditável e Processos</span>', '<span>Base Auditável Viva</span>');
  
  // 2. Change tooltip hover to onclick trigger
  // Add onclick="toggleGanttTooltip(this, event)" to every gantt-bar
  newSlideRoadmap = newSlideRoadmap.replace(/class="gantt-bar /g, 'onclick="toggleGanttTooltip(this, event)" class="gantt-bar ');
  
  // 3. Add a close (x) button inside every gantt-tooltip
  newSlideRoadmap = newSlideRoadmap.replace(/<div class="gantt-tooltip">/g, '<div class="gantt-tooltip" onclick="event.stopPropagation()">\n<div class="gantt-tooltip-close" onclick="closeGanttTooltip(this, event)">✕</div>');
  
  html = html.replace(slideRoadmapRegex, newSlideRoadmap);
}

// Add the JS logic for the Gantt click interaction
const jsScript = `
  <script>
    function toggleGanttTooltip(element, event) {
      // Close all other tooltips first
      document.querySelectorAll('.gantt-bar.active').forEach(bar => {
        if (bar !== element) bar.classList.remove('active');
      });
      // Toggle this one
      element.classList.toggle('active');
      // Prevent click from bubbling up to document
      if (event) event.stopPropagation();
    }
    
    function closeGanttTooltip(element, event) {
      const bar = element.closest('.gantt-bar');
      if (bar) bar.classList.remove('active');
      if (event) event.stopPropagation();
    }

    // Close when clicking anywhere outside
    document.addEventListener('click', function(e) {
      document.querySelectorAll('.gantt-bar.active').forEach(bar => {
        if (!bar.contains(e.target)) {
          bar.classList.remove('active');
        }
      });
    });
  </script>
</body>`;
if (!html.includes('function toggleGanttTooltip')) {
  html = html.replace('</body>', jsScript);
}

// Cache Buster
html = html.replace(/src="src\/charts\.js\?v=7\.7"/, 'src="src/charts.js?v=7.8"');
html = html.replace(/src="src\/app\.js\?v=7\.7"/, 'src="src/app.js?v=7.8"');

fs.writeFileSync(htmlPath, html);
console.log('Fixed Slides 12, 13, 14');
