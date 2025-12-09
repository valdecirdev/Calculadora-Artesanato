// Calculadora de Precificação - Isolada e independente

function initPrecificacao() {
    const metodoSelect = document.getElementById('metodo-calculo');
    if (metodoSelect) {
        metodoSelect.addEventListener('change', atualizarCampoMetodo);
        atualizarCampoMetodo();
    }
}

function atualizarCampoMetodo() {
    const metodo = document.getElementById('metodo-calculo').value;
    const labelMetodo = document.getElementById('label-metodo');
    const valorMetodo = document.getElementById('valor-metodo');

    switch (metodo) {
        case 'markup':
            labelMetodo.textContent = 'Mark-up (ex: 2,5 para 150% de lucro)';
            valorMetodo.placeholder = '2,5';
            break;
        case 'margem':
            labelMetodo.textContent = 'Margem de Lucro (%)';
            valorMetodo.placeholder = '60';
            break;
        case 'preco-mercado':
            labelMetodo.textContent = 'Preço de Mercado Desejado (R$)';
            valorMetodo.placeholder = '50,00';
            break;
    }

    valorMetodo.value = '';
}

function calcularPrecificacao() {
    // Limpar resultado anterior
    const resultadoDiv = document.getElementById('resultado-precificacao');
    resultadoDiv.innerHTML = '';

    // Obter valores dos inputs (aceita vírgula)
    const custoInsumos = parseValorBrasileiro(document.getElementById('custo-insumos').value) || 0;
    const custoMaoObra = parseValorBrasileiro(document.getElementById('custo-mao-obra').value) || 0;
    const outrosCustos = parseValorBrasileiro(document.getElementById('outros-custos').value) || 0;
    const metodo = document.getElementById('metodo-calculo').value;
    const valorMetodo = parseValorBrasileiro(document.getElementById('valor-metodo').value);

    // Validar entradas
    if (custoInsumos === 0 && custoMaoObra === 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe pelo menos o custo dos insumos ou mão de obra.</div>';
        return;
    }

    if (!valorMetodo || valorMetodo <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe um valor válido para o método selecionado.</div>';
        return;
    }

    // Calcular custo total
    const custoTotal = custoInsumos + custoMaoObra + outrosCustos;

    let precoVenda = 0;
    let markup = 0;
    let margemLucro = 0;
    let lucro = 0;

    // Calcular preço de venda baseado no método escolhido
    switch (metodo) {
        case 'markup':
            precoVenda = custoTotal * valorMetodo;
            markup = valorMetodo;
            lucro = precoVenda - custoTotal;
            margemLucro = (lucro / precoVenda) * 100;
            break;

        case 'margem':
            // Preço = Custo / (1 - Margem/100)
            precoVenda = custoTotal / (1 - (valorMetodo / 100));
            markup = precoVenda / custoTotal;
            margemLucro = valorMetodo;
            lucro = precoVenda - custoTotal;
            break;

        case 'preco-mercado':
            precoVenda = valorMetodo;
            markup = precoVenda / custoTotal;
            lucro = precoVenda - custoTotal;
            margemLucro = (lucro / precoVenda) * 100;
            break;
    }

    // Formatar valores para exibição
    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatarPercentual = (valor) => {
        return valor.toFixed(2).replace('.', ',') + '%';
    };

    // Determinar método usado para exibição
    let metodoTexto = '';
    let explicacaoMetodo = '';
    switch (metodo) {
        case 'markup':
            metodoTexto = 'Mark-up';
            explicacaoMetodo = `Você definiu um multiplicador de ${valorMetodo.toFixed(2).replace('.', ',')}x sobre o custo total.`;
            break;
        case 'margem':
            metodoTexto = 'Margem de Lucro';
            explicacaoMetodo = `Você definiu uma margem de lucro de ${formatarPercentual(valorMetodo)} sobre o preço de venda.`;
            break;
        case 'preco-mercado':
            metodoTexto = 'Preço de Mercado';
            explicacaoMetodo = `Você definiu o preço de venda baseado no mercado: ${formatarMoeda(valorMetodo)}.`;
            break;
    }

    // Análise de viabilidade
    let analiseViabilidade = '';
    let classeViabilidade = '';
    if (margemLucro < 20) {
        analiseViabilidade = 'Margem baixa. Considere revisar custos ou aumentar o preço.';
        classeViabilidade = 'warning';
    } else if (margemLucro < 40) {
        analiseViabilidade = 'Margem adequada para produtos artesanais.';
        classeViabilidade = 'info';
    } else {
        analiseViabilidade = 'Excelente margem de lucro!';
        classeViabilidade = 'success';
    }

    // Determinar cor do resultado
    let corResultado = 'text-success';
    if (lucro < 0) {
        corResultado = 'text-danger';
    } else if (margemLucro < 20) {
        corResultado = 'text-warning';
    }

    // Exibir resultados
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-chart-line me-2"></i>Resultados da Precificação</h5>
            
            <div class="alert alert-info mb-3">
                <i class="fas fa-info-circle me-2"></i>
                <strong>Método utilizado:</strong> ${metodoTexto}<br>
                <small>${explicacaoMetodo}</small>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <strong>Custo Total:</strong>
                    <div class="result-value">${formatarMoeda(custoTotal)}</div>
                    <div class="small text-muted mt-1">
                        Soma de todos os custos do produto
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Preço de Venda Sugerido:</strong>
                    <div class="result-value text-primary">${formatarMoeda(precoVenda)}</div>
                    <div class="small text-muted mt-1">
                        Preço final para o cliente
                    </div>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <strong>Lucro Bruto:</strong>
                    <div class="result-value ${corResultado}">${formatarMoeda(lucro)}</div>
                    <div class="small text-muted mt-1">
                        Diferença entre venda e custo
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Margem de Lucro:</strong>
                    <div class="result-value ${corResultado}">${formatarPercentual(margemLucro)}</div>
                    <div class="small text-muted mt-1">
                        Percentual de lucro sobre o preço de venda
                    </div>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <strong>Mark-up Aplicado:</strong>
                    <div class="result-value">${markup.toFixed(2).replace('.', ',')}x</div>
                    <div class="small text-muted mt-1">
                        Multiplicador sobre o custo total
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Detalhamento de Custos:</strong>
                    <div class="small mt-2">
                        <div><i class="fas fa-box me-1"></i> Insumos: ${formatarMoeda(custoInsumos)}</div>
                        <div><i class="fas fa-user me-1"></i> Mão de Obra: ${formatarMoeda(custoMaoObra)}</div>
                        ${outrosCustos > 0 ? `<div><i class="fas fa-ellipsis-h me-1"></i> Outros: ${formatarMoeda(outrosCustos)}</div>` : ''}
                    </div>
                </div>
            </div>
            
            <div class="alert alert-${classeViabilidade} mt-3">
                <i class="fas fa-chart-pie me-2"></i>
                <strong>Análise de Viabilidade:</strong> ${analiseViabilidade}
            </div>

        </div>
    `;
}

