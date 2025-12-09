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
    
    // Calcular quantos fios podem ser feitos com a meada
    const fiosPorMeada = (totalMetros * 100) / comprimentoFio;
    
    // Calcular custo por metro de fio
    const custoPorMetroFio = custoPorFio / comprimentoMetros;
    
    // Exibir resultados
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-ruler me-2"></i>Resultado do Cálculo de Custo por Fio</h5>
            
            <div class="mb-3">
                <strong>Informações da Meada:</strong>
                <div class="small mt-2">
                    <div><i class="fas fa-ruler-vertical me-1"></i> Tamanho da meada: ${tamanhoMeada.toFixed(2).replace('.', ',')} metros</div>
                    <div><i class="fas fa-layer-group me-1"></i> Quantidade de fios: ${quantidadeFios}</div>
                    <div><i class="fas fa-tag me-1"></i> Preço da meada: ${formatarMoedaSimples(precoMeada)}</div>
                </div>
            </div>
            
            <div class="mb-3">
                <strong>Cálculos Intermediários:</strong>
                <div class="small mt-2">
                    <div><i class="fas fa-calculator me-1"></i> Total de metros na meada: ${totalMetros.toFixed(2).replace('.', ',')} metros</div>
                    <div><i class="fas fa-dollar-sign me-1"></i> Preço por metro: ${formatarMoeda(precoPorMetro)}</div>
                    <div><i class="fas fa-ruler me-1"></i> Comprimento utilizado: ${comprimentoFio.toFixed(2).replace('.', ',')} cm (${comprimentoMetros.toFixed(2).replace('.', ',')} m)</div>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <strong>Custo por Fio Utilizado:</strong>
                    <div class="result-value text-success">${formatarMoeda(custoPorFio)}</div>
                    <div class="small text-muted mt-1">
                        Use este valor na precificação
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Custo por Metro de Fio:</strong>
                    <div class="result-value">${formatarMoeda(custoPorMetroFio)}</div>
                    <div class="small text-muted mt-1">
                        Custo por metro linear
                    </div>
                </div>
            </div>
            
            <div class="alert alert-info mt-3">
                <i class="fas fa-chart-bar me-2"></i>
                <strong>Análise de Aproveitamento:</strong>
                <div class="small mt-2">
                    <div>Com uma meada, você pode fazer aproximadamente <strong>${Math.floor(fiosPorMeada)}</strong> fios de ${comprimentoFio.toFixed(0)} cm.</div>
                    <div>Isso representa um custo de <strong>${formatarMoeda(precoMeada / Math.floor(fiosPorMeada))}</strong> por fio quando compra a meada inteira.</div>
                </div>
            </div>
            
            <div class="mt-3">
                <strong><i class="fas fa-lightbulb me-2"></i>Dicas Profissionais:</strong>
                <ul class="small mt-2 mb-0">
                    <li><strong>Use este custo na precificação:</strong> Some o custo de todos os fios usados na peça ao custo total.</li>
                    <li><strong>Compre meadas maiores:</strong> Geralmente meadas maiores têm melhor custo-benefício.</li>
                    <li><strong>Controle o desperdício:</strong> Meça com precisão para não desperdiçar fio.</li>
                    <li><strong>Considere cores especiais:</strong> Fios de cores raras ou especiais podem custar mais.</li>
                    <li><strong>Dica:</strong> Se usar múltiplos fios na mesma agulha, multiplique o custo pelo número de fios.</li>
                </ul>
            </div>
            
            <div class="mt-3 small text-muted">
                <i class="fas fa-info-circle me-1"></i>
                <strong>Fórmula:</strong> (Preço da meada ÷ Total de metros) × Comprimento utilizado
            </div>
        </div>
    `;
}

