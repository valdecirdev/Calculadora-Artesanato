// Redimensionador de Padrões - Isolado e independente

function initCalculadoraPadrao() {
    // Pode adicionar inicializações específicas se necessário
}

function calcularPadrao() {
    const resultadoDiv = document.getElementById('resultado-padrao');
    resultadoDiv.innerHTML = '';
    
    const larguraOriginal = parseValorBrasileiro(document.getElementById('largura-original').value);
    const alturaOriginal = parseValorBrasileiro(document.getElementById('altura-original').value);
    const larguraNova = parseValorBrasileiro(document.getElementById('largura-nova').value);
    const alturaNovaInput = document.getElementById('altura-nova').value;
    const alturaNova = alturaNovaInput ? parseValorBrasileiro(alturaNovaInput) : null;
    
    if (!larguraOriginal || larguraOriginal <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a largura original do padrão.</div>';
        return;
    }
    
    if (!alturaOriginal || alturaOriginal <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a altura original do padrão.</div>';
        return;
    }
    
    if (!larguraNova || larguraNova <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a nova largura desejada.</div>';
        return;
    }
    
    // Calcular escala
    const escalaLargura = larguraNova / larguraOriginal;
    
    // Se altura nova não foi informada, calcular mantendo proporção
    let alturaNovaCalculada = alturaNova;
    if (!alturaNova) {
        alturaNovaCalculada = alturaOriginal * escalaLargura;
    }
    
    // Calcular escala de altura
    const escalaAltura = alturaNovaCalculada / alturaOriginal;
    
    // Verificar se as escalas são diferentes (distorção)
    const temDistorcao = Math.abs(escalaLargura - escalaAltura) > 0.01;
    
    // Calcular diferença percentual
    const diferencaLargura = ((larguraNova - larguraOriginal) / larguraOriginal) * 100;
    const diferencaAltura = ((alturaNovaCalculada - alturaOriginal) / alturaOriginal) * 100;
    
    // Calcular área original e nova
    const areaOriginal = larguraOriginal * alturaOriginal;
    const areaNova = larguraNova * alturaNovaCalculada;
    const diferencaArea = ((areaNova - areaOriginal) / areaOriginal) * 100;
    
    const formatarNumero = (num) => {
        if (num % 1 === 0) return num.toString();
        return num.toFixed(2).replace('.', ',');
    };
    
    const formatarPercentual = (num) => {
        return (num * 100).toFixed(1).replace('.', ',') + '%';
    };
    
    // Determinar se aumentou ou diminuiu
    const aumentou = escalaLargura > 1;
    const diminuiu = escalaLargura < 1;
    
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-expand-arrows-alt me-2"></i>Resultado do Redimensionamento</h5>
            
            <div class="mb-3">
                <strong>Dimensões Originais:</strong>
                <div class="small mt-2">
                    <div><i class="fas fa-ruler-horizontal me-1"></i> Largura: ${formatarNumero(larguraOriginal)} cm</div>
                    <div><i class="fas fa-ruler-vertical me-1"></i> Altura: ${formatarNumero(alturaOriginal)} cm</div>
                    <div><i class="fas fa-square me-1"></i> Área: ${formatarNumero(areaOriginal)} cm²</div>
                </div>
            </div>
            
            <div class="mb-3">
                <strong>Novas Dimensões:</strong>
                <div class="small mt-2">
                    <div><i class="fas fa-ruler-horizontal me-1"></i> Largura: ${formatarNumero(larguraNova)} cm</div>
                    <div><i class="fas fa-ruler-vertical me-1"></i> Altura: ${formatarNumero(alturaNovaCalculada)} cm</div>
                    <div><i class="fas fa-square me-1"></i> Área: ${formatarNumero(areaNova)} cm²</div>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <strong>Escala de Redimensionamento:</strong>
                    <div class="result-value ${aumentou ? 'text-success' : diminuiu ? 'text-info' : ''}">
                        ${formatarPercentual(escalaLargura)} (largura)
                        ${temDistorcao ? `<br>${formatarPercentual(escalaAltura)} (altura)` : ''}
                    </div>
                    ${!temDistorcao ? '<div class="small text-muted mt-1">✓ Proporções mantidas</div>' : ''}
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Variação de Tamanho:</strong>
                    <div class="result-value">
                        Largura: ${diferencaLargura > 0 ? '+' : ''}${formatarPercentual(diferencaLargura / 100)}
                        <br>Altura: ${diferencaAltura > 0 ? '+' : ''}${formatarPercentual(diferencaAltura / 100)}
                        <br>Área: ${diferencaArea > 0 ? '+' : ''}${formatarPercentual(diferencaArea / 100)}
                    </div>
                </div>
            </div>
            
            ${temDistorcao ? `
                <div class="alert alert-warning mt-3">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    <strong>Atenção:</strong> As proporções originais não foram mantidas.
                    <ul class="small mt-2 mb-0">
                        <li>O padrão pode ficar distorcido (esticado ou comprimido).</li>
                        <li>Considere ajustar uma das dimensões para manter a proporção.</li>
                        <li>Para manter proporções, deixe a altura em branco ou ajuste manualmente.</li>
                    </ul>
                </div>
            ` : `
                <div class="alert alert-success mt-3">
                    <i class="fas fa-check-circle me-2"></i>
                    <strong>Perfeito!</strong> As proporções foram mantidas. O padrão será redimensionado sem distorção.
                </div>
            `}
            
            <div class="alert alert-info mt-3">
                <i class="fas fa-lightbulb me-2"></i>
                <strong>Dicas para Redimensionar Padrões:</strong>
                <ul class="small mt-2 mb-0">
                    <li><strong>Manter proporções:</strong> Informe apenas a largura OU apenas a altura. A outra será calculada automaticamente.</li>
                    <li><strong>Imprimir:</strong> Use a escala calculada para redimensionar ao imprimir (ex: 150% para aumentar 1,5x).</li>
                    <li><strong>Feltro:</strong> Lembre-se que padrões maiores precisam de mais feltro. Use a calculadora de quantidade para verificar.</li>
                    <li><strong>Detalhes:</strong> Padrões muito pequenos podem perder detalhes. Padrões muito grandes podem precisar de ajustes.</li>
                    <li><strong>Teste:</strong> Faça um teste em tamanho menor antes de cortar todo o feltro.</li>
                </ul>
            </div>
            
            <div class="mt-3">
                <strong><i class="fas fa-calculator me-2"></i>Informações Adicionais:</strong>
                <div class="small mt-2">
                    ${aumentou ? `
                    <div>O padrão será <strong>${formatarPercentual(escalaLargura)}</strong> maior que o original.</div>
                    <div>A área aumentará em <strong>${formatarPercentual(diferencaArea / 100)}</strong>, então você precisará de mais feltro.</div>
                    ` : diminuiu ? `
                    <div>O padrão será <strong>${formatarPercentual(Math.abs(escalaLargura - 1))}</strong> menor que o original.</div>
                    <div>A área diminuirá em <strong>${formatarPercentual(Math.abs(diferencaArea / 100))}</strong>, economizando feltro.</div>
                    ` : `
                    <div>O padrão manterá o mesmo tamanho.</div>
                    `}
                </div>
            </div>
        </div>
    `;
}

