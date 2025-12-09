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
                    Não é possível fazer nenhuma peça com essas dimensões. O feltro é menor que o necessário ou o número de camadas é muito alto.
                </div>
            ` : ''}
            
            <div class="alert alert-info mt-3">
                <i class="fas fa-lightbulb me-2"></i>
                <strong>Dicas de Otimização para Feltro:</strong>
                <ul class="small mt-2 mb-0">
                    ${percentualDesperdicio > 20 ? `
                    <li class="text-warning"><strong>Atenção:</strong> Você está desperdiçando ${formatarNumero(percentualDesperdicio)}% do feltro. Considere:</li>
                    <li>• Ajustar o tamanho das peças para melhor aproveitamento</li>
                    <li>• Usar retalhos para peças menores ou detalhes</li>
                    <li>• Planejar o corte antes de começar</li>
                    <li>• Considerar comprar feltro em tamanhos que se encaixem melhor</li>
                    ` : `
                    <li class="text-success"><strong>Ótimo aproveitamento!</strong> Você está desperdiçando apenas ${formatarNumero(percentualDesperdicio)}% do feltro.</li>
                    `}
                    <li><strong>Planejamento:</strong> Desenhe um layout no papel antes de cortar para visualizar o melhor aproveitamento.</li>
                    <li><strong>Orientacao:</strong> Considere girar as peças (largura x altura) para ver se cabe mais peças.</li>
                    <li><strong>Retalhos:</strong> Guarde os retalhos para projetos menores, aplicações, olhos, narizes ou detalhes.</li>
                    <li><strong>Camadas:</strong> Lembre-se que peças com múltiplas camadas precisam de mais feltro. Planeje bem!</li>
                    <li><strong>Dica profissional:</strong> Feltro é mais caro que tecido comum, então otimizar o corte é essencial para a precificação.</li>
                </ul>
            </div>
            
            <div class="mt-3">
                <strong><i class="fas fa-calculator me-2"></i>Informações Adicionais:</strong>
                <div class="small mt-2">
                    <div>Você pode fazer <strong>${totalPecasComCamadas}</strong> peça${totalPecasComCamadas !== 1 ? 's' : ''} completa${totalPecasComCamadas !== 1 ? 's' : ''} com ${numeroCamadas} camada${numeroCamadas !== 1 ? 's' : ''} cada.</div>
                    <div>Área utilizada: <strong>${formatarNumero(areaUtilizada)} cm²</strong> de ${formatarNumero(areaFeltro)} cm² disponíveis.</div>
                    ${pecasPorLargura > 0 && pecasPorAltura > 0 ? `
                    <div>Layout sugerido: <strong>${pecasPorLargura}</strong> peças na largura × <strong>${pecasPorAltura}</strong> peças na altura.</div>
                    ` : ''}
                    <div class="mt-2">
                        <strong>Economia:</strong> Com esse aproveitamento, você economiza aproximadamente <strong>${formatarNumero(areaDesperdicada)} cm²</strong> de feltro por peça produzida.
                    </div>
                </div>
            </div>
        </div>
    `;
}

