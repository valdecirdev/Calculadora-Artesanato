// Main JavaScript para módulo de Feltro

const FeltroModule = {
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
                module: 'feltro'
            },
            'quantidade-feltro': {
                id: 'quantidade-feltro',
                title: 'Calculadora de Quantidade de Feltro',
                content: this.getQuantidadeFeltroHTML(),
                module: 'feltro'
            },
            'conversor-medidas': {
                id: 'conversor-medidas',
                title: 'Conversor de Medidas',
                content: this.getConversorMedidasHTML(),
                module: 'feltro'
            },
            'calculadora-tempo': {
                id: 'calculadora-tempo',
                title: 'Calculadora de Tempo',
                content: this.getCalculadoraTempoHTML(),
                module: 'feltro'
            },
            'calculadora-enchimento': {
                id: 'calculadora-enchimento',
                title: 'Calculadora de Enchimento',
                content: this.getCalculadoraEnchimentoHTML(),
                module: 'feltro'
            },
            'calculadora-padrao': {
                id: 'calculadora-padrao',
                title: 'Redimensionador de Padrões',
                content: this.getCalculadoraPadraoHTML(),
                module: 'feltro'
            },
            'guia-pontos-feltro': {
                id: 'guia-pontos-feltro',
                title: 'Guia de Pontos para Feltro',
                content: this.getGuiaPontosFeltroHTML(),
                module: 'feltro'
            },
            'checklist-feltro': {
                id: 'checklist-feltro',
                title: 'Checklist de Início de Projeto (Feltro)',
                content: this.getChecklistFeltroHTML(),
                module: 'feltro'
            },
            'paleta-cores': {
                id: 'paleta-cores',
                title: 'Gerador de Paleta de Cores',
                content: this.getPaletaCoresHTML(),
                module: 'feltro'
            }
        };
    },

    setupEventListeners: function () {
        const toolCards = document.querySelectorAll('.tool-card[data-module="feltro"]');
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
                // Usa a mesma função do módulo de bordado
                if (typeof initPrecificacao === 'function') initPrecificacao();
                break;
            case 'quantidade-feltro':
                if (typeof initQuantidadeFeltro === 'function') initQuantidadeFeltro();
                break;
            case 'conversor-medidas':
                // Usa a mesma função do módulo de bordado
                if (typeof initConversorMedidas === 'function') initConversorMedidas();
                break;
            case 'calculadora-tempo':
                // Usa a mesma função do módulo de bordado
                if (typeof initCalculadoraTempo === 'function') initCalculadoraTempo();
                break;
            case 'calculadora-enchimento':
                if (typeof initCalculadoraEnchimento === 'function') initCalculadoraEnchimento();
                break;
            case 'calculadora-padrao':
                if (typeof initCalculadoraPadrao === 'function') initCalculadoraPadrao();
                break;
            case 'guia-pontos-feltro':
                if (typeof initGuiaPontosFeltro === 'function') initGuiaPontosFeltro();
                break;
            case 'checklist-feltro':
                if (typeof initChecklistFeltro === 'function') initChecklistFeltro();
                break;
            case 'paleta-cores':
                if (typeof initPaletaCores === 'function') initPaletaCores();
                break;
        }
    },

    configurarInputs: function (toolName) {
        const inputIds = {
            'precificacao': ['custo-insumos', 'custo-mao-obra', 'outros-custos', 'valor-metodo'],
            'quantidade-feltro': ['largura-feltro', 'altura-feltro', 'largura-peca', 'altura-peca', 'numero-camadas'],
            'conversor-medidas': ['valor-converter'],
            'calculadora-tempo': ['tempo-trabalho', 'valor-hora', 'quantidade-pecas'],
            'calculadora-enchimento': ['largura-peca', 'altura-peca', 'profundidade-peca'],
            'calculadora-padrao': ['largura-original', 'altura-original', 'largura-nova', 'altura-nova']
        };

        const ids = inputIds[toolName] || [];
        ids.forEach(id => {
            if (typeof configurarInputBrasileiro === 'function') {
                configurarInputBrasileiro(id);
            }
        });
    },

    // Funções HTML
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

    getQuantidadeFeltroHTML: function () {
        return `
            <div id="quantidade-feltro-container">
                <div class="mb-4">
                    <h6 class="mb-3">Dimensões do Feltro Disponível</h6>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Largura (cm)</label>
                            <input type="text" id="largura-feltro" class="form-control" step="0.01" min="0" placeholder="30,00" inputmode="decimal">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Altura (cm)</label>
                            <input type="text" id="altura-feltro" class="form-control" step="0.01" min="0" placeholder="30,00" inputmode="decimal">
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h6 class="mb-3">Dimensões Necessárias por Peça</h6>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Largura necessária (cm)</label>
                            <input type="text" id="largura-peca" class="form-control" step="0.01" min="0" placeholder="10,00" inputmode="decimal">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Altura necessária (cm)</label>
                            <input type="text" id="altura-peca" class="form-control" step="0.01" min="0" placeholder="10,00" inputmode="decimal">
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h6 class="mb-3">Configurações Adicionais</h6>
                    <div class="mb-3">
                        <label class="form-label">Número de camadas por peça</label>
                        <input type="text" id="numero-camadas" class="form-control" step="1" min="1" placeholder="2" value="2" inputmode="numeric">
                        <div class="form-text">Quantas camadas de feltro você precisa para cada peça?</div>
                    </div>
                </div>

                <button class="btn btn-calculate" onclick="calcularQuantidadeFeltro()">
                    <i class="fas fa-calculator me-2"></i>Calcular
                </button>

                <div id="resultado-quantidade-feltro"></div>
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

    getCalculadoraEnchimentoHTML: function () {
        return `
            <div id="calculadora-enchimento-container">
                <div class="mb-4">
                    <h6 class="mb-3">Dimensões da Peça</h6>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Largura (cm)</label>
                            <input type="text" id="largura-peca" class="form-control" step="0.01" min="0" placeholder="10,00" inputmode="decimal">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Altura (cm)</label>
                            <input type="text" id="altura-peca" class="form-control" step="0.01" min="0" placeholder="10,00" inputmode="decimal">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Profundidade (cm)</label>
                            <input type="text" id="profundidade-peca" class="form-control" step="0.01" min="0" placeholder="5,00" inputmode="decimal">
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h6 class="mb-3">Tipo de Enchimento</h6>
                    <div class="mb-3">
                        <label class="form-label">Selecione o tipo:</label>
                        <select id="tipo-enchimento" class="form-select">
                            <option value="fibra-sintetica">Fibra Sintética (fofinho)</option>
                            <option value="algodao">Algodão</option>
                            <option value="espuma">Espuma</option>
                        </select>
                    </div>
                </div>

                <button class="btn btn-calculate" onclick="calcularEnchimento()">
                    <i class="fas fa-calculator me-2"></i>Calcular Enchimento
                </button>

                <div id="resultado-enchimento"></div>
            </div>
        `;
    },

    getCalculadoraPadraoHTML: function () {
        return `
            <div id="calculadora-padrao-container">
                <div class="mb-4">
                    <h6 class="mb-3">Dimensões Originais do Padrão</h6>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Largura original (cm)</label>
                            <input type="text" id="largura-original" class="form-control" step="0.01" min="0" placeholder="10,00" inputmode="decimal">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Altura original (cm)</label>
                            <input type="text" id="altura-original" class="form-control" step="0.01" min="0" placeholder="10,00" inputmode="decimal">
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h6 class="mb-3">Nova Dimensão Desejada</h6>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Nova largura (cm)</label>
                            <input type="text" id="largura-nova" class="form-control" step="0.01" min="0" placeholder="15,00" inputmode="decimal">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Nova altura (cm) - opcional</label>
                            <input type="text" id="altura-nova" class="form-control" step="0.01" min="0" placeholder="Deixe em branco para manter proporção" inputmode="decimal">
                        </div>
                    </div>
                </div>

                <button class="btn btn-calculate" onclick="calcularPadrao()">
                    <i class="fas fa-calculator me-2"></i>Calcular Escala
                </button>

                <div id="resultado-padrao"></div>
            </div>
        `;
    },

    getGuiaPontosFeltroHTML: function () {
        return `
            <div id="guia-pontos-feltro-container">
                <div class="mb-4">
                    <p class="text-muted">Selecione um ponto para ver as instruções detalhadas:</p>
                    <select id="seletor-ponto-feltro" class="form-select mb-3">
                        <option value="">Selecione um ponto...</option>
                        <option value="ponto-invisivel">Ponto Invisível</option>
                        <option value="ponto-chuleado">Ponto Chuleado</option>
                        <option value="ponto-caseado">Ponto Caseado</option>
                        <option value="ponto-palito">Ponto Palito</option>
                        <option value="ponto-espinha">Ponto Espinha</option>
                    </select>
                </div>

                <div id="conteudo-ponto-feltro"></div>
            </div>
        `;
    },

    getChecklistFeltroHTML: function () {
        return `
            <div id="checklist-feltro-container">
                <div class="mb-4">
                    <p class="text-muted">Selecione o tipo de projeto em feltro:</p>
                    <select id="tipo-projeto-feltro" class="form-select mb-3">
                        <option value="">Selecione...</option>
                        <option value="bonecos">Bonecos e Personagens 3D</option>
                        <option value="guirlandas">Guirlandas de Maternidade</option>
                        <option value="lembrancinhas">Chaveiros e Lembrancinhas</option>
                    </select>
                </div>

                <button class="btn btn-calculate" onclick="gerarChecklistFeltro()">
                    <i class="fas fa-list-check me-2"></i>Gerar Lista
                </button>

                <div id="resultado-checklist-feltro" class="mt-4"></div>
            </div>
        `;
    },

    getPaletaCoresHTML: function () {
        // Reusa a mesma estrutura do bordado
        return BordadoModule.getPaletaCoresHTML();
    }
};

