// Guia de Pontos para Feltro - Isolado e independente

const pontosFeltro = {
    'ponto-invisivel': {
        nome: 'Ponto Invisível',
        descricao: 'Ideal para fechar peças de feltro sem deixar marcas visíveis. Perfeito para acabamento profissional.',
        dificuldade: 'Médio',
        quandoUsar: 'Fechar peças, unir partes, acabamento final de bichos de pelúcia e peças decorativas.',
        passoAPasso: [
            '1. Alinhe as duas peças de feltro que deseja unir.',
            '2. Insira a agulha pelo lado interno de uma peça.',
            '3. Saia pela borda, pegando apenas algumas fibras do feltro.',
            '4. Entre na outra peça, também pegando apenas algumas fibras.',
            '5. Continue alternando entre as peças.',
            '6. Mantenha os pontos pequenos e próximos.',
            '7. Puxe o fio com cuidado para não deixar marcas.'
        ],
        dicas: [
            'Use fio da mesma cor do feltro para ficar invisível.',
            'Pontos pequenos são mais discretos.',
            'Não puxe muito o fio para não criar marcas.',
            'Ideal para peças que serão vistas de ambos os lados.'
        ]
    },
    'ponto-chuleado': {
        nome: 'Ponto Chuleado',
        descricao: 'Ponto decorativo que cria uma borda bonita com alças. Muito usado em bordas de feltro e acabamentos.',
        dificuldade: 'Fácil',
        quandoUsar: 'Bordas decorativas, acabamento de bordas, decoração de peças, cobertores e mantas.',
        passoAPasso: [
            '1. Faça um ponto saindo do feltro.',
            '2. Crie uma alça com o fio.',
            '3. Entre novamente próximo ao ponto anterior.',
            '4. Saia um pouco à frente, passando a agulha pela alça.',
            '5. Puxe para formar o ponto chuleado.',
            '6. Continue com espaçamento uniforme.'
        ],
        dicas: [
            'Mantenha os pontos do mesmo tamanho.',
            'Espaçamento uniforme cria melhor resultado.',
            'Pode ser usado em cores contrastantes.',
            'Ideal para bordas de cobertores e mantas.',
            'Também conhecido como ponto blanket.'
        ]
    },
    'ponto-caseado': {
        nome: 'Ponto Caseado',
        descricao: 'Ponto decorativo que envolve a borda criando um acabamento elegante. Muito usado em peças de feltro.',
        dificuldade: 'Fácil',
        quandoUsar: 'Bordas decorativas, acabamento de peças, união de partes com acabamento visível.',
        passoAPasso: [
            '1. Saia com a agulha pela borda do feltro.',
            '2. Envolva a borda com o fio formando uma alça.',
            '3. Entre novamente próximo ao ponto anterior.',
            '4. Saia à frente passando pela alça.',
            '5. Continue envolvendo a borda.',
            '6. Mantenha os pontos próximos e uniformes.'
        ],
        dicas: [
            'Pontos próximos criam acabamento mais elegante.',
            'Use fio resistente para maior durabilidade.',
            'Muito decorativo e funcional.',
            'Ideal para peças que precisam de acabamento bonito.'
        ]
    },
    'ponto-palito': {
        nome: 'Ponto Palito',
        descricao: 'Ponto que envolve a borda do feltro de forma simples, protegendo e decorando ao mesmo tempo.',
        dificuldade: 'Fácil',
        quandoUsar: 'Bordas de feltro, união de peças, acabamento simples e funcional.',
        passoAPasso: [
            '1. Saia com a agulha pela borda do feltro.',
            '2. Envolva a borda com o fio.',
            '3. Entre novamente próximo ao ponto anterior.',
            '4. Continue envolvendo a borda.',
            '5. Mantenha os pontos próximos e uniformes.',
            '6. Os pontos ficam como "palitinhos" na borda.'
        ],
        dicas: [
            'Pontos próximos protegem melhor a borda.',
            'Use fio resistente para maior durabilidade.',
            'Simples e rápido de fazer.',
            'Ideal para bordas que serão muito manipuladas.',
            'Também conhecido como ponto overcast.'
        ]
    },
    'ponto-espinha': {
        nome: 'Ponto Espinha',
        descricao: 'Ponto que cria um padrão em zigue-zague. Muito decorativo e resistente para unir peças.',
        dificuldade: 'Médio',
        quandoUsar: 'União de peças com acabamento decorativo, costuras visíveis que precisam ser resistentes.',
        passoAPasso: [
            '1. Alinhe as duas peças de feltro.',
            '2. Faça um ponto horizontal de um lado para o outro.',
            '3. Volte fazendo outro ponto horizontal na direção oposta.',
            '4. Continue alternando os lados.',
            '5. Os pontos formam um padrão em zigue-zague.',
            '6. Mantenha espaçamento uniforme.'
        ],
        dicas: [
            'Cria um padrão decorativo interessante.',
            'Muito resistente para unir peças.',
            'Ideal para peças que precisam de costura forte.',
            'Pode ser usado com fio colorido para decoração.',
            'Também conhecido como ponto ladder ou ponto escada.'
        ]
    }
};

