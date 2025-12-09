// Checklist de Início de Projeto - Isolada e independente

const tiposProjeto = {
    'bordado-livre': {
        titulo: 'Bordado Livre em Bastidor',
        descricao: 'Materiais essenciais para começar a bordar em algodão cru ou tecidos planos.',
        materiais: [
            { item: 'Bastidor', detalhe: 'De madeira ou plástico (recomendado 14cm a 20cm para iniciantes).' },
            { item: 'Tecido', detalhe: 'Algodão Cru, Tricoline ou Linho (cor clara ajuda a visualizar).' },
            { item: 'Agulhas', detalhe: 'Nº 7, 8 ou 9 com ponta afiada.' },
            { item: 'Linhas de Meada', detalhe: 'Cores variadas (Anchor, DMC ou Maxi).' },
            { item: 'Tesoura', detalhe: 'Uma pequena de precisão para linhas e uma para tecido.' },
            { item: 'Transferência', detalhe: 'Caneta Fantasminha (apaga com calor) ou Carbono para tecido.' },
            { item: 'Organização', detalhe: 'Plaquinhas para enrolar as meadas.' }
        ]
    },
    'ponto-cruz': {
        titulo: 'Ponto Cruz',
        descricao: 'Materiais específicos para a técnica de contar pontos.',
        materiais: [
            { item: 'Tecido', detalhe: 'Étamine ou Aida (Cânhamo) - 14ct é bom para começar.' },
            { item: 'Agulhas', detalhe: 'Sem ponta (arredondada), números 24 ou 26.' },
            { item: 'Gráfico', detalhe: 'O desenho impresso ou digital para seguir.' },
            { item: 'Linhas de Meada', detalhe: 'Nas cores exatas pedidas pelo gráfico.' },
            { item: 'Tesoura', detalhe: 'Pequena de precisão.' },
            { item: 'Bastidor', detalhe: 'Opcional, mas ajuda a manter a tensão do tecido.' }
        ]
    },
    'roupas': {
        titulo: 'Bordado em Roupas/Bonés',
        descricao: 'Itens extras para bordar em peças prontas e tecidos com elasticidade.',
        materiais: [
            { item: 'Peça de Roupa', detalhe: 'Sugerido: Camiseta de algodão ou jaqueta jeans.' },
            { item: 'Entretela', detalhe: 'Hidrossolúvel (some na água) ou Fixa (para dar estabilidade).' },
            { item: 'Agulhas', detalhe: 'Com ponta afiada, reforçadas se for jeans.' },
            { item: 'Bastidor', detalhe: 'Tamanho adequado que caiba na área a ser bordada.' },
            { item: 'Dedal', detalhe: 'Protege o dedo ao empurrar a agulha em tecidos grossos.' },
            { item: 'Estabilizador', detalhe: 'Se o tecido estica (malha), a entretela é obrigatória.' }
        ]
    }
};

function initChecklistProjeto() {
    // Inicialização se necessária
}

function gerarChecklist() {
    const resultadoDiv = document.getElementById('resultado-checklist');
    const selectTipo = document.getElementById('tipo-projeto');
    const tipo = selectTipo.value;

    if (!tipo || !tiposProjeto[tipo]) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, selecione um tipo de projeto.</div>';
        return;
    }

    const projeto = tiposProjeto[tipo];

    let htmlLista = `
        <div class="result-card">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="mb-0"><i class="fas fa-list-check me-2"></i>${projeto.titulo}</h5>
                <button class="btn btn-sm btn-outline-secondary" onclick="copiarChecklist('${tipo}')">
                    <i class="fas fa-copy me-1"></i> Copiar
                </button>
            </div>
            
            <p class="text-muted mb-4">${projeto.descricao}</p>
            
            <div class="list-group">
    `;

    projeto.materiais.forEach((material, index) => {
        htmlLista += `
            <label class="list-group-item d-flex gap-3 align-items-start">
                <input class="form-check-input flex-shrink-0" type="checkbox" value="" id="item-${index}">
                <span>
                    <strong>${material.item}</strong>
                    <br>
                    <small class="text-muted">${material.detalhe}</small>
                </span>
            </label>
        `;
    });

    htmlLista += `
            </div>
            
            <div class="alert alert-info mt-3 mb-0">
                <i class="fas fa-lightbulb me-2"></i>
                <small>Dica: Marque os itens que você já separou!</small>
            </div>
        </div>
    `;

    resultadoDiv.innerHTML = htmlLista;
}

function copiarChecklist(tipo) {
    const projeto = tiposProjeto[tipo];
    if (!projeto) return;

    let texto = `*Checklist: ${projeto.titulo}*\n\n`;
    projeto.materiais.forEach(m => {
        texto += `[ ] ${m.item}: ${m.detalhe}\n`;
    });

    texto += `\nGerado por ArteCalc`;

    navigator.clipboard.writeText(texto).then(() => {
        const btn = document.querySelector('button[onclick^="copiarChecklist"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-check me-1"></i> Copiado!';
        btn.classList.remove('btn-outline-secondary');
        btn.classList.add('btn-success');

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('btn-success');
            btn.classList.add('btn-outline-secondary');
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        alert('Não foi possível copiar automaticamente.');
    });
}
