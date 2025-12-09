// Main JavaScript para módulo de Bordado

const BordadoModule = {
    tools: {},

    init: function () {
        this.loadTools();
        this.setupEventListeners();
    },

    loadTools: function () {
        this.tools = {
            'precificacao': {
                id: 'precificacao',
                title: 'Calculadora de Precificação',
                content: this.getPrecificacaoHTML(),
                module: 'bordado'
            },
            'custo-fio': {
                id: 'custo-fio',
                title: 'Calculadora de Custo por Fio',
                content: this.getCustoFioHTML(),
                module: 'bordado'
            },
            'conversor-medidas': {
                id: 'conversor-medidas',
                title: 'Conversor de Medidas',
                content: this.getConversorMedidasHTML(),
                module: 'bordado'
            },
            'calculadora-tempo': {
                id: 'calculadora-tempo',
                title: 'Calculadora de Tempo',
                content: this.getCalculadoraTempoHTML(),
                module: 'bordado'
            },
            'calculadora-tecido': {
                id: 'calculadora-tecido',
                title: 'Calculadora de Tecido',
                content: this.getCalculadoraTecidoHTML(),
                module: 'bordado'
            },
            'calculadora-bastidor': {
                id: 'calculadora-bastidor',
                title: 'Calculadora de Pano para Bastidor',
                content: this.getCalculadoraBastidorHTML(),
                module: 'bordado'
            },
            'guia-pontos': {
                id: 'guia-pontos',
                title: 'Guia de Pontos Básicos',
                content: this.getGuiaPontosHTML(),
                module: 'bordado'
            },
            'conversor-hex': {
                id: 'conversor-hex',
                title: 'Conversor de Hexadecimal',
                content: this.getConversorHexHTML(),
                module: 'bordado'
            },
            'conversor-rgb': {
                id: 'conversor-rgb',
                title: 'Conversor de RGB',
                content: this.getConversorRGBHTML(),
                module: 'bordado'
            },
            'conversor-linhas': {
                id: 'conversor-linhas',
                title: 'Conversor entre Linhas',
                content: this.getConversorLinhasHTML(),
                module: 'bordado'
            },
            'checklist-projeto': {
                id: 'checklist-projeto',
                title: 'Checklist de Início de Projeto',
                content: this.getChecklistProjetoHTML(),
                module: 'bordado'
            },
            'calculadora-aida': {
                id: 'calculadora-aida',
                title: 'Calculadora de Tecido Aida (Ponto Cruz)',
                content: this.getCalculadoraAidaHTML(),
                module: 'bordado'
            },
            'paleta-cores': {
                id: 'paleta-cores',
                title: 'Gerador de Paleta de Cores',
                content: this.getPaletaCoresHTML(),
                module: 'bordado'
            }
        };
    },

    setupEventListeners: function () {
        const toolCards = document.querySelectorAll('.tool-card[data-module="bordado"]');
        toolCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const toolName = card.getAttribute('data-tool');
                if (this.tools[toolName]) {
                    App.openTool(this.tools[toolName]);
                }
            });
        });
    },

    initializeTool: function (toolName) {
        switch (toolName) {
            case 'precificacao':
                if (typeof initPrecificacao === 'function') initPrecificacao();
                break;
            case 'custo-fio':
                if (typeof initCustoFio === 'function') initCustoFio();
                break;
            case 'conversor-medidas':
                if (typeof initConversorMedidas === 'function') initConversorMedidas();
                break;
            case 'calculadora-tempo':
                if (typeof initCalculadoraTempo === 'function') initCalculadoraTempo();
                break;
            case 'calculadora-tecido':
                if (typeof initCalculadoraTecido === 'function') initCalculadoraTecido();
                break;
            case 'calculadora-bastidor':
                if (typeof initCalculadoraBastidor === 'function') initCalculadoraBastidor();
                break;
            case 'guia-pontos':
                if (typeof initGuiaPontos === 'function') initGuiaPontos();
                break;
            case 'conversor-hex':
                if (typeof initConversorHex === 'function') initConversorHex();
                break;
            case 'conversor-rgb':
                if (typeof initConversorRGB === 'function') initConversorRGB();
                break;
            case 'conversor-linhas':
                if (typeof initConversorLinhas === 'function') initConversorLinhas();
                break;
            case 'checklist-projeto':
                if (typeof initChecklistProjeto === 'function') initChecklistProjeto();
                break;
            case 'calculadora-aida':
                if (typeof initCalculadoraAida === 'function') initCalculadoraAida();
                break;
            case 'paleta-cores':
                if (typeof initPaletaCores === 'function') initPaletaCores();
                break;
        }
    },

    configurarInputs: function (toolName) {
        const inputIds = {
            'precificacao': ['custo-insumos', 'custo-mao-obra', 'outros-custos', 'valor-metodo'],
            'custo-fio': ['tamanho-meada', 'quantidade-fios', 'preco-meada', 'comprimento-fio'],
            'conversor-medidas': ['valor-converter'],
            'calculadora-tempo': ['tempo-trabalho', 'valor-hora', 'quantidade-pecas'],
            'calculadora-tecido': ['largura-tecido', 'altura-tecido', 'largura-peca', 'altura-peca', 'numero-camadas'],
            'calculadora-bastidor': ['diametro-bastidor', 'margem-trabalho-acabamento'],
            'calculadora-aida': ['margem-aida']
        };

        const ids = inputIds[toolName] || [];
        ids.forEach(id => {
            if (typeof configurarInputBrasileiro === 'function') {
                configurarInputBrasileiro(id);
            }
        });
    },

    // Funções HTML (copiadas do main.js original)
    getPrecificacaoHTML: function () {
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

                    <div class="accordion mb-4" id="accordionDicasFeltro">
                         <div class="accordion-item">
                            <h2 class="accordion-header" id="headingDicasFeltro">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDicasFeltro" aria-expanded="false" aria-controls="collapseDicasFeltro">
                                    <i class="fas fa-lightbulb me-2 text-warning"></i> Entenda os métodos de cálculo
                                </button>
                            </h2>
                            <div id="collapseDicasFeltro" class="accordion-collapse collapse" aria-labelledby="headingDicasFeltro" data-bs-parent="#accordionDicasFeltro">
                                <div class="accordion-body small">
                                    <ul class="mb-0">
                                        <li><strong>Mark-up:</strong> Multiplicador simples sobre o custo. Ex: 2,5x significa que você vende por 2,5 vezes o custo.</li>
                                        <li><strong>Margem:</strong> Percentual de lucro sobre o preço final. Mais preciso para análise financeira.</li>
                                        <li><strong>Preço de Mercado:</strong> Baseado na concorrência. Verifique se cobre seus custos e gera lucro adequado.</li>
                                        <li>Para artesanato, margens entre 40-60% são comuns e saudáveis.</li>
                                        <li>Lembre-se de incluir todos os custos: materiais, tempo, embalagem, marketing, etc.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

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
    },

    getCustoFioHTML: function () {
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
    },

    getConversorMedidasHTML: function () {
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
    },

    getCalculadoraTempoHTML: function () {
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
    },

    getCalculadoraTecidoHTML: function () {
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
    },

    getCalculadoraBastidorHTML: function () {
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
    },

    getGuiaPontosHTML: function () {
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
    },

    getConversorHexHTML: function () {
        return `
            <div id="conversor-hex-container">
                <div class="mb-3">
                    <label class="form-label">Cor Hexadecimal</label>
                    <input type="text" id="hex-input" class="form-control" placeholder="#FF5733 ou FF5733" maxlength="7">
                    <div class="form-text">Digite a cor em formato hexadecimal (com ou sem #)</div>
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="mostrar-descontinuadas-hex" checked>
                        <label class="form-check-label" for="mostrar-descontinuadas-hex">
                            Mostrar cores descontinuadas (Anchor)
                        </label>
                    </div>
                </div>

                <button class="btn btn-calculate" onclick="converterHex()">
                    <i class="fas fa-exchange-alt me-2"></i>Converter
                </button>

                <div id="resultado-conversor-hex"></div>
            </div>
        `;
    },

    getConversorRGBHTML: function () {
        return `
            <div id="conversor-rgb-container">
                <div class="mb-3">
                    <label class="form-label">Valor R (Vermelho)</label>
                    <input type="number" id="rgb-r" class="form-control" min="0" max="255" placeholder="255" inputmode="numeric">
                </div>
                <div class="mb-3">
                    <label class="form-label">Valor G (Verde)</label>
                    <input type="number" id="rgb-g" class="form-control" min="0" max="255" placeholder="87" inputmode="numeric">
                </div>
                <div class="mb-3">
                    <label class="form-label">Valor B (Azul)</label>
                    <input type="number" id="rgb-b" class="form-control" min="0" max="255" placeholder="51" inputmode="numeric">
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="mostrar-descontinuadas-rgb" checked>
                        <label class="form-check-label" for="mostrar-descontinuadas-rgb">
                            Mostrar cores descontinuadas (Anchor)
                        </label>
                    </div>
                </div>

                <button class="btn btn-calculate" onclick="converterRGB()">
                    <i class="fas fa-exchange-alt me-2"></i>Converter
                </button>

                <div id="resultado-conversor-rgb"></div>
            </div>
        `;
    },

    getConversorLinhasHTML: function () {
        return `
            <div id="conversor-linhas-container">
                <div class="mb-3">
                    <label class="form-label">Código da Linha</label>
                    <input type="text" id="codigo-linha" class="form-control" placeholder="Ex: 310" inputmode="numeric">
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Marca de Origem</label>
                        <select id="marca-origem" class="form-select">
                            <option value="">Selecione...</option>
                            <option value="Anchor">Anchor</option>
                            <option value="DMC">DMC</option>
                            <option value="Maxi">Maxi</option>
                        </select>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Marca de Destino</label>
                        <select id="marca-destino" class="form-select">
                            <option value="">Selecione...</option>
                            <option value="Anchor">Anchor</option>
                            <option value="DMC">DMC</option>
                            <option value="Maxi">Maxi</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="mostrar-descontinuadas-linhas" checked>
                        <label class="form-check-label" for="mostrar-descontinuadas-linhas">
                            Mostrar cores descontinuadas (Anchor)
                        </label>
                    </div>
                </div>

                <button class="btn btn-calculate" onclick="converterLinhas()">
                    <i class="fas fa-exchange-alt me-2"></i>Converter
                </button>

                <div id="resultado-conversor-linhas"></div>
            </div>
        `;
    },

    getChecklistProjetoHTML: function () {
        return `
            <div id="checklist-projeto-container">
                <div class="mb-4">
                    <p class="text-muted">Selecione o tipo de projeto que você vai iniciar:</p>
                    <select id="tipo-projeto" class="form-select mb-3">
                        <option value="">Selecione...</option>
                        <option value="bordado-livre">Bordado Livre em Bastidor</option>
                        <option value="ponto-cruz">Ponto Cruz</option>
                        <option value="roupas">Bordado em Roupas/Bonés</option>
                    </select>
                </div>

                <button class="btn btn-calculate" onclick="gerarChecklist()">
                    <i class="fas fa-list-check me-2"></i>Gerar Lista
                </button>

                <div id="resultado-checklist" class="mt-4"></div>
            </div>
        `;
    },

    getCalculadoraAidaHTML: function () {
        return `
            <div id="calculadora-aida-container">
                <div class="mb-4">
                    <h6 class="mb-3">Dimensões do Gráfico</h6>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Largura (em pontos)</label>
                            <input type="number" id="largura-pontos" class="form-control" placeholder="Ex: 150" inputmode="numeric">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Altura (em pontos)</label>
                            <input type="number" id="altura-pontos" class="form-control" placeholder="Ex: 200" inputmode="numeric">
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h6 class="mb-3">Configurações do Tecido</h6>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Count do Tecido (ct)</label>
                            <select id="count-tecido" class="form-control form-select">
                                <option value="14" selected>14 ct (Mais comum)</option>
                                <option value="6">6 ct</option>
                                <option value="8">8 ct</option>
                                <option value="11">11 ct</option>
                                <option value="16">16 ct</option>
                                <option value="18">18 ct</option>
                                <option value="22">22 ct (Hardanger)</option>
                                <option value="25">25 ct</option>
                                <option value="28">28 ct</option>
                                <option value="32">32 ct</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Margem de Segurança (cm)</label>
                            <input type="text" id="margem-aida" class="form-control" placeholder="5,00" value="5,00" inputmode="decimal">
                            <div class="form-text">Margem para cada lado (para moldura)</div>
                        </div>
                    </div>
                </div>

                <button class="btn btn-calculate" onclick="calcularAida()">
                    <i class="fas fa-calculator me-2"></i>Calcular Tamanho
                </button>

                <div id="resultado-aida"></div>
            </div>
        `;
    },

    getPaletaCoresHTML: function () {
        return `
            <div id="paleta-cores-container">
                <div class="mb-4">
                    <h6 class="mb-3">Selecione a Cor Base</h6>
                    <div class="row align-items-end">
                        <div class="col-md-2 mb-3">
                             <input type="color" id="cor-base-input" class="form-control form-control-color w-100" value="#FF5733" title="Escolha a cor">
                        </div>
                        <div class="col-md-10 mb-3">
                            <label class="form-label">Código Hexadecimal</label>
                            <input type="text" id="cor-base-hex" class="form-control" value="#FF5733" maxlength="7" placeholder="#FF5733">
                        </div>
                    </div>
                </div>

                <button class="btn btn-calculate" onclick="gerarPaleta()">
                    <i class="fas fa-palette me-2"></i>Gerar Harmonias
                </button>

                <div id="resultado-paleta" class="mt-4"></div>
            </div>
        `;
    }
};

