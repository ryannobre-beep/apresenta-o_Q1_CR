const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = '../condominio.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

// Slide Novo Fluxo Proposto
const novoFluxoHtml = `
<section class="slide" id="slide-fluxo-proposto">
  <div class="slide-content" style="display: flex; flex-direction: column; height: 100%;">
    <header class="slide-header">
      <span class="slide-subtitle">Reestruturação Operacional</span>
      <h2 class="slide-title">Fluxo Proposto: Seguro Conteúdo</h2>
    </header>

    <div class="swimlanes-container" style="display: flex; flex: 1; gap: 15px; margin-top: 10px; align-items: stretch; overflow: hidden;">
      
      <!-- Lane 1: Cliente -->
      <div class="swimlane" style="flex: 1.2; display: flex; flex-direction: column; background: rgba(0,0,0,0.02); border: 1px solid #EAEAEA; border-radius: 8px; padding: 15px; position: relative;">
        <div style="text-align: center; margin-bottom: 15px;">
          <h3 style="color: var(--brand-purple-dark); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin: 0;">Cliente</h3>
          <div style="height: 3px; background: var(--brand-green); width: 30px; margin: 8px auto 0;"></div>
        </div>
        
        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
          <div class="flow-step" style="flex: 1; background: white; border-radius: 6px; padding: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 3px solid var(--brand-green); text-align: center;">
            <span style="font-weight: 600; font-size: 0.75rem; color: var(--text-dark);">Pagamento do boleto</span>
          </div>
          <div class="flow-step" style="flex: 1.2; background: white; border-radius: 6px; padding: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 3px solid var(--brand-purple-dark); text-align: center;">
            <span style="font-weight: 600; font-size: 0.75rem; color: var(--text-dark);">Pagar aluguel+seguro</span>
          </div>
        </div>

        <div style="margin-top: 15px; background: rgba(229, 142, 38, 0.1); border: 1px dashed var(--brand-orange); border-radius: 6px; padding: 10px;">
          <div style="color: var(--brand-orange); font-size: 0.7rem; margin-bottom: 5px; font-weight: bold; text-transform: uppercase;">✨ Nova Comunicação</div>
          
          <div class="flow-step" style="background: white; border-radius: 6px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 8px; border-left: 3px solid var(--brand-orange);">
            <span style="font-weight: 600; font-size: 0.75rem; color: var(--text-dark);">Consulta de Apólice</span>
            <p style="font-size: 0.65rem; color: var(--text-medium); margin: 3px 0 0 0; line-height: 1.3;">Para pagamentos após o dia 25, a apólice estará visível no portal a partir do dia 15.</p>
          </div>

          <div class="flow-step" style="background: white; border-radius: 6px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 3px solid var(--brand-orange);">
            <span style="font-weight: 600; font-size: 0.75rem; color: var(--text-dark);">Atendimento de Sinistro</span>
            <p style="font-size: 0.65rem; color: var(--text-medium); margin: 3px 0 0 0; line-height: 1.3;">Clientes com recorrência de 3 meses de pgto são atendidos diretamente via corretora, mesmo sem apólice emitida no mês.</p>
          </div>
        </div>

        <div style="position: absolute; right: -12px; top: 60px; color: var(--brand-orange); font-size: 18px; z-index: 1;">➔</div>
      </div>

      <!-- Lane 2: Crédito Real -->
      <div class="swimlane" style="flex: 1; display: flex; flex-direction: column; background: rgba(0,0,0,0.02); border: 1px solid #EAEAEA; border-radius: 8px; padding: 15px; position: relative;">
        <div style="text-align: center; margin-bottom: 15px;">
          <h3 style="color: var(--brand-purple-dark); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin: 0;">Crédito Real</h3>
          <div style="height: 3px; background: var(--brand-orange); width: 30px; margin: 8px auto 0;"></div>
        </div>

        <div style="margin-top: 15px;"></div>

        <div class="flow-step" style="background: white; border-radius: 6px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 3px solid var(--brand-purple-dark); margin-bottom: 8px; text-align: center;">
          <span style="font-weight: 600; font-size: 0.8rem; color: var(--text-dark);">Receber pagamento</span>
        </div>

        <div style="text-align: center; color: var(--brand-orange); margin-bottom: 8px; font-size: 0.7rem;">
          <span style="font-weight: bold;">Faseamento de Lotes</span><br><span style="color: #CCC; font-size: 0.8rem;">↓</span>
        </div>

        <div class="flow-step" style="background: rgba(107, 79, 179, 0.1); border-radius: 6px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border: 1px dashed var(--brand-purple-dark); margin-bottom: 8px; text-align: center;">
          <span style="font-weight: 600; font-size: 0.75rem; color: var(--brand-purple-dark);">Fechamento 1: Dia 10<br>Fechamento 2: Dia 25</span>
        </div>

        <div style="text-align: center; color: #CCC; margin-bottom: 8px; font-size: 0.8rem;">↓</div>
        
        <div class="flow-step" style="background: white; border-radius: 6px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 3px solid var(--brand-purple-dark); margin-bottom: 8px; text-align: center;">
          <span style="font-weight: 600; font-size: 0.8rem; color: var(--text-dark);">Conciliar pagamentos</span>
        </div>

        <div style="text-align: center; color: #CCC; margin-bottom: 8px; font-size: 0.8rem;">↓</div>

        <div class="flow-step" style="background: white; border-radius: 6px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 3px solid var(--brand-purple-dark); text-align: center;">
          <span style="font-weight: 600; font-size: 0.8rem; color: var(--text-dark);">Enviar base p/ Omne</span>
        </div>
        
        <div style="position: absolute; right: -12px; bottom: 35px; color: var(--brand-orange); font-size: 18px; z-index: 1;">➔</div>
      </div>

      <!-- Lane 3: Omne -->
      <div class="swimlane" style="flex: 1.2; display: flex; flex-direction: column; background: rgba(0,0,0,0.02); border: 1px solid #EAEAEA; border-radius: 8px; padding: 15px; position: relative;">
        <div style="text-align: center; margin-bottom: 15px;">
          <h3 style="color: var(--brand-purple-dark); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin: 0;">Omne</h3>
          <div style="height: 3px; background: #009FE3; width: 30px; margin: 8px auto 0;"></div>
        </div>

        <div style="flex: 1;"></div>

        <div class="flow-step" style="background: white; border-radius: 6px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 3px solid #009FE3; margin-bottom: 8px; text-align: center;">
          <div style="color: #009FE3; font-size: 0.7rem; margin-bottom: 2px;">✉️ Lotes Dia 10 e 25</div>
          <span style="font-weight: 600; font-size: 0.8rem; color: var(--text-dark);">Processar transmissão</span>
        </div>

        <div style="text-align: center; color: var(--brand-orange); margin-bottom: 8px; font-size: 0.7rem;">
          <span>⏱️ Prazo op. 5 dias</span><br><span style="color: #CCC; font-size: 0.8rem;">↓</span>
        </div>

        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
          <div class="flow-step" style="flex: 1; background: white; border-radius: 6px; padding: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 3px solid #009FE3; text-align: center;">
            <span style="font-weight: 600; font-size: 0.75rem; color: var(--text-dark);">Contratar seguro</span>
          </div>
          <div style="display: flex; align-items: center; color: #CCC; font-size: 0.8rem;">➔</div>
          <div class="flow-step" style="flex: 1; background: white; border-radius: 6px; padding: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 3px solid #009FE3; text-align: center;">
            <span style="font-weight: 600; font-size: 0.75rem; color: var(--text-dark);">Emitir apólices</span>
          </div>
        </div>

        <div style="text-align: center; color: #CCC; margin-bottom: 8px; font-size: 0.8rem;">↓</div>

        <div class="flow-step" style="background: white; border-radius: 6px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 3px solid #009FE3; text-align: center;">
          <span style="font-weight: 600; font-size: 0.8rem; color: var(--text-dark);">Enviar apólices p/ Lado Bom</span>
        </div>
        
        <div style="position: absolute; right: -12px; bottom: 25px; color: var(--brand-orange); font-size: 18px; z-index: 1;">➔</div>
      </div>

      <!-- Lane 4: Lado Bom -->
      <div class="swimlane" style="flex: 1; display: flex; flex-direction: column; background: rgba(0,0,0,0.02); border: 1px solid #EAEAEA; border-radius: 8px; padding: 15px;">
        <div style="text-align: center; margin-bottom: 15px;">
          <h3 style="color: var(--brand-purple-dark); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin: 0;">Lado Bom</h3>
          <div style="height: 3px; background: var(--brand-purple-dark); width: 30px; margin: 8px auto 0;"></div>
        </div>

        <div style="flex: 1;"></div>

        <div class="flow-step" style="background: white; border-radius: 6px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 3px solid var(--brand-purple-dark); text-align: center; position: relative;">
          <div style="background: var(--brand-green); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: absolute; top: -12px; right: -12px; font-size: 0.8rem;">✓</div>
          <div style="color: var(--brand-purple-dark); font-size: 0.7rem; margin-bottom: 2px;">✉️ Receber apólices</div>
          <span style="font-weight: 600; font-size: 0.8rem; color: var(--text-dark);">Fim do Processo</span>
        </div>
      </div>

    </div>
  </div>
</section>
`;

$('#slide-fluxo-conteudo').after(novoFluxoHtml);

// Update Menu
$('.drawer-menu').empty();

const menuItems = [];
$('section.slide').each((i, el) => {
  const id = $(el).attr('id');
  let title = "Slide";
  
  if (id === 'slide-1') title = "Capa";
  else if (id === 'slide-10') title = "Comparativo YoY";
  else if (id === 'slide-8') title = "Meta x Realizado";
  else if (id === 'slide-17') title = "Composição Produto";
  else if (id === 'slide-viajantes') title = "Viajantes da Sorte";
  else if (id === 'slide-fluxo-conteudo') title = "Fluxo Atual: Seguro";
  else if (id === 'slide-fluxo-proposto') title = "Fluxo Proposto: Seguro";
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
$('#slide-num').text('01 / ' + menuItems.length.toString().padStart(2, '0'));

let finalHtml = $.html();
// Restore correct doctype and update cache
finalHtml = finalHtml.replace(/v=6\\.\\d+/g, 'v=6.8');

fs.writeFileSync(htmlPath, finalHtml);
console.log('Slide Fluxo Proposto adicionado!');
