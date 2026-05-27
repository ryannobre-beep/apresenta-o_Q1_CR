const fs = require('fs');

function extractSlide(filename, slideId) {
  const content = fs.readFileSync(filename, 'utf-8');
  const lines = content.split('\n');
  let inSlide = false;
  let slideLines = [];
  
  for (const line of lines) {
    if (line.includes(`<section class="slide`) && line.includes(`id="slide-${slideId}"`)) {
      inSlide = true;
    }
    if (inSlide) {
      slideLines.push(line);
      if (line.includes(`</section>`)) {
        break;
      }
    }
  }
  return slideLines.join('\n') + '\n\n';
}

function restoreIndex() {
  let indexContent = fs.readFileSync('../index.html', 'utf-8');
  
  // We need to inject the missing slides back into index.html
  // Missing: 12, 13, 14, 15, 16, 18, 19, 20, 21
  
  // From locacao: 12, 13, 15, 18, 19, 20
  const s12 = extractSlide('../locacao.html', 12);
  const s13 = extractSlide('../locacao.html', 13);
  const s15 = extractSlide('../locacao.html', 15);
  const s18 = extractSlide('../locacao.html', 18);
  const s19 = extractSlide('../locacao.html', 19);
  const s20 = extractSlide('../locacao.html', 20);
  
  // From condominio: 14, 16, 21
  const s14 = extractSlide('../condominio.html', 14);
  const s16 = extractSlide('../condominio.html', 16);
  const s21 = extractSlide('../condominio.html', 21);
  
  // Injection points:
  // Slide 12, 13, 14, 15, 16 go between Slide 11 and Slide 17
  indexContent = indexContent.replace(
    '<!-- SLIDE 12: YOY VARIAÇÃO PRODUTO (LAYOUT C - FULL SCREEN WIDTH DETAILED CHART) -->\n\n    <!-- SLIDE 13: YOY LOCAÇÃO POR PRODUTO (LAYOUT A - SPLIT ESQUERDA) -->\n\n    <!-- SLIDE 14: YOY CONDOMÍNIO POR PRODUTO (LAYOUT B - SPLIT REVERSO) -->\n\n    <!-- SLIDE 15: PONTE YOY LOCAÇÃO (LAYOUT C - FULL SCREEN WATERFALL BRIDGE) -->\n\n    <!-- SLIDE 16: PONTE YOY CONDOMÍNIO (LAYOUT C - FULL SCREEN WATERFALL BRIDGE) -->',
    `<!-- SLIDE 12: YOY VARIAÇÃO PRODUTO (LAYOUT C - FULL SCREEN WIDTH DETAILED CHART) -->\n${s12}    <!-- SLIDE 13: YOY LOCAÇÃO POR PRODUTO (LAYOUT A - SPLIT ESQUERDA) -->\n${s13}    <!-- SLIDE 14: YOY CONDOMÍNIO POR PRODUTO (LAYOUT B - SPLIT REVERSO) -->\n${s14}    <!-- SLIDE 15: PONTE YOY LOCAÇÃO (LAYOUT C - FULL SCREEN WATERFALL BRIDGE) -->\n${s15}    <!-- SLIDE 16: PONTE YOY CONDOMÍNIO (LAYOUT C - FULL SCREEN WATERFALL BRIDGE) -->\n${s16}`
  );
  
  // Slide 18, 19, 20, 21 go between Slide 17 and Slide 22
  indexContent = indexContent.replace(
    '<!-- SLIDE 18: RANKING DE PRODUTOS NO Q1 (LAYOUT A - SPLIT ESQUERDA) -->\n\n    <!-- SLIDE 19: MAPA DE INTENSIDADE (LAYOUT C - FULL SCREEN HEATMAP) -->\n\n    <!-- SLIDE 20: DETALHAMENTO LOCAÇÃO (LAYOUT A - SPLIT ESQUERDA) -->\n\n    <!-- SLIDE 21: DETALHAMENTO CONDOMÍNIO (LAYOUT B - SPLIT REVERSO) -->',
    `<!-- SLIDE 18: RANKING DE PRODUTOS NO Q1 (LAYOUT A - SPLIT ESQUERDA) -->\n${s18}    <!-- SLIDE 19: MAPA DE INTENSIDADE (LAYOUT C - FULL SCREEN HEATMAP) -->\n${s19}    <!-- SLIDE 20: DETALHAMENTO LOCAÇÃO (LAYOUT A - SPLIT ESQUERDA) -->\n${s20}    <!-- SLIDE 21: DETALHAMENTO CONDOMÍNIO (LAYOUT B - SPLIT REVERSO) -->\n${s21}`
  );
  
  // Also we need to restore the text that we changed in index.html (the text about 102.6% -> 106.5%)
  // Wait, the user said "manter como estava. com todos os gráficos", so we just revert the textual changes?
  // Let's revert them just to be safe.
  indexContent = indexContent.replace('Locação atingiu 106,5% da meta', 'Locação atingiu 102,6% da meta');
  indexContent = indexContent.replace('R$ 558,0k', 'R$ 542,9k');
  indexContent = indexContent.replace('100.5%', '97.8%');
  indexContent = indexContent.replace('R$ 415,3k', 'R$ 400,1k');
  indexContent = indexContent.replace('O quarter encerrou com R$ 558,0 mil em rebate', 'O quarter encerrou com R$ 542,9 mil em rebate');
  
  fs.writeFileSync('../index.html', indexContent);
}

restoreIndex();
console.log('index.html restored');
