// Funções utilitárias para formatação brasileira

// Converte valor de entrada (aceita vírgula) para número
function parseValorBrasileiro(valor) {
    if (!valor || valor === '') return null;
    // Substitui vírgula por ponto para parseFloat
    const valorLimpo = String(valor).replace(',', '.');
    return parseFloat(valorLimpo);
}

// Formata número para exibição com vírgula
function formatarNumeroBrasileiro(numero, casasDecimais = 2) {
    if (numero === null || numero === undefined || isNaN(numero)) return '';
    
    // Se for inteiro, retorna sem decimais
    if (numero % 1 === 0) {
        return numero.toString();
    }
    
    // Formata com casas decimais e substitui ponto por vírgula
    return numero.toFixed(casasDecimais).replace('.', ',');
}

// Configura input para aceitar vírgula como separador decimal
function configurarInputBrasileiro(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    // Remove listeners anteriores se existirem (evita duplicação)
    const novoInput = input.cloneNode(true);
    input.parentNode.replaceChild(novoInput, input);
    const inputConfigurado = document.getElementById(inputId);
    
    // Permite digitar vírgula
    inputConfigurado.addEventListener('input', function(e) {
        let valor = this.value;
        
        // Remove caracteres inválidos, mantendo números, vírgula e ponto
        valor = valor.replace(/[^\d,.-]/g, '');
        
        // Se tiver ponto e vírgula, mantém apenas a última
        const ultimaVirgula = valor.lastIndexOf(',');
        const ultimoPonto = valor.lastIndexOf('.');
        
        if (ultimaVirgula > ultimoPonto) {
            // Remove pontos se vírgula vier depois
            valor = valor.replace(/\./g, '');
        } else if (ultimoPonto > ultimaVirgula) {
            // Remove vírgulas se ponto vier depois e converte para vírgula
            valor = valor.replace(/,/g, '').replace('.', ',');
        }
        
        // Permite apenas uma vírgula ou ponto
        const partes = valor.split(/[,.]/);
        if (partes.length > 2) {
            valor = partes[0] + ',' + partes.slice(1).join('');
        }
        
        this.value = valor;
    });
    
    // Ao perder o foco, formata o valor se necessário
    inputConfigurado.addEventListener('blur', function() {
        const valor = parseValorBrasileiro(this.value);
        if (valor !== null && !isNaN(valor) && this.value.trim() !== '') {
            // Determina casas decimais baseado no step
            const step = this.getAttribute('step') || '0.01';
            const casasDecimais = step.includes('.') ? step.split('.')[1].length : (step.includes(',') ? step.split(',')[1].length : 0);
            this.value = formatarNumeroBrasileiro(valor, casasDecimais);
        }
    });
}

