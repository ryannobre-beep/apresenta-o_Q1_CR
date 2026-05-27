const fs = require('fs');

const htmlPath = '../diretorias.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Remove Slide 12 (Variação YoY por Mês) - id="slide-11"
const slide11Regex = /<section class="slide chart-theme" id="slide-11">[\s\S]*?<\/section>/;
html = html.replace(slide11Regex, '');

// 2. Remove Slide 14 (Implantação Plataforma Lado Bom) - id="slide-22"
const slide22Regex = /<section class="slide" id="slide-22">[\s\S]*?<\/section>/;
html = html.replace(slide22Regex, '');

// 3. Remove Slide 15 (Plano de Ação Resumido) - id="slide-23"
const slide23Regex = /<section class="slide" id="slide-23">[\s\S]*?<\/section>/;
html = html.replace(slide23Regex, '');

// 4. Remove sidebar items
html = html.replace(/<li class="drawer-menu-item" data-slide="11">.*?<\/li>/, ''); // YoY Variação
html = html.replace(/<li class="drawer-menu-item" data-slide="22">.*?<\/li>/, ''); // Fechamento

// 5. Add "Acordos Comerciais" slide after Slide 13 (which is slide-17)
const acordosHtml = `
    <!-- SLIDE ACORDOS COMERCIAIS -->
    <section class="slide" id="slide-acordos">
      <div class="slide-content">
        <header class="slide-header">
          <span class="slide-subtitle">Parceria Estratégica</span>
          <h2 class="slide-title">Acordos Comerciais Lado Bom</h2>
        </header>

        <div class="projects-container" style="justify-content: center; margin-top: 40px;">
          <div class="projects-grid" style="grid-template-columns: repeat(3, 1fr); gap: 30px;">
            <div class="project-card" style="padding: 30px; text-align: center; border-top: 5px solid var(--accent-orange);">
              <h3 style="color: var(--brand-purple-dark); font-size: 22px; margin-bottom: 15px;">Dezembro 2025</h3>
              <p style="color: var(--text-medium); font-size: 16px; line-height: 1.5;">Pagamento de <strong>R$ 61.131,26</strong> em 10x adicionais para cobrir a Meta de 130 mil da vertical de Locação.</p>
            </div>
            
            <div class="project-card" style="padding: 30px; text-align: center; border-top: 5px solid var(--brand-purple);">
              <h3 style="color: var(--brand-purple-dark); font-size: 22px; margin-bottom: 15px;">Ano 2026</h3>
              <p style="color: var(--text-medium); font-size: 16px; line-height: 1.5;">Aumento de <strong>5%</strong> no Rebate do Seguro Incêndio (Imobiliário) com vigência de 1 ano.</p>
            </div>
            
            <div class="project-card" style="padding: 30px; text-align: center; border-top: 5px solid var(--accent-orange);">
              <h3 style="color: var(--brand-purple-dark); font-size: 22px; margin-bottom: 15px;">Janeiro 2026</h3>
              <p style="color: var(--text-medium); font-size: 16px; line-height: 1.5;">Pagamento de <strong>R$ 18.927,50</strong> também para alcançar a meta de 130 mil da vertical de Locação.</p>
            </div>
          </div>
          
          <div class="message-card" style="margin-top: 40px; text-align: center;">
            <p class="message-text" style="font-size: 18px;">Nosso compromisso contínuo com o crescimento e sustentabilidade da parceria.</p>
          </div>
        </div>
      </div>
    </section>
`;

const slide17Regex = /(<section class="slide chart-theme" id="slide-17">[\s\S]*?<\/section>)/;
html = html.replace(slide17Regex, '$1\n' + acordosHtml);

// Add sidebar item for Acordos Comerciais
const sidebarAcordosHtml = `
        <li class="drawer-menu-item" data-slide="acordos"><span class="drawer-item-num">14</span> Acordos Comerciais</li>`;
const sidebarSlide17Regex = /(<li class="drawer-menu-item" data-slide="17">.*?<\/li>)/;
html = html.replace(sidebarSlide17Regex, '$1\n' + sidebarAcordosHtml);

fs.writeFileSync(htmlPath, html);
console.log('Modified HTML');
