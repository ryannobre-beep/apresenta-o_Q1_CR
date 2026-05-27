const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = '../condominio.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

// Keep specific slides
const keepIds = [
  'slide-1',   // Capa
  'slide-10',  // 1. Comparativo YoY
  'slide-8',   // 3. Meta x Realizado
  'slide-17',  // 4. Composição por Produto
];

const lastSlideId = $('section.slide').last().attr('id');

const slidesToKeep = keepIds.map(id => $.html($('#' + id)));
const fechamentoSlide = $.html($('#' + lastSlideId));

// Create Viajantes da Sorte slide
const viajantesHtml = `
<section class="slide" id="slide-viajantes">
  <div class="slide-content" style="display: flex; flex-direction: column; height: 100%;">
    <header class="slide-header" style="display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <span class="slide-subtitle">Estratégia de Engajamento e Gamificação</span>
        <h2 class="slide-title" style="color: #009FE3;">Viajantes de Sorte</h2>
      </div>
      <img src="src/assets/logo_viajantes.png" alt="Viajantes de Sorte Logo" style="height: 60px; object-fit: contain;">
    </header>

    <div class="split-layout" style="flex: 1; margin-top: 10px; gap: 30px;">
      
      <!-- Coluna da Esquerda: Resumo da Startup -->
      <div class="commentary-side" style="flex: 1.5; display: flex; flex-direction: column; gap: 15px;">
        <div class="message-card" style="background: var(--bg-white); border-left: 4px solid #009FE3; border-radius: 8px; box-shadow: var(--card-shadow); padding: 20px;">
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem; line-height: 1.5; color: var(--text-medium);">
            <li style="display: flex; align-items: flex-start; gap: 10px;">
              <span style="color: #009FE3;">✈️</span> <strong>Travel tech startup</strong> inovadora com clube de viagens por assinatura e gamificação de pontos.
            </li>
            <li style="display: flex; align-items: flex-start; gap: 10px;">
              <span style="color: #009FE3;">✈️</span> Membros participam de sorteios de viagens como recurso de engajamento da comunidade.
            </li>
            <li style="display: flex; align-items: flex-start; gap: 10px;">
              <span style="color: #009FE3;">✈️</span> Missão: tornar viagens dos sonhos acessíveis e transformar experiências únicas em realidade.
            </li>
            <li style="display: flex; align-items: flex-start; gap: 10px;">
              <span style="color: #009FE3;">✈️</span> Experiências avaliadas em +R$ 30.000 — planos a partir de R$ 19,90.
            </li>
          </ul>
        </div>

        <!-- Indicadores -->
        <div style="display: flex; gap: 10px; justify-content: space-between; margin-top: 5px;">
          <div style="background: white; border: 1px solid #009FE3; border-radius: 8px; padding: 10px; flex: 1; text-align: center; border-top: 4px solid #009FE3;">
            <div style="color: #009FE3; font-weight: bold; font-size: 1.1rem;">+R$2M</div>
            <div style="font-size: 0.7rem; color: var(--text-medium); margin-top: 2px;">prêmios entregues</div>
          </div>
          <div style="background: white; border: 1px solid #009FE3; border-radius: 8px; padding: 10px; flex: 1; text-align: center; border-top: 4px solid #009FE3;">
            <div style="color: #009FE3; font-weight: bold; font-size: 1.1rem;">+120k</div>
            <div style="font-size: 0.7rem; color: var(--text-medium); margin-top: 2px;">clientes</div>
          </div>
          <div style="background: white; border: 1px solid #009FE3; border-radius: 8px; padding: 10px; flex: 1; text-align: center; border-top: 4px solid #009FE3;">
            <div style="color: #009FE3; font-weight: bold; font-size: 1.1rem;">+300k</div>
            <div style="font-size: 0.7rem; color: var(--text-medium); margin-top: 2px;">seguidores</div>
          </div>
          <div style="background: white; border: 1px solid #009FE3; border-radius: 8px; padding: 10px; flex: 1; text-align: center; border-top: 4px solid #009FE3;">
            <div style="color: #009FE3; font-weight: bold; font-size: 1.1rem;">+R$100k</div>
            <div style="font-size: 0.7rem; color: var(--text-medium); margin-top: 2px;">impacto socioambiental</div>
          </div>
        </div>

      </div>

      <!-- Coluna da Direita: Reconhecimento e Gamificação -->
      <div class="chart-side" style="flex: 1; display: flex; flex-direction: column; gap: 15px;">
        
        <!-- Reconhecimento -->
        <div style="background: rgba(0, 159, 227, 0.05); border: 1px solid #009FE3; border-radius: 8px; padding: 20px;">
          <h3 style="font-size: 0.9rem; color: var(--text-medium); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">Reconhecimento</h3>
          <div style="margin-bottom: 15px;">
            <p style="font-size: 0.9rem; font-weight: 600; color: #009FE3; margin-bottom: 5px;">"Startup Viajantes capta R$1 milhão em Media for Equity com Nexpon"</p>
            <span style="font-size: 0.75rem; color: var(--text-light);">SC Inova · 2024</span>
          </div>
          <div style="border-top: 1px solid rgba(0, 159, 227, 0.2); padding-top: 15px;">
            <p style="font-size: 0.9rem; font-weight: 600; color: #009FE3; margin-bottom: 5px;">"Top 15 Startups Finalistas do programa BRDE Labs Venture"</p>
            <span style="font-size: 0.75rem; color: var(--text-light);">BRDE Labs SC Venture · 2024</span>
          </div>
        </div>

        <!-- Opções de Modelo -->
        <div style="background: var(--brand-purple-dark); border-radius: 8px; padding: 20px; color: white; box-shadow: var(--card-shadow); flex: 1;">
          <h3 style="font-size: 1.1rem; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 8px;">Opções de Modelo</h3>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 15px; font-size: 0.9rem; line-height: 1.4;">
            <li style="display: flex; gap: 10px;">
              <div style="background: var(--brand-orange); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
              <div>
                <strong>Impulsionar Vendas na Ponta:</strong><br>
                <span style="color: rgba(255,255,255,0.8);">Para quem aderir ao seguro pela primeira vez, ganha 5 números da Sorte para os sorteios.</span>
              </div>
            </li>
            <li style="display: flex; gap: 10px;">
              <div style="background: var(--brand-orange); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
              <div>
                <strong>Gamificar as Assessoras:</strong><br>
                <span style="color: rgba(255,255,255,0.8);">A cada meta atingida, elas ganham X números da sorte para concorrer aos prêmios.</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

    </div>
  </div>
</section>
`;

