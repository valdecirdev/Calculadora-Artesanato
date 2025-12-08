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
    
    switch(metodo) {
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
    switch(metodo) {
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
    
    // Exibir resultados
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-chart-line me-2"></i>Resultados da Precificação</h5>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <strong>Custo Total:</strong>
                    <div class="result-value">${formatarMoeda(custoTotal)}</div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Preço de Venda:</strong>
                    <div class="result-value">${formatarMoeda(precoVenda)}</div>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <strong>Lucro:</strong>
                    <div class="result-value text-success">${formatarMoeda(lucro)}</div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Margem de Lucro:</strong>
                    <div class="result-value text-success">${formatarPercentual(margemLucro)}</div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-6 mb-2">
                    <strong>Mark-up:</strong>
                    <div class="result-value">${markup.toFixed(2).replace('.', ',')}x</div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Detalhamento:</strong>
                    <div class="small">
                        <div>Insumos: ${formatarMoeda(custoInsumos)}</div>
                        <div>Mão de Obra: ${formatarMoeda(custoMaoObra)}</div>
                        ${outrosCustos > 0 ? `<div>Outros: ${formatarMoeda(outrosCustos)}</div>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

