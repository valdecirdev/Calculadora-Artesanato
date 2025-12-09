// Calculadora de Aida (Ponto Cruz) - Isolada e independente

function initCalculadoraAida() {
    // Inicialização se necessária
}

function calcularAida() {
    const resultadoDiv = document.getElementById('resultado-aida');
    resultadoDiv.innerHTML = '';

    // Obter valores
    const larguraPontos = parseInt(document.getElementById('largura-pontos').value);
    const alturaPontos = parseInt(document.getElementById('altura-pontos').value);
    const countTecido = parseInt(document.getElementById('count-tecido').value);
    const margem = parseValorBrasileiro(document.getElementById('margem-aida').value);

    // Validação
    if (!larguraPontos || larguraPontos <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Informe a largura do gráfico em pontos.</div>';
        return;
    }
    if (!alturaPontos || alturaPontos <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Informe a altura do gráfico em pontos.</div>';
        return;
    }
    if (!countTecido) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Selecione o count do tecido.</div>';
        return;
    }
    if (margem === null || isNaN(margem)) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Informe a margem de segurança.</div>';
        return;
    }

    // Cálculos
    // Aida Count = pontos por polegada
    // 1 polegada = 2.54 cm
    // Tamanho cm = (pontos / count) * 2.54

    const larguraBordadoCm = (larguraPontos / countTecido) * 2.54;
    const alturaBordadoCm = (alturaPontos / countTecido) * 2.54;

    // Tamanho do corte = tamanho do bordado + (2 * margem)
    const larguraCorteCm = larguraBordadoCm + (margem * 2);
    const alturaCorteCm = alturaBordadoCm + (margem * 2);

    const formatar = (num) => formatarNumeroBrasileiro(num, 1); // 1 casa decimal é suficiente para medidas de tecido

    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-ruler-combined me-2"></i>Dimensões Calculadas</h5>
            
            <div class="row mb-4">
                <div class="col-md-6 mb-3 mb-md-0">
                    <div class="card h-100 border-primary bg-light">
                        <div class="card-body text-center">
                            <h6 class="text-primary mb-3">Área Bordada</h6>
                            <div class="display-6 mb-2">${formatar(larguraBordadoCm)} x ${formatar(alturaBordadoCm)} cm</div>
                            <small class="text-muted">Apenas o desenho</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100 border-success bg-light">
                        <div class="card-body text-center">
                            <h6 class="text-success mb-3">Tamanho do Corte</h6>
                            <div class="display-6 mb-2 fw-bold">${formatar(larguraCorteCm)} x ${formatar(alturaCorteCm)} cm</div>
                            <small class="text-muted">Incluindo margem de ${formatar(margem)}cm</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="alert alert-info mb-0">
                <i class="fas fa-info-circle me-2"></i>
                <strong>Dica:</strong> Para molduras padrão, considere ajustar a margem para caber em tamanhos comerciais (ex: 20x25, 30x40).
            </div>
        </div>
    `;
}
