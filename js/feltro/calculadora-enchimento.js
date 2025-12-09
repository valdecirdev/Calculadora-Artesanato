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
    
    // Converter para quilogramas se necessário
    const pesoKg = pesoComMargem / 1000;
    const pesoMinimoKg = pesoGramas / 1000;
    
    // Calcular quantidade aproximada em pacotes (assumindo pacotes de 500g)
    const pacotes500g = Math.ceil(pesoComMargem / 500);
    const pacotes1kg = Math.ceil(pesoComMargem / 1000);
    
    const formatarNumero = (num) => {
        if (num % 1 === 0) return num.toString();
        return num.toFixed(2).replace('.', ',');
    };
    
    const nomesEnchimento = {
        'fibra-sintetica': 'Fibra Sintética',
        'algodao': 'Algodão',
        'espuma': 'Espuma'
    };
    
    const descricoesEnchimento = {
        'fibra-sintetica': 'Leve, macio e fofinho. Ideal para bichos de pelúcia e peças que precisam ser macias.',
        'algodao': 'Natural e respirável. Mais firme que fibra sintética, ideal para peças que precisam de estrutura.',
        'espuma': 'Muito firme e estruturado. Ideal para peças que precisam manter formato rígido.'
    };
    
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-cube me-2"></i>Resultado do Cálculo de Enchimento</h5>
            
            <div class="mb-3">
                <strong>Dimensões da Peça:</strong>
                <div class="small mt-2">
                    <div><i class="fas fa-ruler-horizontal me-1"></i> Largura: ${formatarNumero(larguraPeca)} cm</div>
                    <div><i class="fas fa-ruler-vertical me-1"></i> Altura: ${formatarNumero(alturaPeca)} cm</div>
                    <div><i class="fas fa-arrows-alt-v me-1"></i> Profundidade: ${formatarNumero(profundidadePeca)} cm</div>
                    <div><i class="fas fa-cube me-1"></i> Volume total: ${formatarNumero(volumeCm3)} cm³</div>
                </div>
            </div>
            
            <div class="mb-3">
                <strong>Tipo de Enchimento:</strong>
                <div class="small mt-2">
                    <div><strong>${nomesEnchimento[tipoEnchimento]}</strong></div>
                    <div class="text-muted">${descricoesEnchimento[tipoEnchimento]}</div>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <strong>Quantidade Recomendada:</strong>
                    <div class="result-value text-success">${formatarNumero(pesoComMargem)} gramas</div>
                    <div class="small text-muted mt-1">
                        ${pesoKg >= 1 ? `(${formatarNumero(pesoKg)} kg)` : ''}
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Quantidade Mínima:</strong>
                    <div class="result-value">${formatarNumero(pesoGramas)} gramas</div>
                    <div class="small text-muted mt-1">
                        ${pesoMinimoKg >= 1 ? `(${formatarNumero(pesoMinimoKg)} kg)` : ''}
                        <br>Sem margem de segurança
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <strong>Quantidade em Pacotes Comerciais:</strong>
                <div class="small mt-2">
                    <div><i class="fas fa-box me-1"></i> Pacotes de 500g: aproximadamente <strong>${pacotes500g}</strong> pacote${pacotes500g !== 1 ? 's' : ''}</div>
                    <div><i class="fas fa-box me-1"></i> Pacotes de 1kg: aproximadamente <strong>${pacotes1kg}</strong> pacote${pacotes1kg !== 1 ? 's' : ''}</div>
                </div>
            </div>
            
            <div class="alert alert-info mt-3">
                <i class="fas fa-info-circle me-2"></i>
                <strong>Por que a margem de segurança?</strong>
                <ul class="small mt-2 mb-0">
                    <li>A margem de 20% garante que a peça fique bem preenchida e com formato adequado.</li>
                    <li>Enchimento pode se compactar com o tempo, então é melhor ter um pouco a mais.</li>
                    <li>Facilita o trabalho durante o enchimento, evitando que fique muito apertado ou muito solto.</li>
                    <li>Se preferir peças mais firmes, use a quantidade recomendada. Para mais macias, pode usar um pouco menos.</li>
                </ul>
            </div>
            
            <div class="mt-3">
                <strong><i class="fas fa-lightbulb me-2"></i>Dicas Profissionais:</strong>
                <ul class="small mt-2 mb-0">
                    <li><strong>Enchimento gradual:</strong> Encha a peça aos poucos, distribuindo uniformemente.</li>
                    <li><strong>Firmeza:</strong> Ajuste a quantidade conforme a firmeza desejada. Mais enchimento = mais firme.</li>
                    <li><strong>Economia:</strong> Para projetos grandes, compre pacotes maiores (1kg ou mais) que têm melhor custo-benefício.</li>
                    <li><strong>Armazenamento:</strong> Guarde o enchimento em sacos bem fechados para evitar umidade e poeira.</li>
                    <li><strong>Dica:</strong> Use este valor na precificação somando ao custo dos materiais.</li>
                </ul>
            </div>
            
            <div class="mt-3 small text-muted">
                <i class="fas fa-calculator me-1"></i>
                <strong>Fórmula:</strong> Volume (cm³) × Densidade (g/cm³) × 1,2 (margem de segurança)
            </div>
        </div>
    `;
}

