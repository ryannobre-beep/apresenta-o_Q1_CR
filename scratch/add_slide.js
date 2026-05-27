const fs = require('fs');

let html = fs.readFileSync('../diretorias.html', 'utf-8');

const newSlideHTML = `
    <!-- SLIDE: COMPOSIÇÃO SOCIETÁRIA -->
    <section class="slide" id="slide-societaria">
      <div class="slide-content">
        <header class="slide-header">
          <span class="slide-subtitle">Estrutura Corporativa</span>
          <h2 class="slide-title">Composição Societária</h2>
        </header>

        <div class="societaria-layout" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 3rem; margin-top: -2rem;">
          
          <div style="text-align: center; max-width: 800px;">
            <p style="font-size: 1.5rem; color: var(--text-dark); line-height: 1.6;">
              A <strong>Lado Bom Seguros</strong> é uma <em>Joint Venture</em> estratégica, formada pela união de expertises complementares de duas grandes forças do mercado:
            </p>
          </div>

          <div style="display: flex; align-items: center; justify-content: center; gap: 4rem; width: 100%;">
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eee; display: flex; align-items: center; justify-content: center; width: 300px; height: 150px;">
              <img src="gruporv.png" alt="Grupo RV" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
            
            <div style="font-size: 3rem; color: var(--brand-purple); font-weight: bold;">+</div>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eee; display: flex; align-items: center; justify-content: center; width: 300px; height: 150px;">
              <img src="grupobrognoli.svg" alt="Grupo Brognoli" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
          </div>

          <div style="background: rgba(80, 40, 150, 0.03); border: 1px solid rgba(80, 40, 150, 0.1); border-radius: 12px; padding: 2rem; width: 100%; max-width: 900px; margin-top: 1rem;">
            <h3 style="color: var(--brand-purple-dark); font-size: 1.2rem; margin-bottom: 1rem; text-align: center;">ENTIDADES LEGAIS (CNPJs)</h3>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.8rem;">
              <li style="display: flex; align-items: center; font-size: 1.1rem; color: var(--text-medium);">
                <span style="color: var(--brand-green); margin-right: 10px;">•</span> 
                <strong>IMOB SEGUROS – GRUPO BROGNOLI LTDA</strong>
              </li>
              <li style="display: flex; align-items: center; font-size: 1.1rem; color: var(--text-medium);">
                <span style="color: var(--brand-green); margin-right: 10px;">•</span> 
                <strong>LADO BOM CORRETORA DE SEGUROS SA</strong>
              </li>
              <li style="display: flex; align-items: center; font-size: 1.1rem; color: var(--text-medium);">
                <span style="color: var(--brand-green); margin-right: 10px;">•</span> 
                <strong>LADO BOM SEGUROS LTDA</strong>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
`;

const newMenuItem = `        <li class="drawer-menu-item" data-slide="2"><span class="drawer-item-num">03</span> Composição Societária</li>\n`;

// 1. Insert Slide HTML
html = html.replace('<!-- SLIDE 03: TEAM MEMBERS -->', newSlideHTML + '\n    <!-- SLIDE 03: TEAM MEMBERS -->');

// 2. Insert Menu Item
html = html.replace('<li class="drawer-menu-item" data-slide="2"><span class="drawer-item-num">03</span> Pessoas Chaves</li>', 
                    newMenuItem + '        <li class="drawer-menu-item" data-slide="3"><span class="drawer-item-num">04</span> Pessoas Chaves</li>');

// Fix the rest of the menu items manually to increment the numbers
html = html.replace('<li class="drawer-menu-item" data-slide="3"><span class="drawer-item-num">04</span> Principais Projetos</li>',
                    '<li class="drawer-menu-item" data-slide="4"><span class="drawer-item-num">05</span> Principais Projetos</li>');
html = html.replace('<li class="drawer-menu-item" data-slide="4"><span class="drawer-item-num">05</span> Contexto da Parceria</li>',
                    '<li class="drawer-menu-item" data-slide="5"><span class="drawer-item-num">06</span> Contexto da Parceria</li>');

html = html.replace('<li class="drawer-menu-item" data-slide="5"><span class="drawer-item-num">06</span> Q1: Resultado Consolidado</li>',
                    '<li class="drawer-menu-item" data-slide="6"><span class="drawer-item-num">07</span> Q1: Resultado Consolidado</li>');
html = html.replace('<li class="drawer-menu-item" data-slide="6"><span class="drawer-item-num">07</span> Q1: Evolução por Vertical</li>',
                    '<li class="drawer-menu-item" data-slide="7"><span class="drawer-item-num">08</span> Q1: Evolução por Vertical</li>');
html = html.replace('<li class="drawer-menu-item" data-slide="7"><span class="drawer-item-num">08</span> Q1: Meta x Realizado</li>',
                    '<li class="drawer-menu-item" data-slide="8"><span class="drawer-item-num">09</span> Q1: Meta x Realizado</li>');
html = html.replace('<li class="drawer-menu-item" data-slide="8"><span class="drawer-item-num">09</span> Q1: Atingimento da Meta</li>',
                    '<li class="drawer-menu-item" data-slide="9"><span class="drawer-item-num">10</span> Q1: Atingimento da Meta</li>');

html = html.replace('<li class="drawer-menu-item" data-slide="9"><span class="drawer-item-num">10</span> YoY: Comparativo Vertical</li>',
                    '<li class="drawer-menu-item" data-slide="10"><span class="drawer-item-num">11</span> YoY: Comparativo Vertical</li>');
html = html.replace('<li class="drawer-menu-item" data-slide="10"><span class="drawer-item-num">11</span> YoY: Variação por Mês</li>',
                    '<li class="drawer-menu-item" data-slide="11"><span class="drawer-item-num">12</span> YoY: Variação por Mês</li>');

html = html.replace('<li class="drawer-menu-item" data-slide="16"><span class="drawer-item-num">17</span> Q1: Composição por Produto</li>',
                    '<li class="drawer-menu-item" data-slide="17"><span class="drawer-item-num">13</span> Q1: Composição por Produto</li>');

html = html.replace('<li class="drawer-menu-item" data-slide="21"><span class="drawer-item-num">22</span> Fechamento e Próximos Passos</li>',
                    '<li class="drawer-menu-item" data-slide="22"><span class="drawer-item-num">14</span> Fechamento e Próximos Passos</li>');

// Since some slides were removed previously, the menu item numbers jump from 12 to 17, but visually they are now 13, 14. 
// I just fixed the visible span numbers to 12, 13, 14.

fs.writeFileSync('../diretorias.html', html);
console.log('diretorias.html updated with Societaria slide');
