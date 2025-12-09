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

let checklistAtual = [];
let tituloAtual = '';

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

    // Inicializa o estado com uma cópia profunda dos dados para não alterar o original
    const projeto = tiposProjeto[tipo];
    checklistAtual = JSON.parse(JSON.stringify(projeto.materiais));
    tituloAtual = projeto.titulo;

    renderizarChecklist();
}

function renderizarChecklist() {
    const resultadoDiv = document.getElementById('resultado-checklist');
    if (!resultadoDiv) return;

    let htmlLista = `
        <div class="result-card">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="mb-0"><i class="fas fa-list-check me-2"></i>${tituloAtual}</h5>
                <button class="btn btn-sm btn-outline-secondary" onclick="copiarChecklist()">
                    <i class="fas fa-copy me-1"></i> Copiar
                </button>
            </div>
            
            <div class="mb-4">
                <small class="text-muted d-block mb-2"><i class="fas fa-edit me-1"></i> Personalize sua lista: edite os textos, apague ou adicione itens.</small>
                <div class="list-group" id="lista-checks">
    `;

    checklistAtual.forEach((material, index) => {
        htmlLista += `
            <div class="list-group-item d-flex gap-2 align-items-start bg-light-hover">
                <div class="pt-2">
                    <input class="form-check-input" type="checkbox" value="" id="check-${index}">
                </div>
                <div class="flex-grow-1">
                    <input type="text" class="form-control form-control-sm mb-1 fw-bold border-0 bg-transparent edit-input" 
                           value="${material.item}" 
                           placeholder="Nome do item"
                           onchange="atualizarItem(${index}, 'item', this.value)">
                    <input type="text" class="form-control form-control-sm text-muted border-0 bg-transparent edit-input" 
                           value="${material.detalhe}" 
                           placeholder="Detalhes..."
                           onchange="atualizarItem(${index}, 'detalhe', this.value)">
                </div>
                <button class="btn btn-sm text-danger btn-icon-only" onclick="removerItem(${index})" title="Remover item">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    });

    htmlLista += `
                </div>
                <button class="btn btn-sm btn-outline-primary mt-3 w-100 dashed-border" onclick="adicionarItem()">
                    <i class="fas fa-plus me-1"></i> Adicionar Item
                </button>
            </div>
            
            <div class="alert alert-info mt-3 mb-0">
                <i class="fas fa-lightbulb me-2"></i>
                <small>As alterações são aplicadas ao clicar em "Copiar".</small>
            </div>
        </div>
    `;

    resultadoDiv.innerHTML = htmlLista;
}

function atualizarItem(index, campo, valor) {
    if (checklistAtual[index]) {
        checklistAtual[index][campo] = valor;
    }
}

function removerItem(index) {
    checklistAtual.splice(index, 1);
    renderizarChecklist();
}

function adicionarItem() {
    checklistAtual.push({ item: 'Novo Item', detalhe: 'Detalhes do item' });
    renderizarChecklist();
}

function copiarChecklist() {
    if (checklistAtual.length === 0) return;

    let texto = `*Checklist: ${tituloAtual}*\n\n`;
    checklistAtual.forEach(m => {
        // Ignora itens com nome vazio
        if (m.item.trim()) {
            texto += `[ ] ${m.item}: ${m.detalhe}\n`;
        }
    });

    texto += `\nGerado por ArteCalc`;

    navigator.clipboard.writeText(texto).then(() => {
        const btn = document.querySelector('button[onclick^="copiarChecklist"]');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check me-1"></i> Copiado!';
            btn.classList.remove('btn-outline-secondary');
            btn.classList.add('btn-success');

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('btn-success');
                btn.classList.add('btn-outline-secondary');
            }, 2000);
        }
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        alert('Não foi possível copiar automaticamente.');
    });
}

// Estilo CSS extra (injetado via JS para não mexer no CSS global agora)
const style = document.createElement('style');
style.innerHTML = `
    .btn-icon-only {
        border: none;
        background: transparent;
        opacity: 0.6;
        transition: opacity 0.2s;
    }
    .btn-icon-only:hover {
        opacity: 1;
        background: rgba(220, 53, 69, 0.1);
    }
    .bg-light-hover:hover {
        background-color: #f8f9fa;
    }
    .edit-input:focus {
        background-color: #fff !important;
        border: 1px solid #ced4da !important;
        box-shadow: none;
    }
    .dashed-border {
        border-style: dashed;
    }
`;
document.head.appendChild(style);
