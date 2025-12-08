// Calculadora de Custo por Fio de Meada - Isolada e independente

function initCustoFio() {
    // Pode adicionar inicializações específicas se necessário
}

function calcularCustoFio() {
    // Limpar resultado anterior
    const resultadoDiv = document.getElementById('resultado-custo-fio');
    resultadoDiv.innerHTML = '';
    
    // Obter valores dos inputs (aceita vírgula)
    const tamanhoMeada = parseValorBrasileiro(document.getElementById('tamanho-meada').value);
    const quantidadeFios = parseValorBrasileiro(document.getElementById('quantidade-fios').value);
    const precoMeada = parseValorBrasileiro(document.getElementById('preco-meada').value);
    const comprimentoFio = parseValorBrasileiro(document.getElementById('comprimento-fio').value);
    
    // Validar entradas
    if (!tamanhoMeada || tamanhoMeada <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe o tamanho da meada em metros.</div>';
        return;
    }
    
    if (!quantidadeFios || quantidadeFios <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a quantidade de fios na meada.</div>';
        return;
    }
    
    if (!precoMeada || precoMeada <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe o preço da meada.</div>';
        return;
    }
    
    if (!comprimentoFio || comprimentoFio <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe o comprimento utilizado por fio.</div>';
        return;
    }
    
    // Calcular conforme a lógica fornecida:
    // 6*8 = 48 metros (quantidade de fios * tamanho da meada)
    // 4,00 / 48 metros = 0,08 por metro (preço da meada / total de metros)
    // custo por fio de 68cm = 0,0544 (preço por metro * comprimento em metros)
    
    // Total de metros na meada
    const totalMetros = quantidadeFios * tamanhoMeada;
    
    // Preço por metro
    const precoPorMetro = precoMeada / totalMetros;
    
    // Converter comprimento de cm para metros
    const comprimentoMetros = comprimentoFio / 100;
    
    // Custo por fio utilizado
    const custoPorFio = precoPorMetro * comprimentoMetros;
    
    // Formatar valores para exibição
    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4, maximumFractionDigits: 4 });
    };
    
    const formatarMoedaSimples = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };
    
    // Exibir resultados
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-ruler me-2"></i>Resultado do Cálculo</h5>
            
            <div class="mb-3">
                <strong>Informações da Meada:</strong>
                <div class="small mt-2">
                    <div>Tamanho da meada: ${tamanhoMeada.toFixed(2).replace('.', ',')} metros</div>
                    <div>Quantidade de fios: ${quantidadeFios}</div>
                    <div>Preço da meada: ${formatarMoedaSimples(precoMeada)}</div>
                </div>
            </div>
            
            <div class="mb-3">
                <strong>Cálculos Intermediários:</strong>
                <div class="small mt-2">
                    <div>Total de metros na meada: ${totalMetros.toFixed(2).replace('.', ',')} metros</div>
                    <div>Preço por metro: ${formatarMoeda(precoPorMetro)}</div>
                    <div>Comprimento utilizado: ${comprimentoFio.toFixed(2).replace('.', ',')} cm (${comprimentoMetros.toFixed(2).replace('.', ',')} m)</div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-12">
                    <strong>Custo por Fio Utilizado:</strong>
                    <div class="result-value">${formatarMoeda(custoPorFio)}</div>
                </div>
            </div>
            
            <div class="mt-3 small text-muted">
                <i class="fas fa-info-circle me-1"></i>
                Cálculo: (Preço da meada ÷ Total de metros) × Comprimento utilizado
            </div>
        </div>
    `;
}

