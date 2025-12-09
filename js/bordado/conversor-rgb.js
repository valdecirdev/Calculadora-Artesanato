// Conversor de RGB para Anchor, Maxi e DMC

function initConversorRGB() {
    // Pode adicionar inicializações específicas se necessário
}

function converterRGB() {
    const resultadoDiv = document.getElementById('resultado-conversor-rgb');
    resultadoDiv.innerHTML = '';
    
    const r = parseInt(document.getElementById('rgb-r').value);
    const g = parseInt(document.getElementById('rgb-g').value);
    const b = parseInt(document.getElementById('rgb-b').value);
    const mostrarDescontinuadas = document.getElementById('mostrar-descontinuadas-rgb').checked;
    
    // Validar entradas
    if (isNaN(r) || r < 0 || r > 255) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe um valor válido para R (0-255).</div>';
        return;
    }
    
    if (isNaN(g) || g < 0 || g > 255) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe um valor válido para G (0-255).</div>';
        return;
    }
    
    if (isNaN(b) || b < 0 || b > 255) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe um valor válido para B (0-255).</div>';
        return;
    }
    
    // Encontrar cores mais próximas
    const resultados = encontrarCoresMaisProximas(r, g, b, 5, mostrarDescontinuadas);
    
    // Exibir cor original
    const corOriginal = formatarRGB(r, g, b);
    const hexFormatado = formatarHex(r, g, b);
    
    // Construir HTML do resultado
    let html = `
        <div class="result-card">
            <h5><i class="fas fa-palette me-2"></i>Resultado da Conversão</h5>
            
            <div class="mb-4">
                <strong>Cor Original:</strong>
                <div class="d-flex align-items-center mt-2">
                    <div class="color-preview me-3" style="width: 60px; height: 60px; background-color: ${corOriginal}; border: 2px solid #ddd; border-radius: 4px;"></div>
                    <div>
                        <div><strong>RGB:</strong> ${r}, ${g}, ${b}</div>
                        <div><strong>Hex:</strong> ${hexFormatado}</div>
                    </div>
                </div>
            </div>
            
            <div class="row">
    `;
    
    // Exibir resultados para cada marca (na ordem solicitada: Anchor, Maxi, DMC)
    ['Anchor', 'Maxi', 'DMC'].forEach(marca => {
        const cores = resultados[marca];
        
        html += `
            <div class="col-md-4 mb-3">
                <h6 class="mb-3">${marca}</h6>
                <div class="cores-lista">
        `;
        
        cores.forEach((cor, index) => {
            const corRGB = formatarRGB(cor.r, cor.g, cor.b);
            const descontinuada = marca === 'Anchor' && isDescontinuada(cor.codigo);
            const badgeDescontinuada = descontinuada ? ' <span class="badge bg-warning text-dark">Descontinuada</span>' : '';
            
            html += `
                <div class="cor-item mb-2 p-2 border rounded">
                    <div class="d-flex align-items-center">
                        <div class="color-preview me-2" style="width: 40px; height: 40px; background-color: ${corRGB}; border: 1px solid #ddd; border-radius: 4px;"></div>
                        <div class="flex-grow-1">
                            <div><strong>${cor.codigo}</strong>${badgeDescontinuada}</div>
                            <div class="small text-muted">RGB: ${cor.r}, ${cor.g}, ${cor.b}</div>
                            <div class="small text-muted">Distância: ${cor.distancia.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
            
            <div class="alert alert-info mt-3">
                <i class="fas fa-info-circle me-2"></i>
                <strong>Como interpretar os resultados:</strong>
                <ul class="small mt-2 mb-0">
                    <li><strong>Distância:</strong> Mede a diferença entre a cor original e a cor da linha. Quanto menor, mais próxima.</li>
                    <li><strong>Distância 0-10:</strong> Cor quase idêntica, excelente correspondência.</li>
                    <li><strong>Distância 10-30:</strong> Cor muito próxima, boa correspondência.</li>
                    <li><strong>Distância 30-50:</strong> Cor similar, pode funcionar dependendo do projeto.</li>
                    <li><strong>Distância >50:</strong> Cor diferente, considere outras opções.</li>
                </ul>
            </div>
            
            <div class="mt-3">
                <strong><i class="fas fa-lightbulb me-2"></i>Dicas para Escolher a Cor:</strong>
                <ul class="small mt-2 mb-0">
                    <li>Sempre escolha a cor com <strong>menor distância</strong> para melhor correspondência.</li>
                    <li>Compare visualmente as cores usando os previews ao lado de cada código.</li>
                    <li>Considere o contexto: para detalhes pequenos, use a cor mais próxima. Para áreas grandes, pequenas diferenças podem ser aceitáveis.</li>
                    <li>Se a primeira opção estiver descontinuada (Anchor), considere a segunda opção disponível.</li>
                    <li>Teste a cor em um pedaço de tecido antes de usar no projeto final.</li>
                </ul>
            </div>
            
            <div class="mt-3 small text-muted">
                <i class="fas fa-info-circle me-1"></i>
                As cores são ordenadas por proximidade (menor distância = mais próxima). A primeira cor de cada marca é a melhor correspondência.
            </div>
        </div>
    `;
    
    resultadoDiv.innerHTML = html;
}
