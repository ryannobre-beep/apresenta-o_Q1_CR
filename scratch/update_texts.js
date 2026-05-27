const fs = require('fs');

function updateLocacao() {
  let text = fs.readFileSync('../locacao.html', 'utf-8');

  // Title
  text = text.replace('<h1 class="slide-title">RESULTADOS Q1 2026</h1>', '<h1 class="slide-title">PERFORMANCE LOCAÇÃO</h1>');
  
  // Slide 6 (now just Locação)
  text = text.replace(
    '<p class="message-text">O quarter encerrou com R$ 542,9 mil em rebate, com Locação concentrando a maior participação do resultado.</p>',
    '<p class="message-text">A vertical de Locação encerrou o Q1 com forte representatividade, garantindo consistência na entrega dos resultados da parceria.</p>'
  );
  text = text.replace(
    'O resultado consolidado do Q1 reforça a relevância da vertical de Locação como principal motor da parceria, representando aproximadamente 73% do rebate do trimestre. Condomínio responde por cerca de 27% do resultado e permanece como uma frente estratégica com oportunidade de retomada e aceleração nos próximos ciclos.',
    'A vertical de Locação continua sendo o principal motor da parceria. O resultado acumulado do Q1 reflete a maturidade da operação conjunta e o bom desempenho dos produtos essenciais vinculados aos contratos de aluguel.'
  );

  // Slide 7 (Evolução Mensal)
  text = text.replace(
    '<p class="message-text">Locação apresentou evolução positiva e estabilidade acima de R$ 139 mil em fevereiro e março, enquanto Condomínio teve retração após janeiro.</p>',
    '<p class="message-text">Locação apresentou evolução positiva, superando consistentemente a marca de R$ 130 mil mensais em fevereiro e março.</p>'
  );
  text = text.replace(
    'A evolução mensal mostra uma trajetória positiva em Locação, com crescimento relevante de janeiro para fevereiro e manutenção do patamar em março. Em Condomínio, janeiro foi o melhor mês do trimestre, seguido por queda em fevereiro e março, indicando necessidade de ações específicas para retomada de performance.',
    'A evolução mensal mostra uma trajetória robusta. A partir de fevereiro, a vertical estabilizou sua produção em um patamar superior à meta mensal de R$ 130 mil, consolidando o crescimento e compensando oscilações do início do trimestre.'
  );

  // Slide 9 (Atingimento da Meta)
  text = text.replace(
    '<p class="message-text">Locação atingiu 102,6% da meta, enquanto Condomínio atingiu 86,5%.</p>',
    '<p class="message-text">Locação superou o objetivo do trimestre, fechando com 106,5% de atingimento da meta acumulada.</p>'
  );
  text = text.replace(
    'A leitura de atingimento evidencia dois cenários distintos: Locação encerra o quarter acima do objetivo, sustentando o resultado consolidado da parceria; Condomínio, apesar de manter volume relevante, ficou abaixo da meta e deve ser priorizado no plano de aceleração do próximo trimestre.',
    'A leitura de atingimento confirma o excelente momento da operação. Tendo como alvo a meta mensal de R$ 130 mil (R$ 390 mil no Q1), a vertical entregou um resultado superior, garantindo o atingimento integral e gerando excedente de performance graças ao engajamento contínuo das pontas de venda e do Complemento de Meta.'
  );

  // Slide 10 (YoY)
  text = text.replace(
    '<p class="message-text">A performance de 2026 deve ser lida contra a base comparável de 2025, separando o comportamento de Locação e Condomínio.</p>',
    '<p class="message-text">A performance de 2026 mostra um avanço significativo em relação ao mesmo período do ano anterior.</p>'
  );
  text = text.replace(
    'Na leitura Ano a Ano, Locação apresenta crescimento relevante em janeiro e fevereiro, com destaque para fevereiro, que cresceu R$ 45,7 mil frente ao mesmo mês de 2025. Em Condomínio, janeiro apresentou crescimento expressivo, mas fevereiro e março ficaram abaixo do ano anterior, indicando perda de ritmo após o primeiro mês do trimestre.',
    'Na leitura Ano a Ano, a vertical de Locação apresenta crescimento expressivo, com destaque especial para o mês de fevereiro. A evolução consistente frente a 2025 indica ganhos de conversão e maior penetração dos produtos na jornada de contratação do cliente.'
  );

  // Slide 11 (Variação por Mês)
  text = text.replace(
    '<p class="message-text">A variação mensal mostra onde o trimestre ganhou e onde perdeu performance em relação ao ano anterior.</p>',
    '<p class="message-text">O trimestre apresentou ganhos consistentes em todos os meses avaliados na base comparável.</p>'
  );
  text = text.replace(
    'A variação YoY reforça dois movimentos distintos: Locação teve ganho relevante na base comparável, especialmente em fevereiro; Condomínio começou o trimestre com crescimento em janeiro, mas registrou retrações em fevereiro e março. Essa leitura ajuda a direcionar o foco do Q2 para retomada de Condomínio e sustentação do crescimento em Locação.',
    'A variação YoY reforça o movimento de expansão comercial contínua da Locação. Com incrementos mensais sucessivos, a operação atesta o sucesso das iniciativas de incentivo e a robustez dos novos processos operacionais implantados.'
  );

  fs.writeFileSync('../locacao.html', text);
}

