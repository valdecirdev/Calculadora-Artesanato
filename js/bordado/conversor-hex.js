// Conversor de Hexadecimal para Anchor, DMC e Maxi

function initConversorHex() {
    // Pode adicionar inicializações específicas se necessário
}

function converterHex() {
    const resultadoDiv = document.getElementById('resultado-conversor-hex');
    resultadoDiv.innerHTML = '';
    
    const hexInput = document.getElementById('hex-input').value.trim();
    const mostrarDescontinuadas = document.getElementById('mostrar-descontinuadas-hex').checked;
    
    // Validar entrada
    if (!hexInput) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe um valor hexadecimal.</div>';
        return;
    }
    
    // Converter hex para RGB
    const rgb = hexParaRGB(hexInput);
    
    if (!rgb) {
        resultadoDiv.innerHTML = '<div class="alert alert-danger">Valor hexadecimal inválido. Use formato #RRGGBB ou RRGGBB.</div>';
        return;
    }
    
    // Encontrar cores mais próximas
    const resultados = encontrarCoresMaisProximas(rgb.r, rgb.g, rgb.b, 5, mostrarDescontinuadas);
    
    // Exibir cor original
    const corOriginal = formatarRGB(rgb.r, rgb.g, rgb.b);
    const hexFormatado = formatarHex(rgb.r, rgb.g, rgb.b);
    
    // Construir HTML do resultado
    let html = `
        <div class="result-card">
            <h5><i class="fas fa-palette me-2"></i>Resultado da Conversão</h5>
            
            <div class="mb-4">
                <strong>Cor Original:</strong>
                <div class="d-flex align-items-center mt-2">
                    <div class="color-preview me-3" style="width: 60px; height: 60px; background-color: ${corOriginal}; border: 2px solid #ddd; border-radius: 4px;"></div>
                    <div>
                        <div><strong>Hex:</strong> ${hexFormatado}</div>
                        <div><strong>RGB:</strong> ${rgb.r}, ${rgb.g}, ${rgb.b}</div>
                    </div>
                </div>
            </div>
            
            <div class="row">
    `;
    
    // Exibir resultados para cada marca
    ['Anchor', 'DMC', 'Maxi'].forEach(marca => {
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
            <div class="mt-3 small text-muted">
                <i class="fas fa-info-circle me-1"></i>
                As cores são ordenadas por proximidade (menor distância = mais próxima)
            </div>
        </div>
    `;
    
    resultadoDiv.innerHTML = html;
}
