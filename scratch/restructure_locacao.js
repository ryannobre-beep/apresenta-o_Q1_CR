const fs = require('fs');
const cheerio = require('cheerio');

// Load HTML files
const locacaoHtml = fs.readFileSync('../locacao.html', 'utf8');
const diretoriaHtml = fs.readFileSync('../diretorias.html', 'utf8');

const $loc = cheerio.load(locacaoHtml);
const $dir = cheerio.load(diretoriaHtml);

// 1. Identify slides to KEEP from Locação
const keepLocacaoIds = [
  'slide-1',   // Capa
  'slide-10',  // Gráfico 1 (Comparativo YoY)
  'slide-8',   // Gráfico 3 (Meta x Realizado)
  'slide-13',  // Gráfico 6 (YoY Produto)
];

// Identify the last slide (Fechamento)
const lastSlideId = $loc('section.slide').last().attr('id'); // e.g. slide-23

// 2. Identify slides to IMPORT from Diretoria
const importDiretoriaIds = [
  'slide-comercial-incendio', // Ticket Médio Incêndio
  'slide-plataforma',         // Roadmap Plataforma
  'slide-roadmap'             // Roadmap Governança
];

// Extract the actual HTML elements as strings
const slidesToKeep = keepLocacaoIds.map(id => {
  let el = $loc('#' + id);
  if (!el.length) console.log('WARNING: Missing keep slide', id);
  return $loc.html(el);
});

const slidesToImport = importDiretoriaIds.map(id => {
  let el = $dir('#' + id);
  if (!el.length) console.log('WARNING: Missing import slide', id);
  return $dir.html(el);
});

// Create CS Slide
const csSlideHtml = `
<section class="slide" id="slide-cs-job">
  <div class="slide-content">
    <header class="slide-header">
      <span class="slide-subtitle">Fortalecimento Comercial RS</span>
      <h2 class="slide-title">Novo Papel: Customer Success (Relacionamento & Comercial)</h2>
    </header>

    <div class="split-layout" style="margin-top: 10px; gap: 30px;">
      
      <div class="commentary-side" style="flex: 1; display: flex; flex-direction: column; gap: 15px;">
        <div class="message-card" style="background: var(--bg-white); border-left: 4px solid var(--brand-purple-dark);">
          <p class="message-text" style="font-weight: 600; font-size: 1.1rem; color: var(--brand-purple-dark);">Objetivo do Cargo</p>
          <p style="margin-top: 10px; font-size: 0.95rem; line-height: 1.5;">Atuar como ponto de relacionamento estratégico e operacional no Rio Grande do Sul, garantindo proximidade com parceiros (franqueados, corretores e CR). O foco é expandir a carteira, acompanhar a experiência do cliente e realizar venda consultiva de produtos High Ticket e Ramos Elementares.</p>
        </div>
        
        <div class="message-card" style="background: var(--bg-white); border-left: 4px solid var(--brand-orange);">
          <p class="message-text" style="font-weight: 600; font-size: 1.1rem; color: var(--brand-orange);">Presença Ativa (Em Campo)</p>
          <ul style="margin-top: 10px; padding-left: 20px; font-size: 0.95rem; line-height: 1.5; color: var(--text-medium);">
            <li><strong>1 dia presencial</strong> na Crédito Real.</li>
            <li><strong>2 dias dedicados a visitas</strong> presenciais a franqueados.</li>
            <li><strong>2 dias híbridos</strong> para acompanhamento operacional e comercial.</li>
          </ul>
        </div>
      </div>

      <div class="chart-side" style="flex: 1.5; display: flex; flex-direction: column; gap: 15px;">
        <div style="background: white; border-radius: 8px; padding: 25px; box-shadow: var(--card-shadow); height: 100%;">
          <h3 style="font-size: 1.2rem; color: var(--brand-purple-dark); margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Pilares de Atuação</h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <h4 style="color: var(--brand-green); font-size: 1rem; margin-bottom: 5px;">1. Treinamento & Capacitação</h4>
              <p style="font-size: 0.85rem; color: var(--text-medium); line-height: 1.4;">Conduzir treinamentos sobre portfólio, regras comerciais, plataforma e fluxos para parceiros e equipes internas.</p>
            </div>
            <div>
              <h4 style="color: var(--brand-green); font-size: 1rem; margin-bottom: 5px;">2. Suporte Operacional</h4>
              <p style="font-size: 0.85rem; color: var(--text-medium); line-height: 1.4;">Apoiar a ponta no uso da plataforma, processos de biometria e interface com backoffice.</p>
            </div>
            <div>
              <h4 style="color: var(--brand-green); font-size: 1rem; margin-bottom: 5px;">3. Consultoria Comercial</h4>
              <p style="font-size: 0.85rem; color: var(--text-medium); line-height: 1.4;">Aprovação de seguros High Ticket e desenvolvimento de Ramos Elementares focando Locação e Franquias.</p>
            </div>
            <div>
              <h4 style="color: var(--brand-green); font-size: 1rem; margin-bottom: 5px;">4. Campanhas & Marketing</h4>
              <p style="font-size: 0.85rem; color: var(--text-medium); line-height: 1.4;">Apoio na execução de campanhas, incentivos e engajamento da base comercial do RS.</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>
`;

