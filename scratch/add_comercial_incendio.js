const fs = require('fs');

const htmlPath = '../diretorias.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const newSlideHtml = `
    <!-- SLIDE: ESTRATÉGIA COMERCIAL (INCÊNDIO) -->
    <section class="slide" id="slide-comercial-incendio">
      <div class="slide-content" style="display: flex; flex-direction: column; height: 100%;">
        <header class="slide-header">
          <span class="slide-subtitle">Evolução do Produto e Upsell</span>
          <h2 class="slide-title">Estratégia Comercial: Seguro Incêndio</h2>
        </header>

        <div class="split-layout" style="flex: 1; margin-top: 10px; gap: 40px;">
          
          <!-- COLUNA 1: BENCHMARKING (TICKET) -->
          <div class="chart-side" style="width: 50%; display: flex; flex-direction: column; background: var(--bg-white); border-radius: var(--border-radius-md); box-shadow: var(--card-shadow); padding: 30px;">
            <h3 style="color: var(--brand-purple-dark); font-size: 20px; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 15px; margin-bottom: 25px;">Benchmarking: Ticket Médio (RS)</h3>
            
            <p style="color: var(--text-medium); font-size: 14px; margin-bottom: 25px;">Comparativo do valor médio dos prêmios pagos no mercado gaúcho, evidenciando o gap de receita atual.</p>

            <!-- Grafico Residencial -->
            <div style="margin-bottom: 30px;">
              <h4 style="color: var(--brand-purple); font-size: 16px; margin-bottom: 15px; font-weight: 700;">Seguro Residencial</h4>
              
              <!-- Lado Bom -->
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 140px; font-size: 13px; font-weight: 600; color: var(--text-dark);">Crédito Real / LB</div>
                <div style="flex: 1; display: flex; align-items: center;">
                  <div style="width: 48%; background: var(--brand-purple-dark); height: 24px; border-radius: 4px;"></div>
                  <span style="margin-left: 10px; font-size: 13px; font-weight: 700; color: var(--brand-purple-dark);">R$ 229 - 291</span>
                </div>
              </div>

              <!-- Auxiliadora -->
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 140px; font-size: 13px; color: var(--text-medium);">Auxiliadora Predial</div>
                <div style="flex: 1; display: flex; align-items: center;">
                  <div style="width: 94%; background: rgba(0,0,0,0.1); height: 24px; border-radius: 4px;"></div>
                  <span style="margin-left: 10px; font-size: 13px; color: var(--text-medium);">R$ 503</span>
                </div>
              </div>

              <!-- Ibagy -->
              <div style="display: flex; align-items: center;">
                <div style="width: 140px; font-size: 13px; color: var(--text-medium);">Ibagy</div>
                <div style="flex: 1; display: flex; align-items: center;">
                  <div style="width: 100%; background: rgba(0,0,0,0.1); height: 24px; border-radius: 4px;"></div>
                  <span style="margin-left: 10px; font-size: 13px; color: var(--text-medium);">R$ 535</span>
                </div>
              </div>
            </div>

            <div style="height: 1px; background: rgba(0,0,0,0.05); margin-bottom: 30px;"></div>

            <!-- Grafico Comercial -->
            <div>
              <h4 style="color: var(--brand-purple); font-size: 16px; margin-bottom: 15px; font-weight: 700;">Seguro Comercial</h4>
              
              <!-- Lado Bom -->
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 140px; font-size: 13px; font-weight: 600; color: var(--text-dark);">Crédito Real / LB</div>
                <div style="flex: 1; display: flex; align-items: center;">
                  <div style="width: 48%; background: var(--brand-purple-dark); height: 24px; border-radius: 4px;"></div>
                  <span style="margin-left: 10px; font-size: 13px; font-weight: 700; color: var(--brand-purple-dark);">R$ 299 - 365</span>
                </div>
              </div>

              <!-- Auxiliadora -->
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 140px; font-size: 13px; color: var(--text-medium);">Auxiliadora Predial</div>
                <div style="flex: 1; display: flex; align-items: center;">
                  <div style="width: 87%; background: rgba(0,0,0,0.1); height: 24px; border-radius: 4px;"></div>
                  <span style="margin-left: 10px; font-size: 13px; color: var(--text-medium);">R$ 599</span>
                </div>
              </div>

              <!-- Ibagy -->
              <div style="display: flex; align-items: center;">
                <div style="width: 140px; font-size: 13px; color: var(--text-medium);">Ibagy</div>
                <div style="flex: 1; display: flex; align-items: center;">
                  <div style="width: 100%; background: rgba(0,0,0,0.1); height: 24px; border-radius: 4px;"></div>
                  <span style="margin-left: 10px; font-size: 13px; color: var(--text-medium);">R$ 683</span>
                </div>
              </div>
            </div>

            <div style="margin-top: auto; padding: 15px; background: rgba(229, 142, 38, 0.1); border-left: 4px solid var(--accent-orange); border-radius: 4px;">
              <p style="margin: 0; font-size: 13px; color: var(--text-dark);">A adição de novas coberturas justifica um reposicionamento de preço, preenchendo essa margem não capturada.</p>
            </div>

          </div>

          <!-- COLUNA 2: EXPANSÃO DE COBERTURAS -->
          <div class="chart-side" style="width: 50%; display: flex; flex-direction: column;">
            <h3 style="color: var(--brand-purple-dark); font-size: 20px; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 15px; margin-bottom: 25px;">Evolução das Coberturas (Upsell)</h3>
            
            <p style="color: var(--text-medium); font-size: 14px; margin-bottom: 20px;">Incorporar coberturas de alto valor percebido para nivelar o produto ao padrão de mercado premium.</p>

            <div style="display: flex; flex-direction: column; gap: 12px; flex: 1;">
              
              <!-- NOVAS COBERTURAS (Destaque Topo) -->
              <div style="background: var(--bg-white); border: 2px solid var(--accent-orange); border-radius: 8px; padding: 15px; position: relative; box-shadow: 0 4px 15px rgba(229, 142, 38, 0.15);">
                <div style="position: absolute; top: -10px; right: 15px; background: var(--accent-orange); color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 10px;">NOVO (OPORTUNIDADE)</div>
                <h4 style="font-size: 16px; font-weight: 700; color: var(--accent-orange); margin-bottom: 5px;">Danos Elétricos</h4>
                <p style="font-size: 13px; color: var(--text-medium); margin: 0;">Inclusão obrigatória. Elevado índice de procura pelo inquilino e grande apelo de vendas.</p>
              </div>

              <div style="background: var(--bg-white); border: 2px solid var(--accent-orange); border-radius: 8px; padding: 15px; position: relative; box-shadow: 0 4px 15px rgba(229, 142, 38, 0.15);">
                <div style="position: absolute; top: -10px; right: 15px; background: var(--accent-orange); color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 10px;">NOVO (OPORTUNIDADE)</div>
                <h4 style="font-size: 16px; font-weight: 700; color: var(--accent-orange); margin-bottom: 5px;">Resp. Civil Familiar</h4>
                <p style="font-size: 13px; color: var(--text-medium); margin: 0;">Proteção contra danos a terceiros. Baixo custo de prêmio para seguradora, altíssimo valor percebido na ponta.</p>
              </div>

              <div style="display: flex; align-items: center; justify-content: center; margin: 5px 0;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>

              <!-- COBERTURAS EXISTENTES -->
              <div style="background: rgba(80, 40, 150, 0.03); border: 1px solid rgba(80, 40, 150, 0.1); border-radius: 8px; padding: 12px 15px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-size: 14px; font-weight: 600; color: var(--brand-purple-dark);">Incêndio / Explosão / Fumaça</span>
                  <span style="font-size: 11px; background: rgba(80,40,150,0.1); color: var(--brand-purple); padding: 2px 8px; border-radius: 4px;">Obrigatória</span>
                </div>
              </div>

              <div style="background: rgba(80, 40, 150, 0.03); border: 1px solid rgba(80, 40, 150, 0.1); border-radius: 8px; padding: 12px 15px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-size: 14px; font-weight: 600; color: var(--brand-purple-dark);">Perda ou Pagamento de Aluguel</span>
                  <span style="font-size: 11px; background: rgba(80,40,150,0.1); color: var(--brand-purple); padding: 2px 8px; border-radius: 4px;">Obrigatória</span>
                </div>
              </div>

              <div style="background: rgba(80, 40, 150, 0.03); border: 1px solid rgba(80, 40, 150, 0.1); border-radius: 8px; padding: 12px 15px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-size: 14px; font-weight: 600; color: var(--brand-purple-dark);">Vendaval / Furacão / Granizo</span>
                  <span style="font-size: 11px; background: rgba(80,40,150,0.1); color: var(--brand-purple); padding: 2px 8px; border-radius: 4px;">Casas/Galpões</span>
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
const oldNav = '<li class="drawer-menu-item" data-slide="plataforma"><span class="drawer-item-num">19</span> Plataforma (WIP)</li>';
const newNav = oldNav + '\n        <li class="drawer-menu-item" data-slide="comercial-incendio"><span class="drawer-item-num">20</span> Estratégia Comercial</li>';
if (html.includes(oldNav)) {
  html = html.replace(oldNav, newNav);
}

// Bump cache
html = html.replace(/src="src\/charts\.js\?v=8\.3"/, 'src="src/charts.js?v=8.4"');
html = html.replace(/src="src\/app\.js\?v=8\.3"/, 'src="src/app.js?v=8.4"');

fs.writeFileSync(htmlPath, html);
console.log('Added Slide Comercial Incendio');