function initGuiaPontosFeltro() {
    const seletor = document.getElementById('seletor-ponto-feltro');
    const conteudoDiv = document.getElementById('conteudo-ponto-feltro');
    
    if (seletor) {
        seletor.addEventListener('change', function() {
            const pontoSelecionado = this.value;
            if (pontoSelecionado && pontosFeltro[pontoSelecionado]) {
                exibirPontoFeltro(pontosFeltro[pontoSelecionado]);
            } else {
                conteudoDiv.innerHTML = '';
            }
        });
    }
}

function exibirPontoFeltro(ponto) {
    const conteudoDiv = document.getElementById('conteudo-ponto-feltro');
    
    const dificuldadeClass = {
        'Fácil': 'success',
        'Médio': 'warning',
        'Difícil': 'danger'
    };
    
    const badgeClass = dificuldadeClass[ponto.dificuldade] || 'secondary';
    
    conteudoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-book me-2"></i>${ponto.nome}</h5>
            
            <div class="mb-3">
                <span class="badge bg-${badgeClass}">${ponto.dificuldade}</span>
            </div>
            
            <div class="mb-3">
                <strong>Descrição:</strong>
                <p class="mb-0">${ponto.descricao}</p>
            </div>
            
            <div class="mb-3">
                <strong>Quando Usar:</strong>
                <p class="mb-0">${ponto.quandoUsar}</p>
            </div>
            
            <div class="mb-3">
                <strong><i class="fas fa-list-ol me-2"></i>Passo a Passo:</strong>
                <ol class="mt-2">
                    ${ponto.passoAPasso.map(passo => `<li>${passo}</li>`).join('')}
                </ol>
            </div>
            
            <div class="mb-3">
                <strong><i class="fas fa-lightbulb me-2"></i>Dicas:</strong>
                <ul class="mt-2">
                    ${ponto.dicas.map(dica => `<li>${dica}</li>`).join('')}
                </ul>
            </div>
            
            <div class="alert alert-info mt-3">
                <i class="fas fa-info-circle me-2"></i>
                <strong>Dicas Gerais para Trabalhar com Feltro:</strong>
                <ul class="small mt-2 mb-0">
                    <li><strong>Prática:</strong> Pratique cada ponto em pedaços de feltro antes de usar no seu projeto final.</li>
                    <li><strong>Fio:</strong> Use fio de algodão ou poliéster de boa qualidade. Fio muito fino pode se quebrar.</li>
                    <li><strong>Agulha:</strong> Use agulha de tamanho médio. Muito fina pode deixar buracos grandes no feltro.</li>
                    <li><strong>Tensão:</strong> Mantenha a tensão do fio uniforme. Muito apertado pode deformar o feltro.</li>
                    <li><strong>Cor do fio:</strong> Para pontos invisíveis, use fio da mesma cor. Para pontos decorativos, use cores contrastantes.</li>
                    <li><strong>Consistência:</strong> A consistência vem com a prática! Não desanime se não sair perfeito na primeira vez.</li>
                </ul>
            </div>
            
            <div class="mt-3">
                <strong><i class="fas fa-tools me-2"></i>Materiais Recomendados:</strong>
                <ul class="small mt-2 mb-0">
                    <li><strong>Fio:</strong> Linha de algodão ou poliéster (DMC, Anchor, ou similar)</li>
                    <li><strong>Agulha:</strong> Agulha de costura tamanho médio (entre 5-8)</li>
                    <li><strong>Feltro:</strong> Feltro de boa qualidade (100% lã ou acrílico de alta densidade)</li>
                    <li><strong>Tesoura:</strong> Tesoura afiada para cortes precisos</li>
                    <li><strong>Alfinetes:</strong> Para manter as peças alinhadas durante a costura</li>
                </ul>
            </div>
        </div>
    `;
}

