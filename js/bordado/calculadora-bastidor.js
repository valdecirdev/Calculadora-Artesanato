// Calculadora de Pano para Bastidor - Isolada e independente

function initCalculadoraBastidor() {
    // Pode adicionar inicializações específicas se necessário
}

function calcularBastidor() {
    // Limpar resultado anterior
    const resultadoDiv = document.getElementById('resultado-bastidor');
    resultadoDiv.innerHTML = '';
    
    // Obter valores dos inputs (aceita vírgula)
    const diametroBastidor = parseValorBrasileiro(document.getElementById('diametro-bastidor').value);
    const margem = parseValorBrasileiro(document.getElementById('margem-trabalho-acabamento').value) || 5;
    
    // Validar entradas
    if (!diametroBastidor || diametroBastidor <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe o diâmetro do bastidor.</div>';
        return;
    }
    
    if (margem < 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">A margem não pode ser negativa.</div>';
        return;
    }
    
    // Calcular tamanho total do pano necessário
    // Para um bastidor redondo, o pano será quadrado
    // Tamanho = diâmetro + (margem * 2)
    // Baseado na informação: 20cm de diâmetro precisa de 30cm x 30cm
    // Isso significa: 30 = 20 + 10, então margem de 5cm de cada lado
    const tamanhoPano = diametroBastidor + (margem * 2);
    
    // Calcular área
    const raioBastidor = diametroBastidor / 2;
    const areaBastidor = Math.PI * raioBastidor * raioBastidor;
    const areaTotal = tamanhoPano * tamanhoPano;
    const areaMargens = areaTotal - areaBastidor;
    
    // Formatar valores para exibição
    const formatarNumero = (num) => {
        if (num % 1 === 0) {
            return num.toString();
        }
        return num.toFixed(2).replace('.', ',');
    };
    
    // Exibir resultados
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-circle me-2"></i>Resultado do Cálculo</h5>
            
            <div class="mb-3">
                <strong>Dimensões do Bastidor:</strong>
                <div class="small mt-2">
                    <div>Diâmetro: ${formatarNumero(diametroBastidor)} cm</div>
                    <div>Raio: ${formatarNumero(raioBastidor)} cm</div>
                    <div>Área do círculo: ${formatarNumero(areaBastidor)} cm²</div>
                </div>
            </div>
            
            <div class="mb-3">
                <strong>Margem Configurada:</strong>
                <div class="small mt-2">
                    <div>Margem de trabalho/acabamento: ${formatarNumero(margem)} cm (cada lado)</div>
                    <div>Margem total (todos os lados): ${formatarNumero(margem * 2)} cm</div>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-12">
                    <strong>Tamanho do Pano Necessário:</strong>
                    <div class="result-value text-success">
                        ${formatarNumero(tamanhoPano)} cm × ${formatarNumero(tamanhoPano)} cm
                    </div>
                    <div class="small text-muted mt-2">
                        Área total: ${formatarNumero(areaTotal)} cm²
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <strong>Detalhamento:</strong>
                <div class="small mt-2">
                    <div>Área do bastidor: ${formatarNumero(areaBastidor)} cm²</div>
                    <div>Área das margens: ${formatarNumero(areaMargens)} cm²</div>
                </div>
            </div>
            
            <div class="alert alert-info mt-3">
                <i class="fas fa-info-circle me-2"></i>
                <small>
                    <strong>Dica:</strong> Recorte um pano quadrado de ${formatarNumero(tamanhoPano)} cm × ${formatarNumero(tamanhoPano)} cm. 
                    Isso garante ${formatarNumero(margem)} cm de margem em cada lado do bastidor, 
                    espaço suficiente para trabalhar durante o bordado e fazer o acabamento final.
                </small>
            </div>
        </div>
    `;
}

