// Lógica de conversão de cores - Inspirada em inspiracao.js
// Arquivo simples e de fácil manutenção para conversão entre cores

const hexToDecimal = hex => parseInt(hex, 16);

// Função para calcular distância entre duas cores RGB
function distancia(r1, g1, b1, r2, g2, b2) {
    return Math.hypot(r1 - r2, g1 - g2, b1 - b2);
}

// Função para encontrar as cores mais próximas em cada marca
function encontrarCoresMaisProximas(r, g, b, quantidade = 5, mostrarDescontinuadas = true) {
    const marcas = [
        { nome: 'Anchor', dados: ANCHOR },
        { nome: 'DMC', dados: DMC },
        { nome: 'Maxi', dados: MAXI }
    ];
    
    const resultados = {};
    
    marcas.forEach(marca => {
        // Filtrar cores descontinuadas se necessário (apenas para Anchor)
        let dadosFiltrados = marca.dados;
        if (marca.nome === 'Anchor' && !mostrarDescontinuadas) {
            dadosFiltrados = marca.dados.filter(cor => !isDescontinuada(cor[0]));
        }
        
        // Criar cópia do array e ordenar por distância
        const coresOrdenadas = dadosFiltrados
            .map(cor => ({
                codigo: cor[0],
                r: cor[1],
                g: cor[2],
                b: cor[3],
                distancia: distancia(r, g, b, cor[1], cor[2], cor[3])
            }))
            .sort((a, b) => a.distancia - b.distancia)
            .slice(0, quantidade);
        
        resultados[marca.nome] = coresOrdenadas;
    });
    
    return resultados;
}

// Função para converter hexadecimal para RGB
function hexParaRGB(hex) {
    hex = hex.replace(/^#/, '');
    
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    
    if (hex.length !== 6) {
        return null;
    }
    
    const r = hexToDecimal(hex.substring(0, 2));
    const g = hexToDecimal(hex.substring(2, 4));
    const b = hexToDecimal(hex.substring(4, 6));
    
    return { r, g, b };
}

// Função para encontrar cor por código em uma marca específica
function encontrarCorPorCodigo(codigo, marca) {
    let dados;
    
    switch(marca.toLowerCase()) {
        case 'anchor':
            dados = ANCHOR;
            break;
        case 'dmc':
            dados = DMC;
            break;
        case 'maxi':
            dados = MAXI;
            break;
        default:
            return null;
    }
    
    const cor = dados.find(c => c[0] == codigo);
    if (!cor) return null;
    
    return {
        codigo: cor[0],
        r: cor[1],
        g: cor[2],
        b: cor[3]
    };
}

// Função para converter entre marcas (encontrar equivalente)
function converterEntreMarcas(codigoOrigem, marcaOrigem, marcaDestino, mostrarDescontinuadas = true) {
    const corOrigem = encontrarCorPorCodigo(codigoOrigem, marcaOrigem);
    
    if (!corOrigem) {
        return null;
    }
    
    // Encontrar a cor mais próxima na marca destino
    const resultados = encontrarCoresMaisProximas(
        corOrigem.r, 
        corOrigem.g, 
        corOrigem.b, 
        5,
        mostrarDescontinuadas
    );
    
    return {
        origem: {
            marca: marcaOrigem,
            codigo: corOrigem.codigo,
            rgb: { r: corOrigem.r, g: corOrigem.g, b: corOrigem.b }
        },
        destino: resultados[marcaDestino] || []
    };
}

// Função para verificar se uma cor Anchor está descontinuada
function isDescontinuada(codigo) {
    return DESCONTINUADAS && DESCONTINUADAS.includes(codigo);
}

// Função para formatar cor RGB para exibição
function formatarRGB(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}

// Função para formatar hexadecimal
function formatarHex(r, g, b) {
    const toHex = (n) => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}
