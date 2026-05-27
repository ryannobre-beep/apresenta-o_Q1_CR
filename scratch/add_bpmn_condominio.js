const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = '../condominio.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

// Slide BPMN Fluxo Conteúdo
const bpmnSlideHtml = `
<section class="slide" id="slide-fluxo-conteudo">
  <div class="slide-content" style="display: flex; flex-direction: column; height: 100%;">
    <header class="slide-header">
      <span class="slide-subtitle">Reestruturação Operacional</span>
      <h2 class="slide-title">Novo Fluxo: Seguro Conteúdo</h2>
    </header>

    <div class="swimlanes-container" style="display: flex; flex: 1; gap: 20px; margin-top: 10px; overflow: hidden;">
      
      <!-- Lane 1: Cliente -->
      <div class="swimlane" style="flex: 1; display: flex; flex-direction: column; background: rgba(0,0,0,0.02); border: 1px solid #EAEAEA; border-radius: 12px; padding: 20px; position: relative;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h3 style="color: var(--brand-purple-dark); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">Cliente</h3>
          <div style="height: 3px; background: var(--brand-green); width: 40px; margin: 10px auto 0;"></div>
        </div>
        
        <div class="flow-step" style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid var(--brand-green); margin-bottom: 15px; text-align: center; position: relative; z-index: 2;">
          <div style="background: var(--brand-green); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-size: 0.8rem;">1</div>
          <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-dark);">Pagamento do boleto</span>
        </div>

        <div style="text-align: center; color: #CCC; margin-bottom: 15px;">↓</div>

        <div class="flow-step" style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid var(--brand-purple-dark); text-align: center; position: relative; z-index: 2;">
          <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-dark);">Efetuar pagamento<br><span style="font-size: 0.8rem; color: var(--text-medium); font-weight: 400;">aluguel + seguro</span></span>
        </div>

        <!-- Right arrow connector -->
        <div style="position: absolute; right: -20px; top: 220px; color: var(--brand-orange); font-size: 24px; z-index: 1;">➔</div>
      </div>

      <!-- Lane 2: Crédito Real -->
      <div class="swimlane" style="flex: 1; display: flex; flex-direction: column; background: rgba(0,0,0,0.02); border: 1px solid #EAEAEA; border-radius: 12px; padding: 20px; position: relative;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h3 style="color: var(--brand-purple-dark); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">Crédito Real</h3>
          <div style="height: 3px; background: var(--brand-orange); width: 40px; margin: 10px auto 0;"></div>
        </div>

        <div class="flow-step" style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid var(--brand-purple-dark); margin-top: 110px; margin-bottom: 15px; text-align: center;">
          <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-dark);">Receber pagamento</span>
        </div>

        <div style="text-align: center; color: var(--brand-orange); margin-bottom: 15px; font-size: 0.8rem; display: flex; flex-direction: column; align-items: center;">
          <span>⏱️ Aguardar fechamento da competência</span>
          <span style="color: #CCC; font-size: 1.2rem;">↓</span>
        </div>

        <div class="flow-step" style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid var(--brand-purple-dark); margin-bottom: 15px; text-align: center;">
          <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-dark);">Conciliar pagamentos<br><span style="font-size: 0.8rem; color: var(--text-medium); font-weight: 400;">do seguro</span></span>
        </div>

        <div style="text-align: center; color: #CCC; margin-bottom: 15px;">↓</div>

        <div class="flow-step" style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid var(--brand-purple-dark); text-align: center;">
          <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-dark);">Enviar base para Omne</span>
        </div>

        <!-- Right arrow connector -->
        <div style="position: absolute; right: -20px; top: 430px; color: var(--brand-orange); font-size: 24px; z-index: 1;">➔</div>
      </div>

      <!-- Lane 3: Omne -->
      <div class="swimlane" style="flex: 1.2; display: flex; flex-direction: column; background: rgba(0,0,0,0.02); border: 1px solid #EAEAEA; border-radius: 12px; padding: 20px; position: relative;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h3 style="color: var(--brand-purple-dark); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">Omne</h3>
          <div style="height: 3px; background: #009FE3; width: 40px; margin: 10px auto 0;"></div>
        </div>

        <div class="flow-step" style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #009FE3; margin-top: 320px; margin-bottom: 15px; text-align: center;">
          <div style="color: #009FE3; font-size: 0.8rem; margin-bottom: 5px;">✉️ Receber base da CR</div>
          <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-dark);">Processar transmissão</span>
        </div>

        <div style="text-align: center; color: var(--brand-orange); margin-bottom: 15px; font-size: 0.8rem; display: flex; flex-direction: column; align-items: center;">
          <span>⏱️ Prazo op. 5 dias úteis</span>
          <span style="color: #CCC; font-size: 1.2rem;">↓</span>
        </div>

        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
          <div class="flow-step" style="flex: 1; background: white; border-radius: 8px; padding: 15px 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #009FE3; text-align: center;">
            <span style="font-weight: 600; font-size: 0.8rem; color: var(--text-dark);">Contratar<br>seguro</span>
          </div>
          <div style="display: flex; align-items: center; color: #CCC;">➔</div>
          <div class="flow-step" style="flex: 1; background: white; border-radius: 8px; padding: 15px 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #009FE3; text-align: center;">
            <span style="font-weight: 600; font-size: 0.8rem; color: var(--text-dark);">Emitir<br>apólices</span>
          </div>
        </div>

        <div style="text-align: center; color: #CCC; margin-bottom: 15px;">↓</div>

        <div class="flow-step" style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #009FE3; text-align: center;">
          <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-dark);">Enviar apólices para Lado Bom</span>
        </div>

        <!-- Right arrow connector -->
        <div style="position: absolute; right: -20px; bottom: 35px; color: var(--brand-orange); font-size: 24px; z-index: 1;">➔</div>
      </div>

      <!-- Lane 4: Lado Bom -->
      <div class="swimlane" style="flex: 1; display: flex; flex-direction: column; background: rgba(0,0,0,0.02); border: 1px solid #EAEAEA; border-radius: 12px; padding: 20px;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h3 style="color: var(--brand-purple-dark); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">Lado Bom</h3>
          <div style="height: 3px; background: var(--brand-purple-dark); width: 40px; margin: 10px auto 0;"></div>
        </div>

        <div style="flex: 1;"></div> <!-- Spacer pushing to bottom -->

        <div class="flow-step" style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid var(--brand-purple-dark); text-align: center; position: relative;">
          <div style="background: var(--brand-green); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: absolute; top: -12px; right: -12px; font-size: 0.8rem;">✓</div>
          <div style="color: var(--brand-purple-dark); font-size: 0.8rem; margin-bottom: 5px;">✉️ Receber apólices</div>
          <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-dark);">Fim do Processo</span>
        </div>
      </div>

    </div>
  </div>
</section>
`;

// Find Fechamento slide index (last slide)
const lastSlide = $('section.slide').last();

// Inject before Fechamento
lastSlide.before(bpmnSlideHtml);

// Update Menu
$('.drawer-menu').empty();

// Re-generate menu items based on actual slides in the DOM
const menuItems = [];
$('section.slide').each((i, el) => {
  const id = $(el).attr('id');
  let title = "Slide";
  
  if (id === 'slide-1') title = "Capa";
  else if (id === 'slide-10') title = "Comparativo YoY";
  else if (id === 'slide-8') title = "Meta x Realizado";
  else if (id === 'slide-17') title = "Composição Produto";
  else if (id === 'slide-viajantes') title = "Viajantes da Sorte";
  else if (id === 'slide-fluxo-conteudo') title = "Fluxo Seguro Conteúdo";
  else title = "Fechamento";

  menuItems.push({ title, id });
});

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
// Bump cache buster
finalHtml = finalHtml.replace(/v=6\\.\\d+/g, 'v=6.7');

fs.writeFileSync(htmlPath, finalHtml);
console.log('BPMN Flow added successfully!');
