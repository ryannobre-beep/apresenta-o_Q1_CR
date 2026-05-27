const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

// Helper to extract a section by ID from HTML
function extractSection(html, id) {
  const regex = new RegExp(`<section class="slide[^"]*" id="${id}">[\\s\\S]*?</section>`, 'g');
  const match = regex.exec(html);
  return match ? match[0] : '';
}

// 1. Read existing files
const indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf-8');
const locacaoHtml = fs.readFileSync(path.join(projectRoot, 'locacao.html'), 'utf-8');
const condominioHtml = fs.readFileSync(path.join(projectRoot, 'condominio.html'), 'utf-8');

// 2. Extract Covers
const coverLocacao = extractSection(locacaoHtml, 'slide-1');
const coverCondominio = extractSection(condominioHtml, 'slide-1');

// 3. Define the desired order of slides for each vertical based on the charts provided

// LOCAÇÃO SLIDES
// chart_10: slide-10
// chart_11: slide-11
// chart_03: slide-8
// chart_05: slide-17
// chart_06: slide-18
// chart_13: slide-13
// chart_12: slide-12
// chart_15: slide-15
// chart_07: slide-19
// chart_loc_10: NOVO SLIDE

let slideMetaComercial = `
    <!-- SLIDE: META COMERCIAL JANEIRO -->
    <section class="slide chart-theme" id="slide-meta-comercial">
      <div class="slide-content">
        <header class="slide-header">
          <span class="slide-subtitle">Aprofundamento de Vendas</span>
          <h2 class="slide-title">Meta Comercial | Janeiro 2026</h2>
        </header>
        <div class="full-screen-layout">
          <div class="message-card">
            <p class="message-text">Composição e atingimento da meta comercial da vertical no mês de janeiro.</p>
          </div>
          <div class="chart-side">
            <div class="plotly-iframe-container">
              <div id="plotly-chart-loc-10" class="plotly-chart-container"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

const locacaoSections = [
  coverLocacao,
  extractSection(indexHtml, 'slide-10'), // Comparativo YoY
  extractSection(indexHtml, 'slide-11'), // Variacao YoY Mensal
  extractSection(indexHtml, 'slide-8'),  // Meta vs Realizado
  extractSection(indexHtml, 'slide-17'), // Composicao
  extractSection(indexHtml, 'slide-18'), // Ranking
  extractSection(indexHtml, 'slide-13'), // YoY Produto
  extractSection(indexHtml, 'slide-12'), // Variacao YoY Produto
  extractSection(indexHtml, 'slide-15'), // Ponte YoY
  extractSection(indexHtml, 'slide-19'), // Heatmap
  slideMetaComercial,                    // Meta Comercial
  extractSection(indexHtml, 'slide-22'), // Plano
  extractSection(indexHtml, 'slide-23'), // Plano Resumido
  extractSection(indexHtml, 'slide-24')  // Obrigado
];

// Re-number IDs for Locação so app.js navigation works perfectly
let finalLocacaoBody = locacaoSections.join('\n\n');
// We need to carefully replace IDs. Actually, app.js doesn't care about IDs, it uses document.querySelectorAll('.slide')
// BUT it's cleaner to keep them as slide-1, slide-2...

// We also need to build a new Drawer Menu!
const drawerLocacao = `
    <nav class="nav-drawer" id="nav-drawer">
      <div class="drawer-header">
        <h3 class="drawer-title">Locação Q1 2026</h3>
        <button class="drawer-close" id="drawer-close" title="Fechar Menu">
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>
      <ul class="drawer-menu">
        <li class="drawer-menu-item active" data-slide="0"><span class="drawer-item-num">01</span> Capa</li>
        <li class="drawer-menu-item" data-slide="1"><span class="drawer-item-num">02</span> Comparativo YoY</li>
        <li class="drawer-menu-item" data-slide="2"><span class="drawer-item-num">03</span> Variação YoY Mensal</li>
        <li class="drawer-menu-item" data-slide="3"><span class="drawer-item-num">04</span> Meta x Realizado</li>
        <li class="drawer-menu-item" data-slide="4"><span class="drawer-item-num">05</span> Composição por Produto</li>
        <li class="drawer-menu-item" data-slide="5"><span class="drawer-item-num">06</span> Ranking de Produtos</li>
        <li class="drawer-menu-item" data-slide="6"><span class="drawer-item-num">07</span> YoY Produto</li>
        <li class="drawer-menu-item" data-slide="7"><span class="drawer-item-num">08</span> Variação YoY Produto</li>
        <li class="drawer-menu-item" data-slide="8"><span class="drawer-item-num">09</span> Ponte YoY</li>
        <li class="drawer-menu-item" data-slide="9"><span class="drawer-item-num">10</span> Heatmap Operacional</li>
        <li class="drawer-menu-item" data-slide="10"><span class="drawer-item-num">11</span> Meta Comercial Jan</li>
        <li class="drawer-menu-item" data-slide="11"><span class="drawer-item-num">12</span> Fechamento</li>
      </ul>
    </nav>
