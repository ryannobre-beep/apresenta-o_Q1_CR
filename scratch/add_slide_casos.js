const fs = require('fs');

const htmlPath = '../diretorias.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// The new slide HTML
const newSlideHtml = `
    <!-- SLIDE: STATUS DOS CASOS MAPEADOS -->
    <section class="slide" id="slide-casos">
      <div class="slide-content" style="display: flex; flex-direction: column; height: 100%;">
        <header class="slide-header">
          <span class="slide-subtitle">Auditoria e Visão Geral dos Casos</span>
          <h2 class="slide-title">Status das Inconsistências Mapeadas</h2>
        </header>

        <div class="split-layout" style="height: 100%; margin-top: 10px; gap: 30px;">
          
          <!-- COLUNA 1: FIANÇA -->
          <div class="chart-side" style="width: 50%; display: flex; flex-direction: column; background: var(--bg-white); border-radius: var(--border-radius-md); box-shadow: var(--card-shadow); border-top: 5px solid var(--brand-purple); padding: 30px;">
            <h3 style="color: var(--brand-purple-dark); font-size: 20px; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 15px; margin-bottom: 20px;">Frente 1: Fiança Locatícia</h3>
            
            <div style="display: flex; align-items: center; margin-bottom: 30px;">
              <div style="font-size: 80px; font-weight: 800; color: var(--brand-purple); line-height: 1; margin-right: 20px;">6</div>
              <p style="color: var(--text-medium); font-size: 15px; line-height: 1.5;">Casos identificados relacionados à falta de pagamento de faturas.</p>
            </div>

            <div style="display: flex; gap: 15px; margin-bottom: auto;">
              <div style="flex: 1; background: rgba(107, 79, 179, 0.05); padding: 15px; border-radius: 8px;">
                <div style="font-size: 24px; font-weight: 700; color: var(--brand-purple); margin-bottom: 5px;">3 Resolvidos</div>
                <p style="font-size: 13px; color: var(--text-medium);">Ações de regularização concluídas. Em monitoramento preventivo.</p>
              </div>
              <div style="flex: 1; background: rgba(107, 79, 179, 0.05); padding: 15px; border-radius: 8px;">
                <div style="font-size: 24px; font-weight: 700; color: var(--brand-purple-dark); margin-bottom: 5px;">3 Em Tratamento</div>
                <p style="font-size: 13px; color: var(--text-medium);">1 caso de sinistro com cobrança ativa e 2 casos comerciais para reversão.</p>
              </div>
            </div>

            <div style="background: rgba(43, 14, 74, 0.05); padding: 15px; border-radius: 8px; margin-top: 20px;">
              <strong style="color: var(--brand-purple-dark); display: block; margin-bottom: 5px;">Solução Proposta:</strong>
              <span style="color: var(--text-medium); font-size: 14px;">Quando aplicável, realizar a quitação à imobiliária mediante Cessão da Dívida e cobrança posterior do inquilino.</span>
            </div>
          </div>

          <!-- COLUNA 2: CONDOMÍNIO -->
          <div class="chart-side" style="width: 50%; display: flex; flex-direction: column; background: var(--bg-white); border-radius: var(--border-radius-md); box-shadow: var(--card-shadow); border-top: 5px solid var(--accent-orange); padding: 30px;">
            <h3 style="color: var(--accent-orange); font-size: 20px; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 15px; margin-bottom: 20px;">Frente 2: Condomínio</h3>
            
            <div style="display: flex; align-items: center; margin-bottom: 30px;">
              <div style="font-size: 80px; font-weight: 800; color: var(--accent-orange); line-height: 1; margin-right: 20px;">1</div>
              <p style="color: var(--text-medium); font-size: 15px; line-height: 1.5;">Caso crítico associado ao desenho do fluxo de vendas e transmissão.</p>
            </div>

            <div style="margin-bottom: auto; background: rgba(229, 142, 38, 0.05); padding: 20px; border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
              <div style="font-size: 24px; font-weight: 700; color: var(--accent-orange); margin-bottom: 10px;">Atuação Conjunta</div>
              <p style="font-size: 14px; color: var(--text-dark); line-height: 1.6;">O caso está em tratamento direto com a área de condomínios da Crédito Real para revisão de etapas, validações e responsabilidades de ponta a ponta.</p>
            </div>

            <div style="background: rgba(229, 142, 38, 0.1); padding: 15px; border-radius: 8px; margin-top: 20px;">
              <strong style="color: var(--accent-orange); display: block; margin-bottom: 5px;">Solução Proposta:</strong>
              <span style="color: var(--text-dark); font-size: 14px;">Redesenhar integralmente o fluxo preventivo, criando clareza operacional e pontos de controle antes da transmissão.</span>
            </div>
          </div>

        </div>
      </div>
    </section>`;

