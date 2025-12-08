// Calculadora de Tecido - Isolada e independente

function initCalculadoraTecido() {
    // Pode adicionar inicializações específicas se necessário
}

function calcularTecido() {
    // Limpar resultado anterior
    const resultadoDiv = document.getElementById('resultado-tecido');
    resultadoDiv.innerHTML = '';
    
    // Obter valores dos inputs (aceita vírgula)
    const larguraTecido = parseValorBrasileiro(document.getElementById('largura-tecido').value);
    const alturaTecido = parseValorBrasileiro(document.getElementById('altura-tecido').value);
    const larguraPeca = parseValorBrasileiro(document.getElementById('largura-peca').value);
    const alturaPeca = parseValorBrasileiro(document.getElementById('altura-peca').value);
    const numeroCamadas = parseValorBrasileiro(document.getElementById('numero-camadas').value) || 1;
    
    // Validar entradas
    if (!larguraTecido || larguraTecido <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a largura do tecido disponível.</div>';
        return;
    }
    
    if (!alturaTecido || alturaTecido <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a altura do tecido disponível.</div>';
        return;
    }
    
    if (!larguraPeca || larguraPeca <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a largura necessária para cada peça.</div>';
        return;
    }
    
    if (!alturaPeca || alturaPeca <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a altura necessária para cada peça.</div>';
        return;
    }
    
    if (!numeroCamadas || numeroCamadas < 1) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">O número de camadas deve ser pelo menos 1.</div>';
        return;
    }
    
    // Calcular quantas peças cabem na largura (arredondar para baixo)
    const pecasPorLargura = Math.floor(larguraTecido / larguraPeca);
    
    // Calcular quantas peças cabem na altura (arredondar para baixo)
    const pecasPorAltura = Math.floor(alturaTecido / alturaPeca);
    
    // Total de peças que cabem no tecido (sem considerar camadas)
    const totalPecasSemCamadas = pecasPorLargura * pecasPorAltura;
    
    // Total de peças considerando o número de camadas necessárias
    const totalPecasComCamadas = Math.floor(totalPecasSemCamadas / numeroCamadas);
    
    // Calcular área total do tecido
    const areaTecido = larguraTecido * alturaTecido;
    
    // Calcular área necessária por peça (com camadas)
    const areaPorPeca = (larguraPeca * alturaPeca) * numeroCamadas;
    
    // Calcular área total utilizada
    const areaUtilizada = totalPecasComCamadas * areaPorPeca;
    
    // Calcular área desperdiçada
    const areaDesperdicada = areaTecido - areaUtilizada;
    const percentualDesperdicio = (areaDesperdicada / areaTecido) * 100;
    
    // Formatar valores para exibição
    const formatarNumero = (num) => {
        if (num % 1 === 0) {
            return num.toString();
        }
        return num.toFixed(2).replace('.', ',');
    };
    
    // Exibir resultados
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-cut me-2"></i>Resultado do Cálculo</h5>
            
            <div class="mb-3">
                <strong>Informações do Tecido:</strong>
                <div class="small mt-2">
                    <div>Dimensões: ${formatarNumero(larguraTecido)} cm × ${formatarNumero(alturaTecido)} cm</div>
                    <div>Área total: ${formatarNumero(areaTecido)} cm²</div>
                </div>
            </div>
            
            <div class="mb-3">
                <strong>Informações por Peça:</strong>
                <div class="small mt-2">
                    <div>Dimensões necessárias: ${formatarNumero(larguraPeca)} cm × ${formatarNumero(alturaPeca)} cm</div>
                    <div>Número de camadas: ${numeroCamadas}</div>
                    <div>Área por peça (com camadas): ${formatarNumero(areaPorPeca)} cm²</div>
                </div>
            </div>
            
            <div class="mb-3">
                <strong>Cálculo de Aproveitamento:</strong>
                <div class="small mt-2">
                    <div>Peças por largura: ${pecasPorLargura}</div>
                    <div>Peças por altura: ${pecasPorAltura}</div>
                    <div>Total de peças (sem camadas): ${totalPecasSemCamadas}</div>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-12">
                    <strong>Total de Peças que Você Pode Fazer:</strong>
                    <div class="result-value text-success">${totalPecasComCamadas} peça${totalPecasComCamadas !== 1 ? 's' : ''}</div>
                </div>
            </div>
            
            <div class="mb-3">
                <strong>Análise de Aproveitamento:</strong>
                <div class="small mt-2">
                    <div>Área utilizada: ${formatarNumero(areaUtilizada)} cm²</div>
                    <div>Área desperdiçada: ${formatarNumero(areaDesperdicada)} cm²</div>
                    <div>Percentual de desperdício: ${formatarNumero(percentualDesperdicio)}%</div>
                </div>
            </div>
            
            ${totalPecasComCamadas === 0 ? `
                <div class="alert alert-warning mt-3">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Não é possível fazer nenhuma peça com essas dimensões. O tecido é menor que o necessário ou o número de camadas é muito alto.
                </div>
            ` : ''}
        </div>
    `;
}

