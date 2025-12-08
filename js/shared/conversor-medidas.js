// Conversor de Medidas - Isolado e independente

function initConversorMedidas() {
    // Pode adicionar inicializações específicas se necessário
}

function converterMedida() {
    // Limpar resultado anterior
    const resultadoDiv = document.getElementById('resultado-conversor');
    resultadoDiv.innerHTML = '';
    
    // Obter valores dos inputs (aceita vírgula)
    const valor = parseValorBrasileiro(document.getElementById('valor-converter').value);
    const unidadeOrigem = document.getElementById('unidade-origem').value;
    const unidadeDestino = document.getElementById('unidade-destino').value;
    
    // Validar entrada
    if (valor === null || valor === undefined || isNaN(valor)) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe um valor para converter.</div>';
        return;
    }
    
    // Se as unidades são iguais, não precisa converter
    if (unidadeOrigem === unidadeDestino) {
        const valorFormatado = formatarNumero(valor);
        resultadoDiv.innerHTML = `
            <div class="result-card">
                <h5><i class="fas fa-exchange-alt me-2"></i>Resultado</h5>
                <div class="result-value">${valorFormatado} ${getUnidadeNome(unidadeDestino)}</div>
                <div class="small text-muted mt-2">As unidades são iguais, não há conversão necessária.</div>
            </div>
        `;
        return;
    }
    
    // Converter para metros primeiro (unidade base)
    let valorEmMetros = converterParaMetros(valor, unidadeOrigem);
    
    // Converter de metros para unidade destino
    let valorConvertido = converterDeMetros(valorEmMetros, unidadeDestino);
    
    // Formatar valores de forma inteligente
    const valorFormatado = formatarNumero(valor);
    const valorConvertidoFormatado = formatarNumero(valorConvertido);
    
    // Exibir resultado
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-exchange-alt me-2"></i>Resultado da Conversão</h5>
            <div class="mb-3">
                <div class="small text-muted mb-1">De:</div>
                <div class="h5">${valorFormatado} ${getUnidadeNome(unidadeOrigem)}</div>
            </div>
            <div class="mb-3">
                <div class="small text-muted mb-1">Para:</div>
                <div class="result-value">${valorConvertidoFormatado} ${getUnidadeNome(unidadeDestino)}</div>
            </div>
        </div>
    `;
}

function converterParaMetros(valor, unidade) {
    // Converte qualquer unidade para metros
    switch(unidade) {
        case 'mm':
            return valor / 1000; // 1 metro = 1000 mm
        case 'cm':
            return valor / 100; // 1 metro = 100 cm
        case 'm':
            return valor; // já está em metros
        case 'pol':
            return valor * 0.0254; // 1 polegada = 0.0254 metros
        default:
            return valor;
    }
}

function converterDeMetros(valorEmMetros, unidade) {
    // Converte de metros para a unidade desejada
    switch(unidade) {
        case 'mm':
            return valorEmMetros * 1000; // 1 metro = 1000 mm
        case 'cm':
            return valorEmMetros * 100; // 1 metro = 100 cm
        case 'm':
            return valorEmMetros; // já está em metros
        case 'pol':
            return valorEmMetros / 0.0254; // 1 polegada = 0.0254 metros
        default:
            return valorEmMetros;
    }
}

function getUnidadeNome(unidade) {
    const nomes = {
        'mm': 'milímetros',
        'cm': 'centímetros',
        'm': 'metros',
        'pol': 'polegadas'
    };
    return nomes[unidade] || unidade;
}

function formatarNumero(numero) {
    // Se for um número inteiro, retorna sem decimais
    if (numero % 1 === 0) {
        return numero.toString();
    }
    
    // Determina quantas casas decimais são necessárias (máximo 4)
    // Remove zeros desnecessários à direita
    let formatado = numero.toFixed(4);
    
    // Remove zeros à direita e ponto final se necessário
    formatado = formatado.replace(/\.?0+$/, '');
    
    // Se o número for muito pequeno (< 0.0001), mostra notação científica
    if (numero > 0 && numero < 0.0001) {
        return numero.toExponential(2).replace('.', ',');
    }
    
    // Se o número for muito grande (>= 1000000), mostra notação científica
    if (numero >= 1000000) {
        return numero.toExponential(2).replace('.', ',');
    }
    
    // Substitui ponto por vírgula como separador decimal
    return formatado.replace('.', ',');
}

