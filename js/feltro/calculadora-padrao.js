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
    
    const formatarNumero = (num) => {
        if (num % 1 === 0) return num.toString();
        return num.toFixed(2).replace('.', ',');
    };
    
    const formatarPercentual = (num) => {
        return (num * 100).toFixed(1).replace('.', ',') + '%';
    };
    
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-expand-arrows-alt me-2"></i>Resultado do Redimensionamento</h5>
            
            <div class="mb-3">
                <strong>Dimensões Originais:</strong>
                <div class="small mt-2">
                    <div>Largura: ${formatarNumero(larguraOriginal)} cm</div>
                    <div>Altura: ${formatarNumero(alturaOriginal)} cm</div>
                </div>
            </div>
            
            <div class="mb-3">
                <strong>Novas Dimensões:</strong>
                <div class="small mt-2">
                    <div>Largura: ${formatarNumero(larguraNova)} cm</div>
                    <div>Altura: ${formatarNumero(alturaNovaCalculada)} cm</div>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-12">
                    <strong>Escala de Redimensionamento:</strong>
                    <div class="result-value text-success">
                        ${formatarPercentual(escalaLargura)} (largura)
                        ${temDistorcao ? ` / ${formatarPercentual(escalaAltura)} (altura)` : ''}
                    </div>
                    ${!temDistorcao ? '<div class="small text-muted mt-2">Proporções mantidas</div>' : ''}
                </div>
            </div>
            
            ${temDistorcao ? `
                <div class="alert alert-warning mt-3">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    <small>
                        <strong>Atenção:</strong> As proporções originais não foram mantidas. 
                        O padrão pode ficar distorcido. Considere ajustar uma das dimensões para manter a proporção.
                    </small>
                </div>
            ` : ''}
            
            <div class="alert alert-info mt-3">
                <i class="fas fa-info-circle me-2"></i>
                <small>
                    <strong>Dica:</strong> Para manter as proporções, informe apenas a largura ou apenas a altura. 
                    A outra dimensão será calculada automaticamente.
                </small>
            </div>
        </div>
    `;
}

