// Calculadora de Enchimento - Isolada e independente

function initCalculadoraEnchimento() {
    // Pode adicionar inicializações específicas se necessário
}

function calcularEnchimento() {
    const resultadoDiv = document.getElementById('resultado-enchimento');
    resultadoDiv.innerHTML = '';
    
    const larguraPeca = parseValorBrasileiro(document.getElementById('largura-peca').value);
    const alturaPeca = parseValorBrasileiro(document.getElementById('altura-peca').value);
    const profundidadePeca = parseValorBrasileiro(document.getElementById('profundidade-peca').value);
    const tipoEnchimento = document.getElementById('tipo-enchimento').value;
    
    if (!larguraPeca || larguraPeca <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a largura da peça.</div>';
        return;
    }
    
    if (!alturaPeca || alturaPeca <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a altura da peça.</div>';
        return;
    }
    
    if (!profundidadePeca || profundidadePeca <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a profundidade da peça.</div>';
        return;
    }
    
    // Calcular volume em cm³
    const volumeCm3 = larguraPeca * alturaPeca * profundidadePeca;
    
    // Fatores de densidade por tipo de enchimento (gramas por cm³)
    const densidades = {
        'fibra-sintetica': 0.03, // Fibra sintética é mais leve
        'algodao': 0.05,
        'espuma': 0.08
    };
    
    const densidade = densidades[tipoEnchimento] || 0.03;
    const pesoGramas = volumeCm3 * densidade;
    
    // Converter para gramas e considerar margem de segurança (20%)
    const pesoComMargem = pesoGramas * 1.2;
    
    const formatarNumero = (num) => {
        if (num % 1 === 0) return num.toString();
        return num.toFixed(2).replace('.', ',');
    };
    
    const nomesEnchimento = {
        'fibra-sintetica': 'Fibra Sintética',
        'algodao': 'Algodão',
        'espuma': 'Espuma'
    };
    
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-cube me-2"></i>Resultado do Cálculo</h5>
            
            <div class="mb-3">
                <strong>Dimensões da Peça:</strong>
                <div class="small mt-2">
                    <div>Largura: ${formatarNumero(larguraPeca)} cm</div>
                    <div>Altura: ${formatarNumero(alturaPeca)} cm</div>
                    <div>Profundidade: ${formatarNumero(profundidadePeca)} cm</div>
                    <div>Volume: ${formatarNumero(volumeCm3)} cm³</div>
                </div>
            </div>
            
            <div class="mb-3">
                <strong>Tipo de Enchimento:</strong>
                <div class="small mt-2">${nomesEnchimento[tipoEnchimento]}</div>
            </div>
            
            <div class="row mb-3">
                <div class="col-12">
                    <strong>Quantidade de Enchimento Necessária:</strong>
                    <div class="result-value text-success">${formatarNumero(pesoComMargem)} gramas</div>
                    <div class="small text-muted mt-2">Peso mínimo: ${formatarNumero(pesoGramas)} gramas</div>
                </div>
            </div>
            
            <div class="alert alert-info mt-3">
                <i class="fas fa-info-circle me-2"></i>
                <small>
                    <strong>Nota:</strong> O cálculo inclui uma margem de segurança de 20% para garantir enchimento adequado. 
                    Ajuste conforme necessário baseado na firmeza desejada.
                </small>
            </div>
        </div>
    `;
}

