// Conversor entre Anchor, Maxi e DMC

function initConversorLinhas() {
    // Pode adicionar inicializações específicas se necessário
}

function converterLinhas() {
    const resultadoDiv = document.getElementById('resultado-conversor-linhas');
    resultadoDiv.innerHTML = '';
    
    const codigo = document.getElementById('codigo-linha').value.trim();
    const marcaOrigem = document.getElementById('marca-origem').value;
    const marcaDestino = document.getElementById('marca-destino').value;
    const mostrarDescontinuadas = document.getElementById('mostrar-descontinuadas-linhas').checked;
    
    // Validar entradas
    if (!codigo) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe o código da linha.</div>';
        return;
    }
    
    if (!marcaOrigem) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, selecione a marca de origem.</div>';
        return;
    }
    
    if (!marcaDestino) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, selecione a marca de destino.</div>';
        return;
    }
    
    if (marcaOrigem === marcaDestino) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">As marcas de origem e destino devem ser diferentes.</div>';
        return;
    }
    
    // Converter entre marcas
    const resultado = converterEntreMarcas(codigo, marcaOrigem, marcaDestino, mostrarDescontinuadas);
    
    if (!resultado) {
        resultadoDiv.innerHTML = `<div class="alert alert-danger">Código ${codigo} não encontrado na marca ${marcaOrigem}.</div>`;
        return;
    }
    
    const origem = resultado.origem;
    const destinos = resultado.destino;
    
    if (destinos.length === 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Nenhuma cor equivalente encontrada.</div>';
        return;
    }
    
    // Exibir cor de origem
    const corOrigemRGB = formatarRGB(origem.rgb.r, origem.rgb.g, origem.rgb.b);
    const hexOrigem = formatarHex(origem.rgb.r, origem.rgb.g, origem.rgb.b);
    
    // Construir HTML do resultado
    let html = `
        <div class="result-card">
            <h5><i class="fas fa-exchange-alt me-2"></i>Resultado da Conversão</h5>
            
            <div class="mb-4">
                <strong>Cor de Origem (${origem.marca}):</strong>
                <div class="d-flex align-items-center mt-2">
                    <div class="color-preview me-3" style="width: 60px; height: 60px; background-color: ${corOrigemRGB}; border: 2px solid #ddd; border-radius: 4px;"></div>
                    <div>
                        <div><strong>Código:</strong> ${origem.codigo}</div>
                        <div><strong>RGB:</strong> ${origem.rgb.r}, ${origem.rgb.g}, ${origem.rgb.b}</div>
                        <div><strong>Hex:</strong> ${hexOrigem}</div>
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <strong>Cores Equivalentes em ${marcaDestino}:</strong>
                <div class="cores-lista mt-2">
    `;
    
    destinos.forEach((cor, index) => {
        const corRGB = formatarRGB(cor.r, cor.g, cor.b);
        const hexCor = formatarHex(cor.r, cor.g, cor.b);
        const descontinuada = marcaDestino === 'Anchor' && isDescontinuada(cor.codigo);
        const badgeDescontinuada = descontinuada ? ' <span class="badge bg-warning text-dark">Descontinuada</span>' : '';
        const badgeMelhor = index === 0 ? ' <span class="badge bg-success">Mais próxima</span>' : '';
        
        html += `
            <div class="cor-item mb-2 p-2 border rounded ${index === 0 ? 'border-success border-2' : ''}">
                <div class="d-flex align-items-center">
                    <div class="color-preview me-2" style="width: 50px; height: 50px; background-color: ${corRGB}; border: 1px solid #ddd; border-radius: 4px;"></div>
                    <div class="flex-grow-1">
                        <div><strong>${cor.codigo}</strong>${badgeMelhor}${badgeDescontinuada}</div>
                        <div class="small text-muted">RGB: ${cor.r}, ${cor.g}, ${cor.b}</div>
                        <div class="small text-muted">Hex: ${hexCor}</div>
                        <div class="small text-muted">Distância: ${cor.distancia.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
            
            <div class="alert alert-info mt-3">
                <i class="fas fa-info-circle me-2"></i>
                <strong>Como interpretar os resultados:</strong>
                <ul class="small mt-2 mb-0">
                    <li><strong>Distância:</strong> Mede a diferença entre a cor original (${origem.marca} ${origem.codigo}) e a cor equivalente. Quanto menor, mais próxima.</li>
                    <li><strong>Distância 0-10:</strong> Cor quase idêntica, excelente correspondência.</li>
                    <li><strong>Distância 10-30:</strong> Cor muito próxima, boa correspondência.</li>
                    <li><strong>Distância 30-50:</strong> Cor similar, pode funcionar dependendo do projeto.</li>
                    <li><strong>Distância >50:</strong> Cor diferente, considere outras opções ou marcas.</li>
                </ul>
            </div>
            
            <div class="mt-3">
                <strong><i class="fas fa-lightbulb me-2"></i>Dicas para Escolher a Cor Equivalente:</strong>
                <ul class="small mt-2 mb-0">
                    <li>A primeira cor (marcada em verde) é a <strong>mais próxima</strong> da cor original.</li>
                    <li>Compare visualmente as cores usando os previews para ver qual combina melhor com seu projeto.</li>
                    <li>Se a primeira opção estiver descontinuada (Anchor), a segunda opção geralmente é uma boa alternativa.</li>
                    <li>Considere a disponibilidade: verifique se a cor está disponível na sua região antes de comprar.</li>
                    <li>Para projetos grandes, teste a cor em um pedaço de tecido antes de comprar grandes quantidades.</li>
                    <li>Lembre-se: cores podem parecer diferentes sob diferentes iluminações. Teste em condições similares ao uso final.</li>
                </ul>
            </div>
            
            <div class="mt-3 small text-muted">
                <i class="fas fa-info-circle me-1"></i>
                As cores são ordenadas por proximidade. A primeira é a mais próxima da cor original (${origem.marca} ${origem.codigo}).
            </div>
        </div>
    `;
    
    resultadoDiv.innerHTML = html;
}
