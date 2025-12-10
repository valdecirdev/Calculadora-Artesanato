// Função para inicializar o Guia de Cuidados Feltro
function initGuiaCuidadosFeltro() {
    // Inicialização se necessária
}

// Conteúdo dos cuidados Feltro
const cuidadosFeltro = {
    'decoracao': {
        titulo: 'Peças Decorativas (Guirlandas, Enfeites)',
        texto: `
• Peças decorativas não devem ser lavadas na máquina.
• Para limpar poeira, use espanador, rolinho adesivo ou fita crepe.
• Evite exposição direta e constante ao sol para não desbotar.
• Em caso de manchas leves, use um pano úmido com sabão neutro apenas no local (sem esfregar com força).
        `,
        whatsapp: `
🎨 *Cuidados com sua Peça em Feltro* (Decoração) 🧵

Mantenha sua peça linda por muito tempo:

✨ *Limpeza e Conservação:*
• Não lave na máquina! 🚫
• Use espanador ou rolinho adesivo para tirar o pó 🧹
• Em caso de sujeira localizada, use pano úmido com sabão neutro delicadamente 🧼

✨ *Dicas:*
• Evite sol direto o dia todo para manter as cores vivas ☀️
• O feltro é delicado, evite atrito excessivo! 🛡️

Feito à mão com muito carinho! ❤️
        `
    },
    'brinquedos': {
        titulo: 'Bonecos e Brinquedos (Manuseio)',
        texto: `
• O feltro tende a criar "bolinhas" com o manuseio excessivo.
• Se surgirem bolinhas, corte-as com uma tesoura pequena com cuidado (não puxe).
• Lavar apenas se muito necessário, à mão, rápido e sem deixar de molho.
• Secar à sombra, preferencialmente na horizontal.
        `,
        whatsapp: `
🧸 *Cuidados com seu Boneco em Feltro* 🧵

Para brincar e durar:

✨ *Bolinhas:*
• Com o uso, podem surgir "bolinhas". Não puxe! 🚫
• Corte com uma tesoura pequena com cuidado ✂️

✨ *Lavagem (Só se necessário):*
• Lavagem rápida à mão e sabão neutro 🤲
• Não deixe de molho e não torça! 💦
• Seque à sombra, deitadinho na horizontal ☁️

Feito à mão para alegrar! ❤️
        `
    }
};

// Função para gerar o HTML do modal
function getGuiaCuidadosFeltroHTML() {
    return `
        <div id="guia-cuidados-feltro-container">
            <div class="mb-4">
                <p class="text-muted">Selecione o tipo de peça para ver os cuidados:</p>
                <select id="tipo-peca-cuidado-feltro" class="form-select mb-3" onchange="mostrarCuidadosFeltro(this.value)">
                    <option value="">Selecione...</option>
                    <option value="decoracao">Decoração (Guirlandas, Enfeites)</option>
                    <option value="brinquedos">Bonecos e Brinquedos</option>
                </select>
            </div>

            <div id="conteudo-cuidado-feltro" class="card d-none">
                <div class="card-body">
                    <h5 class="card-title" id="titulo-cuidado-feltro"></h5>
                    <div class="card-text mb-3" id="texto-cuidado-feltro" style="white-space: pre-line;"></div>
                    
                    <hr>
                    
                    <p class="small text-muted mb-2">
                        <i class="fas fa-mobile-alt me-1"></i> 
                        Para enviar para cliente:
                    </p>
                    <button class="btn btn-success w-100" onclick="copiarInstrucoesFeltro()">
                        <i class="fab fa-whatsapp me-2"></i> Copiar com formatação bonitinha
                    </button>
                    <p id="msg-copiado-feltro" class="text-success small text-center mt-2 d-none">
                        <i class="fas fa-check"></i> Copiado! Agora é só colar no WhatsApp.
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Função executada ao selecionar uma opção
function mostrarCuidadosFeltro(tipo) {
    const container = document.getElementById('conteudo-cuidado-feltro');

    if (!tipo || !cuidadosFeltro[tipo]) {
        container.classList.add('d-none');
        return;
    }

    const info = cuidadosFeltro[tipo];

    document.getElementById('titulo-cuidado-feltro').textContent = info.titulo;
    document.getElementById('texto-cuidado-feltro').innerText = info.texto;

    // Armazena o tipo atual no botão
    const btn = container.querySelector('button');
    btn.setAttribute('data-tipo', tipo);

    container.classList.remove('d-none');
    document.getElementById('msg-copiado-feltro').classList.add('d-none');
}

// Função para copiar
function copiarInstrucoesFeltro() {
    const container = document.getElementById('conteudo-cuidado-feltro');
    const btn = container.querySelector('button');
    const tipo = btn.getAttribute('data-tipo');

    if (tipo && cuidadosFeltro[tipo]) {
        const textoParaCopiar = cuidadosFeltro[tipo].whatsapp;

        navigator.clipboard.writeText(textoParaCopiar).then(() => {
            const msg = document.getElementById('msg-copiado-feltro');
            msg.classList.remove('d-none');
            setTimeout(() => {
                msg.classList.add('d-none');
            }, 3000);
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            alert('Não foi possível copiar automaticamente. Tente selecionar e copiar manualmente.');
        });
    }
}
