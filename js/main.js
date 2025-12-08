// Main JavaScript - Gerencia a navegação e modais das ferramentas

document.addEventListener('DOMContentLoaded', function() {
    const toolCards = document.querySelectorAll('.tool-card');
    const modal = new bootstrap.Modal(document.getElementById('toolModal'));
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    // Mapeamento de ferramentas
    const tools = {
        'precificacao': {
            title: 'Calculadora de Precificação',
            content: getPrecificacaoHTML()
        },
        'custo-fio': {
            title: 'Calculadora de Custo por Fio',
            content: getCustoFioHTML()
        },
        'conversor-medidas': {
            title: 'Conversor de Medidas',
            content: getConversorMedidasHTML()
        },
        'calculadora-tempo': {
            title: 'Calculadora de Tempo',
            content: getCalculadoraTempoHTML()
        },
        'calculadora-tecido': {
            title: 'Calculadora de Tecido',
            content: getCalculadoraTecidoHTML()
        },
        'calculadora-bastidor': {
            title: 'Calculadora de Pano para Bastidor',
            content: getCalculadoraBastidorHTML()
        },
        'guia-pontos': {
            title: 'Guia de Pontos Básicos',
            content: getGuiaPontosHTML()
        }
    };

    // Adiciona evento de clique nos cards
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            const toolName = this.getAttribute('data-tool');
            if (tools[toolName]) {
                modalTitle.textContent = tools[toolName].title;
                modalBody.innerHTML = tools[toolName].content;
                modal.show();
                
                // Inicializa a ferramenta específica após abrir o modal
                setTimeout(() => {
                    initializeTool(toolName);
                    configurarInputsBrasileiros(toolName);
                }, 100);
            }
        });
    });

    // Função para inicializar cada ferramenta
    function initializeTool(toolName) {
        switch(toolName) {
            case 'precificacao':
                if (typeof initPrecificacao === 'function') {
                    initPrecificacao();
                }
                break;
            case 'custo-fio':
                if (typeof initCustoFio === 'function') {
                    initCustoFio();
                }
                break;
            case 'conversor-medidas':
                if (typeof initConversorMedidas === 'function') {
                    initConversorMedidas();
                }
                break;
            case 'calculadora-tempo':
                if (typeof initCalculadoraTempo === 'function') {
                    initCalculadoraTempo();
                }
                break;
            case 'calculadora-tecido':
                if (typeof initCalculadoraTecido === 'function') {
                    initCalculadoraTecido();
                }
                break;
            case 'calculadora-bastidor':
                if (typeof initCalculadoraBastidor === 'function') {
                    initCalculadoraBastidor();
                }
                break;
            case 'guia-pontos':
                if (typeof initGuiaPontos === 'function') {
                    initGuiaPontos();
                }
                break;
        }
    }

    // Funções para retornar HTML de cada ferramenta
    function getPrecificacaoHTML() {
        return `
            <div id="precificacao-container">
                <div class="mb-4">
                    <h6 class="mb-3">Custos do Produto</h6>
                    <div class="mb-3">
                        <label class="form-label">Custo dos Insumos (R$)</label>
                        <input type="text" id="custo-insumos" class="form-control" step="0.01" min="0" placeholder="0,00" inputmode="decimal">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Custo de Mão de Obra (R$)</label>
                        <input type="text" id="custo-mao-obra" class="form-control" step="0.01" min="0" placeholder="0,00" inputmode="decimal">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Outros Custos (R$)</label>
                        <input type="text" id="outros-custos" class="form-control" step="0.01" min="0" placeholder="0,00" value="0" inputmode="decimal">
                    </div>
                </div>

                <div class="mb-4">
                    <h6 class="mb-3">Método de Cálculo</h6>
                    <div class="mb-3">
                        <label class="form-label">Escolha o método:</label>
                        <select id="metodo-calculo" class="form-select">
                            <option value="markup">Mark-up (Multiplicador)</option>
                            <option value="margem">Margem de Lucro (%)</option>
                            <option value="preco-mercado">Preço de Mercado</option>
                        </select>
                    </div>
                    <div id="campo-metodo" class="mb-3">
                        <label class="form-label" id="label-metodo">Mark-up (ex: 2,5 para 150% de lucro)</label>
                        <input type="text" id="valor-metodo" class="form-control" step="0.01" min="0" placeholder="0,00" inputmode="decimal">
                    </div>
                </div>

                <button class="btn btn-calculate" onclick="calcularPrecificacao()">
                    <i class="fas fa-calculator me-2"></i>Calcular Preço
                </button>

                <div id="resultado-precificacao"></div>
            </div>
        `;
    }

    function getCustoFioHTML() {
        return `
            <div id="custo-fio-container">
                <div class="mb-3">
                    <label class="form-label">Tamanho da meada em metros</label>
                    <input type="text" id="tamanho-meada" class="form-control" step="0.01" min="0" placeholder="8,00" inputmode="decimal">
                </div>
                <div class="mb-3">
                    <label class="form-label">Quantidade de fios na meada</label>
                    <input type="text" id="quantidade-fios" class="form-control" step="1" min="1" placeholder="6" inputmode="numeric">
                </div>
                <div class="mb-3">
                    <label class="form-label">Preço da meada (R$)</label>
                    <input type="text" id="preco-meada" class="form-control" step="0.01" min="0" placeholder="4,00" inputmode="decimal">
                </div>
                <div class="mb-3">
                    <label class="form-label">Comprimento utilizado por fio (cm)</label>
                    <input type="text" id="comprimento-fio" class="form-control" step="0.01" min="0" placeholder="68,00" inputmode="decimal">
                </div>

                <button class="btn btn-calculate" onclick="calcularCustoFio()">
                    <i class="fas fa-calculator me-2"></i>Calcular Custo
                </button>

                <div id="resultado-custo-fio"></div>
            </div>
        `;
    }

    function getConversorMedidasHTML() {
        return `
            <div id="conversor-medidas-container">
                <div class="mb-3">
                    <label class="form-label">Valor</label>
                    <input type="text" id="valor-converter" class="form-control" step="0.01" placeholder="0,00" inputmode="decimal">
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">De</label>
                        <select id="unidade-origem" class="form-select">
                            <option value="cm">Centímetros (cm)</option>
                            <option value="m">Metros (m)</option>
                            <option value="mm">Milímetros (mm)</option>
                            <option value="pol">Polegadas (pol)</option>
                        </select>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Para</label>
                        <select id="unidade-destino" class="form-select">
                            <option value="cm">Centímetros (cm)</option>
                            <option value="m">Metros (m)</option>
                            <option value="mm">Milímetros (mm)</option>
                            <option value="pol">Polegadas (pol)</option>
                        </select>
                    </div>
                </div>

                <button class="btn btn-calculate" onclick="converterMedida()">
                    <i class="fas fa-exchange-alt me-2"></i>Converter
                </button>

                <div id="resultado-conversor"></div>
            </div>
        `;
    }

    function getCalculadoraTempoHTML() {
        return `
            <div id="calculadora-tempo-container">
                <div class="mb-3">
                    <label class="form-label">Tempo de trabalho (horas)</label>
                    <input type="text" id="tempo-trabalho" class="form-control" step="0.01" min="0" placeholder="2,5" inputmode="decimal">
                </div>
                <div class="mb-3">
                    <label class="form-label">Valor da hora de trabalho (R$)</label>
                    <input type="text" id="valor-hora" class="form-control" step="0.01" min="0" placeholder="20,00" inputmode="decimal">
                </div>
                <div class="mb-3">
                    <label class="form-label">Quantidade de peças produzidas</label>
                    <input type="text" id="quantidade-pecas" class="form-control" step="1" min="1" placeholder="1" value="1" inputmode="numeric">
                </div>

                <button class="btn btn-calculate" onclick="calcularTempo()">
                    <i class="fas fa-clock me-2"></i>Calcular
                </button>

                <div id="resultado-tempo"></div>
            </div>
        `;
    }

    function getCalculadoraTecidoHTML() {
        return `
            <div id="calculadora-tecido-container">
                <div class="mb-4">
                    <h6 class="mb-3">Dimensões do Tecido Disponível</h6>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Largura (cm)</label>
                            <input type="text" id="largura-tecido" class="form-control" step="0.01" min="0" placeholder="100,00" inputmode="decimal">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Altura (cm)</label>
                            <input type="text" id="altura-tecido" class="form-control" step="0.01" min="0" placeholder="100,00" inputmode="decimal">
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h6 class="mb-3">Dimensões Necessárias por Peça</h6>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Largura necessária (cm)</label>
                            <input type="text" id="largura-peca" class="form-control" step="0.01" min="0" placeholder="30,00" inputmode="decimal">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Altura necessária (cm)</label>
                            <input type="text" id="altura-peca" class="form-control" step="0.01" min="0" placeholder="25,00" inputmode="decimal">
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h6 class="mb-3">Configurações Adicionais</h6>
                    <div class="mb-3">
                        <label class="form-label">Número de camadas por peça</label>
                        <input type="text" id="numero-camadas" class="form-control" step="1" min="1" placeholder="1" value="1" inputmode="numeric">
                        <div class="form-text">Quantas camadas de tecido você precisa para cada peça?</div>
                    </div>
                </div>

                <button class="btn btn-calculate" onclick="calcularTecido()">
                    <i class="fas fa-calculator me-2"></i>Calcular
                </button>

                <div id="resultado-tecido"></div>
            </div>
        `;
    }

    function getCalculadoraBastidorHTML() {
        return `
            <div id="calculadora-bastidor-container">
                <div class="mb-4">
                    <h6 class="mb-3">Dimensões do Bastidor</h6>
                    <div class="mb-3">
                        <label class="form-label">Diâmetro do bastidor (cm)</label>
                        <input type="text" id="diametro-bastidor" class="form-control" step="0.01" min="0" placeholder="20,00" inputmode="decimal">
                        <div class="form-text">O bastidor é redondo, então informe apenas o diâmetro</div>
                    </div>
                </div>

                <div class="mb-4">
                    <h6 class="mb-3">Margem Necessária</h6>
                    <div class="mb-3">
                        <label class="form-label">Margem de trabalho/acabamento (cm)</label>
                        <input type="text" id="margem-trabalho-acabamento" class="form-control" step="0.01" min="0" placeholder="5,00" value="5,00" inputmode="decimal">
                        <div class="form-text">Espaço extra necessário ao redor do bastidor para trabalhar durante o bordado e fazer o acabamento final</div>
                    </div>
                </div>

                <button class="btn btn-calculate" onclick="calcularBastidor()">
                    <i class="fas fa-calculator me-2"></i>Calcular Tamanho do Pano
                </button>

                <div id="resultado-bastidor"></div>
            </div>
        `;
    }

    function getGuiaPontosHTML() {
        return `
            <div id="guia-pontos-container">
                <div class="mb-4">
                    <p class="text-muted">Selecione um ponto para ver as instruções detalhadas:</p>
                    <select id="seletor-ponto" class="form-select mb-3">
                        <option value="">Selecione um ponto...</option>
                        <option value="ponto-atras">Ponto Atrás</option>
                        <option value="ponto-cheio">Ponto Cheio</option>
                        <option value="ponto-corrente">Ponto Corrente</option>
                        <option value="ponto-haste">Ponto Haste</option>
                        <option value="ponto-no-frances">Ponto Nó Francês</option>
                        <option value="ponto-folha">Ponto Folha</option>
                        <option value="ponto-margarida">Ponto Margarida</option>
                        <option value="ponto-cruz">Ponto Cruz</option>
                    </select>
                </div>

                <div id="conteudo-ponto"></div>
            </div>
        `;
    }

    // Configura todos os inputs de uma ferramenta para aceitar vírgula
    function configurarInputsBrasileiros(toolName) {
        const inputIds = {
            'precificacao': ['custo-insumos', 'custo-mao-obra', 'outros-custos', 'valor-metodo'],
            'custo-fio': ['tamanho-meada', 'quantidade-fios', 'preco-meada', 'comprimento-fio'],
            'conversor-medidas': ['valor-converter'],
            'calculadora-tempo': ['tempo-trabalho', 'valor-hora', 'quantidade-pecas'],
            'calculadora-tecido': ['largura-tecido', 'altura-tecido', 'largura-peca', 'altura-peca', 'numero-camadas'],
            'calculadora-bastidor': ['diametro-bastidor', 'margem-trabalho-acabamento']
        };
        
        const ids = inputIds[toolName] || [];
        ids.forEach(id => {
            if (typeof configurarInputBrasileiro === 'function') {
                configurarInputBrasileiro(id);
            }
        });
    }
});

