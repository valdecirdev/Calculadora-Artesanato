// Guia de Pontos Básicos - Isolado e independente

const pontosGuia = {
    'ponto-atras': {
        nome: 'Ponto Atrás',
        descricao: 'Ideal para contornos e linhas retas. Cria uma linha contínua e uniforme.',
        dificuldade: 'Fácil',
        quandoUsar: 'Contornos, letras, linhas retas e curvas suaves.',
        passoAPasso: [
            '1. Faça o primeiro ponto saindo do ponto A e entrando no ponto B.',
            '2. Volte a agulha saindo no ponto C (um pouco à frente de B).',
            '3. Entre novamente no ponto B (ou próximo a ele).',
            '4. Continue esse movimento, sempre indo para frente e voltando para trás.',
            '5. Mantenha os pontos do mesmo tamanho para um resultado uniforme.'
        ],
        dicas: [
            'Mantenha a tensão do fio uniforme.',
            'Para linhas curvas, faça pontos menores.',
            'Use para bordar letras e números.',
            'Ideal para contornos de desenhos.'
        ]
    },
    'ponto-cheio': {
        nome: 'Ponto Cheio',
        descricao: 'Preenche áreas com pontos paralelos e uniformes. Perfeito para preencher formas.',
        dificuldade: 'Médio',
        quandoUsar: 'Preencher formas, folhas, pétalas, áreas coloridas.',
        passoAPasso: [
            '1. Trace o contorno da área que deseja preencher.',
            '2. Comece de um lado e faça pontos paralelos.',
            '3. Os pontos devem ficar bem próximos uns dos outros.',
            '4. Mantenha todos os pontos na mesma direção.',
            '5. Preencha toda a área de forma uniforme.',
            '6. Para áreas grandes, trabalhe em seções.'
        ],
        dicas: [
            'Use pontos bem próximos para evitar espaços vazios.',
            'Mantenha a direção dos pontos consistente.',
            'Para áreas grandes, divida em seções menores.',
            'Ajuste o tamanho dos pontos conforme a área.'
        ]
    },
    'ponto-corrente': {
        nome: 'Ponto Corrente',
        descricao: 'Cria uma linha de elos encadeados. Muito versátil e decorativo.',
        dificuldade: 'Fácil',
        quandoUsar: 'Contornos decorativos, hastes de flores, bordas, linhas curvas.',
        passoAPasso: [
            '1. Faça o primeiro ponto saindo do ponto A.',
            '2. Mantenha o fio solto formando uma alça.',
            '3. Entre novamente no ponto A (ou próximo).',
            '4. Saia no ponto B (dentro da alça formada).',
            '5. Puxe o fio para formar o primeiro elo.',
            '6. Repita o processo para formar a corrente.'
        ],
        dicas: [
            'Mantenha os elos do mesmo tamanho.',
            'Não puxe muito o fio para não apertar demais.',
            'Ideal para hastes de flores e contornos.',
            'Pode ser usado para preencher áreas também.'
        ]
    },
    'ponto-haste': {
        nome: 'Ponto Haste',
        descricao: 'Cria uma linha torcida e elegante. Perfeito para hastes e contornos suaves.',
        dificuldade: 'Médio',
        quandoUsar: 'Hastes de flores, contornos curvos, linhas decorativas.',
        passoAPasso: [
            '1. Faça o primeiro ponto saindo do ponto A.',
            '2. Entre no ponto B (um pouco à frente).',
            '3. Saia no ponto C (no meio entre A e B, ligeiramente deslocado).',
            '4. Continue sempre mantendo o ponto seguinte no meio do anterior.',
            '5. Mantenha a linha sempre do mesmo lado (direita ou esquerda).'
        ],
        dicas: [
            'Mantenha sempre o mesmo lado para a linha torcida.',
            'Pontos menores criam linhas mais suaves.',
            'Ideal para hastes e contornos curvos.',
            'Pratique mantendo a consistência do lado.'
        ]
    },
    'ponto-no-frances': {
        nome: 'Ponto Nó Francês',
        descricao: 'Cria pequenos nós decorativos. Perfeito para detalhes e texturas.',
        dificuldade: 'Médio',
        quandoUsar: 'Centros de flores, texturas, detalhes decorativos, olhos de animais.',
        passoAPasso: [
            '1. Saia com a agulha no ponto onde quer o nó.',
            '2. Envolva o fio ao redor da agulha 1-3 vezes.',
            '3. Mantenha as voltas próximas ao tecido.',
            '4. Entre novamente próximo ao ponto de saída.',
            '5. Puxe a agulha mantendo as voltas no lugar.',
            '6. Puxe o fio até formar o nó.'
        ],
        dicas: [
            'Mais voltas = nó maior (cuidado para não exagerar).',
            'Mantenha a tensão uniforme ao puxar.',
            'Ideal para centros de flores e detalhes.',
            'Pratique o número de voltas para o tamanho desejado.'
        ]
    },
    'ponto-folha': {
        nome: 'Ponto Folha',
        descricao: 'Cria o formato de uma folha. Perfeito para bordar folhas e pétalas.',
        dificuldade: 'Médio',
        quandoUsar: 'Folhas, pétalas de flores, formas ovais e arredondadas.',
        passoAPasso: [
            '1. Trace o contorno da folha no tecido.',
            '2. Comece do centro da base da folha.',
            '3. Faça pontos em leque, saindo do centro.',
            '4. Os pontos devem seguir o formato da folha.',
            '5. Preencha toda a área mantendo o formato.',
            '6. Termine no centro do topo da folha.'
        ],
        dicas: [
            'Use pontos menores nas bordas.',
            'Mantenha o formato da folha durante o preenchimento.',
            'Pode combinar com ponto haste para o caule.',
            'Ideal para flores e plantas.'
        ]
    },
    'ponto-margarida': {
        nome: 'Ponto Margarida',
        descricao: 'Cria pétalas em forma de margarida. Muito decorativo e charmoso.',
        dificuldade: 'Fácil',
        quandoUsar: 'Flores, decorações, bordas decorativas, motivos florais.',
        passoAPasso: [
            '1. Faça um ponto corrente pequeno no centro.',
            '2. Saia do centro e faça um ponto longo saindo.',
            '3. Entre novamente próximo ao centro.',
            '4. Isso forma uma pétala.',
            '5. Repita ao redor do centro para formar a flor.',
            '6. Faça 5-8 pétalas ao redor.'
        ],
        dicas: [
            'Mantenha as pétalas do mesmo tamanho.',
            'Distribua as pétalas uniformemente ao redor.',
            'Pode variar as cores das pétalas.',
            'Ideal para bordados florais simples.'
        ]
    },
    'ponto-cruz': {
        nome: 'Ponto Cruz',
        descricao: 'Cria pequenos X. Muito usado em ponto cruz, mas também em bordado livre.',
        dificuldade: 'Fácil',
        quandoUsar: 'Preencher áreas, criar texturas, bordados geométricos.',
        passoAPasso: [
            '1. Faça um ponto diagonal de cima esquerda para baixo direita.',
            '2. Saia próximo e faça outro ponto diagonal.',
            '3. Complete o X fazendo o ponto oposto.',
            '4. Todos os pontos devem ter a mesma direção.',
            '5. Mantenha os X uniformes e alinhados.',
            '6. Para áreas grandes, trabalhe em linhas.'
        ],
        dicas: [
            'Mantenha todos os X na mesma direção.',
            'Pontos uniformes criam melhor resultado.',
            'Ideal para preencher áreas grandes.',
            'Pode ser usado para criar padrões.'
        ]
    }
};

function initGuiaPontos() {
    const seletor = document.getElementById('seletor-ponto');
    const conteudoDiv = document.getElementById('conteudo-ponto');
    
    if (seletor) {
        seletor.addEventListener('change', function() {
            const pontoSelecionado = this.value;
            if (pontoSelecionado && pontosGuia[pontoSelecionado]) {
                exibirPonto(pontosGuia[pontoSelecionado]);
            } else {
                conteudoDiv.innerHTML = '';
            }
        });
    }
}

function exibirPonto(ponto) {
    const conteudoDiv = document.getElementById('conteudo-ponto');
    
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
                <small>
                    <strong>Dica Geral:</strong> Pratique cada ponto em um pedaço de tecido antes de usar no seu projeto final. 
                    A consistência vem com a prática!
                </small>
            </div>
        </div>
    `;
}

