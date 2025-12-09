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

    const projeto = tiposProjetoFeltro[tipo];

    let htmlLista = `
        <div class="result-card">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="mb-0"><i class="fas fa-list-check me-2"></i>${projeto.titulo}</h5>
                <button class="btn btn-sm btn-outline-secondary" onclick="copiarChecklistFeltro('${tipo}')">
                    <i class="fas fa-copy me-1"></i> Copiar
                </button>
            </div>
            
            <p class="text-muted mb-4">${projeto.descricao}</p>
            
            <div class="list-group">
    `;

    projeto.materiais.forEach((material, index) => {
        htmlLista += `
            <label class="list-group-item d-flex gap-3 align-items-start">
                <input class="form-check-input flex-shrink-0" type="checkbox" value="" id="item-feltro-${index}">
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
                <small>Dica: Revise se tem linha suficiente para todas as peças!</small>
            </div>
        </div>
    `;

    resultadoDiv.innerHTML = htmlLista;
}

function copiarChecklistFeltro(tipo) {
    const projeto = tiposProjetoFeltro[tipo];
    if (!projeto) return;

    let texto = `*Checklist Feltro: ${projeto.titulo}*\n\n`;
    projeto.materiais.forEach(m => {
        texto += `[ ] ${m.item}: ${m.detalhe}\n`;
    });

    texto += `\nGerado por ArteCalc`;

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
