// Calculadora de Quantidade de Feltro - Isolada e independente

function initQuantidadeFeltro() {
    // Pode adicionar inicializações específicas se necessário
}

function calcularQuantidadeFeltro() {
    const resultadoDiv = document.getElementById('resultado-quantidade-feltro');
    resultadoDiv.innerHTML = '';
    
    const larguraFeltro = parseValorBrasileiro(document.getElementById('largura-feltro').value);
    const alturaFeltro = parseValorBrasileiro(document.getElementById('altura-feltro').value);
    const larguraPeca = parseValorBrasileiro(document.getElementById('largura-peca').value);
    const alturaPeca = parseValorBrasileiro(document.getElementById('altura-peca').value);
    const numeroCamadas = parseValorBrasileiro(document.getElementById('numero-camadas').value) || 2;
    
    if (!larguraFeltro || larguraFeltro <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a largura do feltro disponível.</div>';
        return;
    }
    
    if (!alturaFeltro || alturaFeltro <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a altura do feltro disponível.</div>';
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
    
    const pecasPorLargura = Math.floor(larguraFeltro / larguraPeca);
    const pecasPorAltura = Math.floor(alturaFeltro / alturaPeca);
    const totalPecasSemCamadas = pecasPorLargura * pecasPorAltura;
    const totalPecasComCamadas = Math.floor(totalPecasSemCamadas / numeroCamadas);
    
    const areaFeltro = larguraFeltro * alturaFeltro;
    const areaPorPeca = (larguraPeca * alturaPeca) * numeroCamadas;
    const areaUtilizada = totalPecasComCamadas * areaPorPeca;
    const areaDesperdicada = areaFeltro - areaUtilizada;
    const percentualDesperdicio = (areaDesperdicada / areaFeltro) * 100;
    
    const formatarNumero = (num) => {
        if (num % 1 === 0) return num.toString();
        return num.toFixed(2).replace('.', ',');
    };
    
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-cut me-2"></i>Resultado do Cálculo</h5>
            
            <div class="mb-3">
                <strong>Informações do Feltro:</strong>
                <div class="small mt-2">
                    <div>Dimensões: ${formatarNumero(larguraFeltro)} cm × ${formatarNumero(alturaFeltro)} cm</div>
                    <div>Área total: ${formatarNumero(areaFeltro)} cm²</div>
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
                    Não é possível fazer nenhuma peça com essas dimensões.
                </div>
            ` : ''}
        </div>
    `;
}

