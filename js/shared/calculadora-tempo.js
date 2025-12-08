// Calculadora de Tempo e Mão de Obra - Isolada e independente

function initCalculadoraTempo() {
    // Pode adicionar inicializações específicas se necessário
}

function calcularTempo() {
    // Limpar resultado anterior
    const resultadoDiv = document.getElementById('resultado-tempo');
    resultadoDiv.innerHTML = '';
    
    // Obter valores dos inputs (aceita vírgula)
    const tempoTrabalho = parseValorBrasileiro(document.getElementById('tempo-trabalho').value);
    const valorHora = parseValorBrasileiro(document.getElementById('valor-hora').value);
    const quantidadePecas = parseValorBrasileiro(document.getElementById('quantidade-pecas').value) || 1;
    
    // Validar entradas
    if (!tempoTrabalho || tempoTrabalho <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe o tempo de trabalho em horas.</div>';
        return;
    }
    
    if (!valorHora || valorHora <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe o valor da hora de trabalho.</div>';
        return;
    }
    
    if (!quantidadePecas || quantidadePecas <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, informe a quantidade de peças produzidas.</div>';
        return;
    }
    
    // Calcular valores
    const tempoTotal = tempoTrabalho * quantidadePecas;
    const custoTotalMaoObra = tempoTotal * valorHora;
    const custoPorPeca = custoTotalMaoObra / quantidadePecas;
    
    // Converter horas para formato legível (horas e minutos)
    const horas = Math.floor(tempoTotal);
    const minutos = Math.round((tempoTotal - horas) * 60);
    
    // Formatar valores para exibição
    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };
    
    const formatarTempo = () => {
        if (horas === 0) {
            return `${minutos} minuto${minutos !== 1 ? 's' : ''}`;
        } else if (minutos === 0) {
            return `${horas} hora${horas !== 1 ? 's' : ''}`;
        } else {
            return `${horas} hora${horas !== 1 ? 's' : ''} e ${minutos} minuto${minutos !== 1 ? 's' : ''}`;
        }
    };
    
    // Exibir resultados
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-clock me-2"></i>Resultado do Cálculo</h5>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <strong>Tempo por Peça:</strong>
                    <div class="result-value">${tempoTrabalho.toFixed(2).replace('.', ',')} horas</div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Valor da Hora:</strong>
                    <div class="result-value">${formatarMoeda(valorHora)}</div>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <strong>Tempo Total:</strong>
                    <div class="result-value">${formatarTempo()}</div>
                    <div class="small text-muted">(${tempoTotal.toFixed(2).replace('.', ',')} horas)</div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Quantidade de Peças:</strong>
                    <div class="result-value">${quantidadePecas}</div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-6 mb-2">
                    <strong>Custo Total de Mão de Obra:</strong>
                    <div class="result-value text-success">${formatarMoeda(custoTotalMaoObra)}</div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Custo por Peça:</strong>
                    <div class="result-value text-success">${formatarMoeda(custoPorPeca)}</div>
                </div>
            </div>
        </div>
    `;
}