const finalSlides = [
  slidesToKeep[0], // Capa
  slidesToKeep[1], // Comparativo YoY
  slidesToKeep[2], // Meta x Realizado
  slidesToKeep[3], // Composição Produto
  viajantesHtml,   // Viajantes da Sorte
  fechamentoSlide  // Fechamento
];

$('section.slide').remove();

finalSlides.forEach(slide => {
  $('.presentation-container').append(slide);
});

// Update Menu
$('.drawer-menu').empty();

const menuItems = [
  { title: "Capa", id: "slide-1" },
  { title: "Comparativo YoY", id: "slide-10" },
  { title: "Meta x Realizado", id: "slide-8" },
  { title: "Composição Produto", id: "slide-17" },
  { title: "Viajantes da Sorte", id: "slide-viajantes" },
  { title: "Fechamento", id: lastSlideId }
];

let menuHtml = '';
menuItems.forEach((item, index) => {
  let numStr = (index + 1).toString().padStart(2, '0');
  let activeClass = index === 0 ? 'active' : '';
  menuHtml += `<li class="drawer-menu-item ${activeClass}" data-slide="${index}"><span class="drawer-item-num">${numStr}</span> ${item.title}</li>\n`;
});

$('.drawer-menu').html(menuHtml);

// Fix Slide Number indicator Total
$('#slide-num').text('01 / ' + menuItems.length.toString().padStart(2, '0'));

let finalHtml = $.html();
// Restore correct doctype parsing if cheerio messed it up (optional but good practice)
// Just replace v=6.1 with v=6.2
finalHtml = finalHtml.replace(/v=6\\.\\d+/g, 'v=6.6');

fs.writeFileSync(htmlPath, finalHtml);
console.log('Condominio restructure complete!');