`;

// Build final locacao.html
// We take the head from locacao.html, replace everything from <nav class="nav-drawer" to the end of slides.
let newLocacaoHtml = locacaoHtml.replace(/<nav class="nav-drawer"[^>]*>[\s\S]*?<\/nav>/, drawerLocacao);
newLocacaoHtml = newLocacaoHtml.replace(/<!-- SLIDE 01: CAPA -->[\s\S]*?<!-- PRESENTATION SCRIPTS -->/, `<!-- SLIDESHOW -->\n${finalLocacaoBody}\n\n  </div>\n\n  <!-- PRESENTATION SCRIPTS -->`);
// Fix app.js plotly chart id for new slide
newLocacaoHtml = newLocacaoHtml.replace(/id="plotly-chart-loc-10"/g, 'id="plotly-chart_loc_10"'); 

fs.writeFileSync(path.join(projectRoot, 'locacao.html'), newLocacaoHtml);


// CONDOMÍNIO SLIDES
// chart_10: slide-10
// chart_11: slide-11
// chart_03: slide-8
// chart_05: slide-17
// chart_06: slide-18
// chart_07: slide-19

const condominioSections = [
  coverCondominio,
  extractSection(indexHtml, 'slide-10'), // Comparativo YoY
  extractSection(indexHtml, 'slide-11'), // Variacao YoY Mensal
  extractSection(indexHtml, 'slide-8'),  // Meta vs Realizado
  extractSection(indexHtml, 'slide-17'), // Composicao
  extractSection(indexHtml, 'slide-18'), // Ranking
  extractSection(indexHtml, 'slide-19'), // Heatmap
  extractSection(indexHtml, 'slide-22'), // Plano
  extractSection(indexHtml, 'slide-23'), // Plano Resumido
  extractSection(indexHtml, 'slide-24')  // Obrigado
];

let finalCondominioBody = condominioSections.join('\n\n');

const drawerCondominio = `
    <nav class="nav-drawer" id="nav-drawer">
      <div class="drawer-header">
        <h3 class="drawer-title">Condomínio Q1 2026</h3>
        <button class="drawer-close" id="drawer-close" title="Fechar Menu">
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>
      <ul class="drawer-menu">
        <li class="drawer-menu-item active" data-slide="0"><span class="drawer-item-num">01</span> Capa</li>
        <li class="drawer-menu-item" data-slide="1"><span class="drawer-item-num">02</span> Comparativo YoY</li>
        <li class="drawer-menu-item" data-slide="2"><span class="drawer-item-num">03</span> Variação YoY Mensal</li>
        <li class="drawer-menu-item" data-slide="3"><span class="drawer-item-num">04</span> Meta x Realizado</li>
        <li class="drawer-menu-item" data-slide="4"><span class="drawer-item-num">05</span> Composição por Produto</li>
        <li class="drawer-menu-item" data-slide="5"><span class="drawer-item-num">06</span> Ranking de Produtos</li>
        <li class="drawer-menu-item" data-slide="6"><span class="drawer-item-num">07</span> Heatmap Operacional</li>
        <li class="drawer-menu-item" data-slide="7"><span class="drawer-item-num">08</span> Fechamento</li>
      </ul>
    </nav>
`;

let newCondominioHtml = condominioHtml.replace(/<nav class="nav-drawer"[^>]*>[\s\S]*?<\/nav>/, drawerCondominio);
newCondominioHtml = newCondominioHtml.replace(/<!-- SLIDE 01: CAPA -->[\s\S]*?<!-- PRESENTATION SCRIPTS -->/, `<!-- SLIDESHOW -->\n${finalCondominioBody}\n\n  </div>\n\n  <!-- PRESENTATION SCRIPTS -->`);

fs.writeFileSync(path.join(projectRoot, 'condominio.html'), newCondominioHtml);

console.log('locacao.html and condominio.html updated with matching slides!');
