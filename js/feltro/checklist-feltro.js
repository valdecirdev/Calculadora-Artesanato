// Checklist de Início de Projeto (Feltro) - Isolada e independente

const tiposProjetoFeltro = {
    'bonecos': {
        titulo: 'Bonecos e Personagens 3D',
        descricao: 'Materiais para criar bonecos estruturados e fofinhos em feltro.',
        materiais: [
            { item: 'Feltros', detalhe: 'Nas cores do personagem (Santa Fé é uma boa marca).' },
            { item: 'Enchimento', detalhe: 'Fibra Siliconada Antialérgica (para deixar fofinho).' },
            { item: 'Linhas', detalhe: 'De costura (Drima/Corrente) ou meada nas cores do feltro.' },
            { item: 'Agulhas', detalhe: 'Nº 7 para casear e uma mais longa para transpassar membros.' },
            { item: 'Cola', detalhe: 'Cola de Silicone Líquida (uso frio) e Cola Quente.' },
            { item: 'Tesouras', detalhe: 'Uma grande para cortar feltro e uma pequena para precisão.' },
            { item: 'Marcação', detalhe: 'Caneta Fantasminha ou lápis 6B.' },
            { item: 'Estrutura', detalhe: 'Palito de churrasco ou arame galvanizado (para pescoço).' }
        ]
    },
    'guirlandas': {
        titulo: 'Guirlandas de Maternidade',
        descricao: 'Itens essenciais para montar guirlandas decorativas.',
        materiais: [
            { item: 'Base da Guirlanda', detalhe: 'Papelão Holler, MDF ou base pronta de isopor.' },
            { item: 'Feltros', detalhe: 'Para forrar a base e fazer os enfeites.' },
            { item: 'Manta R2', detalhe: 'Para deixar a base acolchoada antes de forrar.' },
            { item: 'Tecido Tricoline', detalhe: 'Opcional, para compor com o feltro na base.' },
            { item: 'Fitas', detalhe: 'Cetim ou Gorgurão para laços e alça de pendurar.' },
            { item: 'Cola Quente', detalhe: 'Essencial para montagem rápida e firme.' },
            { item: 'Moldes', detalhe: 'Letras e desenhos impressos no tamanho correto.' }
        ]
    },
    'lembrancinhas': {
        titulo: 'Chaveiros e Lembrancinhas',
        descricao: 'Materiais para produção em série de peças pequenas.',
        materiais: [
            { item: 'Feltros', detalhe: 'Cores principais e secundárias.' },
            { item: 'Argolas', detalhe: 'Argolas de chaveiro com correntinha.' },
            { item: 'Fitas Finas', detalhe: 'Fita de cetim nº 0 ou 1 para prender a argola.' },
            { item: 'Embalagem', detalhe: 'Saquinhos de celofane e fitilho.' },
            { item: 'Tags', detalhe: 'Cartõezinhos personalizados para agradecer.' },
            { item: 'Enchimento', detalhe: 'Fibra siliconada (pouca quantidade recisa).' },
            { item: 'Cola', detalhe: 'Silicone líquida agiliza a produção.' }
        ]
    }
};

let checklistFeltroAtual = [];
let tituloFeltroAtual = '';

function initChecklistFeltro() {
    // Inicialização se necessária
}

function gerarChecklistFeltro() {
    const resultadoDiv = document.getElementById('resultado-checklist-feltro');
    const selectTipo = document.getElementById('tipo-projeto-feltro');
    const tipo = selectTipo.value;

    if (!tipo || !tiposProjetoFeltro[tipo]) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Por favor, selecione um tipo de projeto.</div>';
        return;
    }

    // Inicializa estado
    const projeto = tiposProjetoFeltro[tipo];
    checklistFeltroAtual = JSON.parse(JSON.stringify(projeto.materiais));
    tituloFeltroAtual = projeto.titulo;

    renderizarChecklistFeltro();
}

function renderizarChecklistFeltro() {
    const resultadoDiv = document.getElementById('resultado-checklist-feltro');
    if (!resultadoDiv) return;

    let htmlLista = `
        <div class="result-card">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="mb-0"><i class="fas fa-list-check me-2"></i>${tituloFeltroAtual}</h5>
                <button class="btn btn-sm btn-outline-secondary" onclick="copiarChecklistFeltro()">
                    <i class="fas fa-copy me-1"></i> Copiar
                </button>
            </div>
            
            <div class="mb-4">
                <small class="text-muted d-block mb-2"><i class="fas fa-edit me-1"></i> Personalize sua lista: edite os textos, apague ou adicione itens.</small>
                <div class="list-group" id="lista-checks-feltro">
    `;

    checklistFeltroAtual.forEach((material, index) => {
        htmlLista += `
            <div class="list-group-item d-flex gap-2 align-items-start bg-light-hover">
                <div class="pt-2">
                    <input class="form-check-input" type="checkbox" value="" id="check-feltro-${index}">
                </div>
                <div class="flex-grow-1">
                    <input type="text" class="form-control form-control-sm mb-1 fw-bold border-0 bg-transparent edit-input" 
                           value="${material.item}" 
                           placeholder="Nome do item"
                           onchange="atualizarItemFeltro(${index}, 'item', this.value)">
                    <input type="text" class="form-control form-control-sm text-muted border-0 bg-transparent edit-input" 
                           value="${material.detalhe}" 
                           placeholder="Detalhes..."
                           onchange="atualizarItemFeltro(${index}, 'detalhe', this.value)">
                </div>
                <button class="btn btn-sm text-danger btn-icon-only" onclick="removerItemFeltro(${index})" title="Remover item">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    });

    htmlLista += `
                </div>
                <button class="btn btn-sm btn-outline-primary mt-3 w-100 dashed-border" onclick="adicionarItemFeltro()">
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

function atualizarItemFeltro(index, campo, valor) {
    if (checklistFeltroAtual[index]) {
        checklistFeltroAtual[index][campo] = valor;
    }
}

function removerItemFeltro(index) {
    checklistFeltroAtual.splice(index, 1);
    renderizarChecklistFeltro();
}

function adicionarItemFeltro() {
    checklistFeltroAtual.push({ item: 'Novo Item', detalhe: 'Detalhes do item' });
    renderizarChecklistFeltro();
}

function copiarChecklistFeltro() {
    if (checklistFeltroAtual.length === 0) return;

    let texto = `*Checklist Feltro: ${tituloFeltroAtual}*\n\n`;
    checklistFeltroAtual.forEach(m => {
        if (m.item.trim()) {
            texto += `[ ] ${m.item}: ${m.detalhe}\n`;
        }
    });

    texto += `\nGerado por CozyCalc`;

    navigator.clipboard.writeText(texto).then(() => {
        const btn = document.querySelector('button[onclick^="copiarChecklistFeltro"]');
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