// Create Produção do Fiança Placeholder
const producaoFiancaHtml = `
<section class="slide" id="slide-producao-fianca">
  <div class="slide-content" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center;">
    <div style="background: rgba(229, 142, 38, 0.1); color: var(--brand-orange); padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 0.9rem; margin-bottom: 20px;">
      Slide em Construção
    </div>
    <h2 class="slide-title" style="font-size: 2.5rem; color: var(--brand-purple-dark); margin-bottom: 10px;">Produção do Fiança</h2>
    <p style="color: var(--text-medium); font-size: 1.2rem; max-width: 600px;">
      Este espaço está reservado para a apresentação dos dados de produção do produto Fiança. As informações serão inseridas futuramente.
    </p>
  </div>
</section>
`;

// Build new slides array
const finalSlides = [
  slidesToKeep[0], // Capa
  slidesToKeep[1], // Comparativo YoY
  slidesToKeep[2], // Meta x Realizado
  slidesToKeep[3], // YoY Produto
  slidesToImport[0], // Ticket Médio Incêndio
  producaoFiancaHtml, // Produção do Fiança
  slidesToImport[1], // Roadmap Plataforma
  slidesToImport[2], // Roadmap Governança
  csSlideHtml,       // CS Slide
  $loc.html($loc('#' + lastSlideId)) // Fechamento
];

// Clear existing slides and append new ones
$loc('section.slide').remove();

finalSlides.forEach(slideHtml => {
  if (slideHtml) {
    $loc('.presentation-container').append(slideHtml);
  }
});

// Update Drawer Menu
$loc('.drawer-menu').empty();

const menuItems = [
  { title: "Capa", id: "slide-1" },
  { title: "Comparativo YoY", id: "slide-10" },
  { title: "Meta x Realizado", id: "slide-8" },
  { title: "YoY Produto", id: "slide-13" },
  { title: "Ticket Médio Incêndio", id: "slide-comercial-incendio" },
  { title: "Produção do Fiança", id: "slide-producao-fianca" },
  { title: "Roadmap: Plataforma", id: "slide-plataforma" },
  { title: "Roadmap: Governança", id: "slide-roadmap" },
  { title: "Customer Success (RS)", id: "slide-cs-job" },
  { title: "Fechamento", id: lastSlideId }
];

let menuHtml = '';
menuItems.forEach((item, index) => {
  let numStr = (index + 1).toString().padStart(2, '0');
  let activeClass = index === 0 ? 'active' : '';
  menuHtml += `<li class="drawer-menu-item ${activeClass}" data-slide="${index}"><span class="drawer-item-num">${numStr}</span> ${item.title}</li>\n`;
});

$loc('.drawer-menu').html(menuHtml);

// Fix Slide Number indicator Total
$loc('#slide-num').text('01 / ' + menuItems.length.toString().padStart(2, '0'));

// Bump cache busters
let finalHtml = $loc.html();
finalHtml = finalHtml.replace(/v=6\\.\\d+/g, 'v=6.5');

fs.writeFileSync('../locacao.html', finalHtml);
console.log('Restructure complete! Wrote to locacao.html');