// Inject after slide-principios
const slidePrincipiosRegex = /<section class="slide" id="slide-principios">[\s\S]*?<\/section>/;
const matchPrincipios = html.match(slidePrincipiosRegex);

if (matchPrincipios) {
  html = html.replace(matchPrincipios[0], matchPrincipios[0] + '\n' + newSlideHtml);
} else {
  console.log("Could not find slide-principios");
}

// Re-number the sidebar navigation
// Current items for the last part:
// <li class="drawer-menu-item" data-slide="principios"><span class="drawer-item-num">15</span> Princípios</li>
// <li class="drawer-menu-item" data-slide="estrategia"><span class="drawer-item-num">16</span> Plano de Ação</li>
// <li class="drawer-menu-item" data-slide="roadmap"><span class="drawer-item-num">17</span> Roadmap de Governança</li>

const oldNav = `
        <li class="drawer-menu-item" data-slide="principios"><span class="drawer-item-num">15</span> Princípios</li>
        <li class="drawer-menu-item" data-slide="estrategia"><span class="drawer-item-num">16</span> Plano de Ação</li>
        <li class="drawer-menu-item" data-slide="roadmap"><span class="drawer-item-num">17</span> Roadmap de Governança</li>`;

const newNav = `
        <li class="drawer-menu-item" data-slide="principios"><span class="drawer-item-num">15</span> Princípios</li>
        <li class="drawer-menu-item" data-slide="casos"><span class="drawer-item-num">16</span> Status dos Casos</li>
        <li class="drawer-menu-item" data-slide="estrategia"><span class="drawer-item-num">17</span> Plano de Ação</li>
        <li class="drawer-menu-item" data-slide="roadmap"><span class="drawer-item-num">18</span> Roadmap de Governança</li>`;

if (html.includes('<li class="drawer-menu-item" data-slide="principios">')) {
  // It's safer to use regex or replace the exact block if it matches
  // Let's replace line by line to be safe if the spacing is weird
  html = html.replace(
    /<li class="drawer-menu-item" data-slide="estrategia"><span class="drawer-item-num">16<\/span> Plano de Ação<\/li>/,
    '<li class="drawer-menu-item" data-slide="casos"><span class="drawer-item-num">16</span> Status dos Casos</li>\n        <li class="drawer-menu-item" data-slide="estrategia"><span class="drawer-item-num">17</span> Plano de Ação</li>'
  );
  html = html.replace(
    /<li class="drawer-menu-item" data-slide="roadmap"><span class="drawer-item-num">17<\/span> Roadmap de Governança<\/li>/,
    '<li class="drawer-menu-item" data-slide="roadmap"><span class="drawer-item-num">18</span> Roadmap de Governança</li>'
  );
}

// Cache Buster
html = html.replace(/src="src\/charts\.js\?v=8\.0"/, 'src="src/charts.js?v=8.1"');
html = html.replace(/src="src\/app\.js\?v=8\.0"/, 'src="src/app.js?v=8.1"');

fs.writeFileSync(htmlPath, html);
console.log('Added Slide Casos');