function updateCondominio() {
  let text = fs.readFileSync('../condominio.html', 'utf-8');

  // Title
  text = text.replace('<h1 class="slide-title">RESULTADOS Q1 2026</h1>', '<h1 class="slide-title">PERFORMANCE CONDOMÍNIO</h1>');

  // Slide 6 (now just Condomínio)
  text = text.replace(
    '<p class="message-text">O quarter encerrou com R$ 542,9 mil em rebate, com Locação concentrando a maior participação do resultado.</p>',
    '<p class="message-text">A vertical de Condomínio encerrou o trimestre contribuindo com uma fatia importante e estratégica do resultado da parceria.</p>'
  );
  text = text.replace(
    'O resultado consolidado do Q1 reforça a relevância da vertical de Locação como principal motor da parceria, representando aproximadamente 73% do rebate do trimestre. Condomínio responde por cerca de 27% do resultado e permanece como uma frente estratégica com oportunidade de retomada e aceleração nos próximos ciclos.',
    'A vertical de Condomínio representa uma oportunidade expressiva de desenvolvimento. Embora a base geradora seja forte, o resultado no Q1 indica espaço para retomada e aceleração visando uma fatia maior de representatividade nos próximos trimestres.'
  );

  // Slide 7 (Evolução Mensal)
  text = text.replace(
    '<p class="message-text">Locação apresentou evolução positiva e estabilidade acima de R$ 139 mil em fevereiro e março, enquanto Condomínio teve retração após janeiro.</p>',
    '<p class="message-text">O trimestre começou forte em janeiro, seguido por desafios de estabilidade em fevereiro e março.</p>'
  );
  text = text.replace(
    'A evolução mensal mostra uma trajetória positiva em Locação, com crescimento relevante de janeiro para fevereiro e manutenção do patamar em março. Em Condomínio, janeiro foi o melhor mês do trimestre, seguido por queda em fevereiro e março, indicando necessidade de ações específicas para retomada de performance.',
    'A evolução mensal de Condomínio revela que janeiro foi o melhor mês do trimestre, atingindo um patamar elevado. A retração observada nos dois meses seguintes acende um alerta sobre a necessidade de ações táticas e campanhas focadas para estabilizar a produção em torno da meta de R$ 55 mil mensais.'
  );

  // Slide 9 (Atingimento da Meta)
  text = text.replace(
    '<p class="message-text">Locação atingiu 102,6% da meta, enquanto Condomínio atingiu 86,5%.</p>',
    '<p class="message-text">A vertical de Condomínio encerrou o Q1 com 86,5% de atingimento da sua meta estipulada.</p>'
  );
  text = text.replace(
    'A leitura de atingimento evidencia dois cenários distintos: Locação encerra o quarter acima do objetivo, sustentando o resultado consolidado da parceria; Condomínio, apesar de manter volume relevante, ficou abaixo da meta e deve ser priorizado no plano de aceleração do próximo trimestre.',
    'A leitura do atingimento demonstra que a vertical possui um volume relevante de negócios, mas operou abaixo da meta mensal de R$ 55 mil (R$ 165 mil no Q1). Esse cenário posiciona o Condomínio como o foco principal dos esforços de alinhamento e plano de ação operacional para o Q2.'
  );

  // Slide 10 (YoY)
  text = text.replace(
    '<p class="message-text">A performance de 2026 deve ser lida contra a base comparável de 2025, separando o comportamento de Locação e Condomínio.</p>',
    '<p class="message-text">O comparativo de 2026 contra 2025 revela a urgência em revitalizar o volume de prêmios da vertical.</p>'
  );
  text = text.replace(
    'Na leitura Ano a Ano, Locação apresenta crescimento relevante em janeiro e fevereiro, com destaque para fevereiro, que cresceu R$ 45,7 mil frente ao mesmo mês de 2025. Em Condomínio, janeiro apresentou crescimento expressivo, mas fevereiro e março ficaram abaixo do ano anterior, indicando perda de ritmo após o primeiro mês do trimestre.',
    'A leitura Ano a Ano mostra um trimestre desafiador. Apesar de janeiro apresentar crescimento expressivo frente a 2025, os meses de fevereiro e março amargaram quedas em relação ao ano anterior, configurando uma perda de ritmo que deve ser endereçada imediatamente com os times comerciais.'
  );

  // Slide 11 (Variação por Mês)
  text = text.replace(
    '<p class="message-text">A variação mensal mostra onde o trimestre ganhou e onde perdeu performance em relação ao ano anterior.</p>',
    '<p class="message-text">A variação YoY isolada mapeia o momento exato da desaceleração das vendas.</p>'
  );
  text = text.replace(
    'A variação YoY reforça dois movimentos distintos: Locação teve ganho relevante na base comparável, especialmente em fevereiro; Condomínio começou o trimestre com crescimento em janeiro, mas registrou retrações em fevereiro e março. Essa leitura ajuda a direcionar o foco do Q2 para retomada de Condomínio e sustentação do crescimento em Locação.',
    'O gráfico de variação YoY isola a queda nos meses de fevereiro e março. Esses dados balizam as diretrizes do plano de ação e orientam a nova estratégia de priorização: reativar as indicações, revisar processos de renovação e intensificar o engajamento na oferta de seguros para o condomínio.'
  );

  fs.writeFileSync('../condominio.html', text);
}

function updateIndex() {
  let text = fs.readFileSync('../index.html', 'utf-8');

  // Since Locação went from 102.6% to 106.5% due to the AC + 15k, let's update that text if it's there
  text = text.replace('Locação atingiu 102,6% da meta', 'Locação atingiu 106,5% da meta');
  
  // Total Parceria Meta might have changed!
  // Old Meta = 555.0k, Old Real = 542.9k. New Real = 542.9 + 15.1 = 558.0k (100.5%)
  text = text.replace('R$ 542,9k', 'R$ 558,0k');
  text = text.replace('97.8%', '100.5%');
  text = text.replace('R$ 400,1k', 'R$ 415,3k');
  text = text.replace('102.6%', '106.5%');
  text = text.replace('O quarter encerrou com R$ 542,9 mil em rebate', 'O quarter encerrou com R$ 558,0 mil em rebate');

  fs.writeFileSync('../index.html', text);
}

try {
  updateLocacao();
  updateCondominio();
  updateIndex();
  console.log('Textual updates complete!');
} catch(e) {
  console.error(e);
}
