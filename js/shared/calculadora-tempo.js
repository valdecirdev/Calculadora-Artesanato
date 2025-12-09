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
    
    // Calcular tempo médio por peça em minutos
    const tempoMinutosPorPeca = tempoTrabalho * 60;
    
    // Calcular valor por minuto
    const valorPorMinuto = valorHora / 60;
    
    // Exibir resultados
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-clock me-2"></i>Resultado do Cálculo de Mão de Obra</h5>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <strong>Tempo por Peça:</strong>
                    <div class="result-value">${tempoTrabalho.toFixed(2).replace('.', ',')} horas</div>
                    <div class="small text-muted mt-1">
                        ${Math.floor(tempoMinutosPorPeca)} minutos por peça
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Valor da Hora de Trabalho:</strong>
                    <div class="result-value">${formatarMoeda(valorHora)}</div>
                    <div class="small text-muted mt-1">
                        ${formatarMoeda(valorPorMinuto)} por minuto
                    </div>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <strong>Tempo Total:</strong>
                    <div class="result-value">${formatarTempo()}</div>
                    <div class="small text-muted">
                        (${tempoTotal.toFixed(2).replace('.', ',')} horas para ${quantidadePecas} peça${quantidadePecas !== 1 ? 's' : ''})
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Quantidade de Peças:</strong>
                    <div class="result-value">${quantidadePecas}</div>
                    <div class="small text-muted mt-1">
                        Produzidas no tempo informado
                    </div>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-2">
                    <strong>Custo Total de Mão de Obra:</strong>
                    <div class="result-value text-success">${formatarMoeda(custoTotalMaoObra)}</div>
                    <div class="small text-muted mt-1">
                        Valor total para ${quantidadePecas} peça${quantidadePecas !== 1 ? 's' : ''}
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Custo de Mão de Obra por Peça:</strong>
                    <div class="result-value text-success">${formatarMoeda(custoPorPeca)}</div>
                    <div class="small text-muted mt-1">
                        Use este valor na precificação
                    </div>
                </div>
            </div>
            
            <div class="alert alert-info mt-3">
                <i class="fas fa-lightbulb me-2"></i>
                <strong>Como definir o valor da sua hora de trabalho:</strong>
                <ul class="small mt-2 mb-0">
                    <li><strong>Método 1 - Baseado em salário:</strong> Se você trabalhasse CLT, quanto ganharia? Divida por 160 horas/mês.</li>
                    <li><strong>Método 2 - Baseado em mercado:</strong> Pesquise quanto outros artesãos cobram por hora na sua região.</li>
                    <li><strong>Método 3 - Baseado em experiência:</strong> Iniciantes: R$ 15-25/h. Intermediários: R$ 25-40/h. Avançados: R$ 40-60/h+.</li>
                    <li><strong>Dica:</strong> Não se subestime! Seu tempo e habilidade têm valor. Considere sua experiência, qualidade do trabalho e complexidade da peça.</li>
                </ul>
            </div>
            
            <div class="mt-3">
                <strong><i class="fas fa-chart-line me-2"></i>Análise de Produtividade:</strong>
                <div class="small mt-2">
                    <div>Você produz <strong>${(60 / tempoMinutosPorPeca).toFixed(2).replace('.', ',')}</strong> peças por hora trabalhada.</div>
                    <div>Seu ganho por hora trabalhada: <strong>${formatarMoeda(custoPorPeca * (60 / tempoMinutosPorPeca))}</strong></div>
                </div>
            </div>
        </div>
    `;
}

