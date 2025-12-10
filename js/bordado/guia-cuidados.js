// Função para inicializar o Guia de Cuidados
function initGuiaCuidados() {
    // Se precisar de alguma inicialização específica
}

// Conteúdo dos cuidados
const cuidadosBordado = {
    'bastidor-livre': {
        titulo: 'Bordado Livre em Bastidor',
        texto: `
• Esta é uma peça delicada de decoração, evite lavagens.
• Para limpeza de manutençao, use espanador ou rolinho adesivo suavemente.
• Se houver mancha local, limpe com cotonete húmido apenas no local.
• Mantenha longe de luz solar direta constante para preservar as cores.
        `,
        whatsapp: `
🖼️ *Cuidados com seu Bastidor Bordado* 🧵

Esta é uma peça exclusiva de decoração! Para mantê-la linda:

✨ *Limpeza:*
• Não lave a peça inteira 🚫
• Use apenas um espanador ou rolinho adesivo para tirar o pó 🧹
• Em caso de manchas, limpe apenas o local com cuidado, sem esfregar 🧼

✨ *Conservação:*
• Evite deixar exposto ao sol forte o dia todo (para não desbotar) ☀️
• Mantenha longe de umidade excessiva 💧

Feito à mão para decorar seu lar! ❤️
        `
    },
    'roupas': {
        titulo: 'Bordado em Roupas',
        texto: `
• Lavar preferencialmente à mão com sabão neutro.
• Se usar máquina, utilize saquinho de roupas delicadas e ciclo suave.
• Nunca use alvejantes ou cloro.
• Não esfregue escovas sobre o bordado.
• Passar sempre pelo avesso, com o bordado sobre uma toalha macia.
        `,
        whatsapp: `
👕 *Cuidados com sua Roupa Bordada* 🧵

Para que seu bordado dure tanto quanto a roupa:

✨ *Lavagem:*
• Prefira lavar à mão com carinho 🤲
• Na máquina? Só em saquinho protetor e ciclo delicado 🧺
• Nada de alvejantes ou cloro! 🚫

✨ *Na hora de passar:*
• Passe sempre pelo avesso 🔄
• Coloque uma toalha macia por baixo para o bordado não "amassar" 🧖‍♀️

Personalizado com exclusividade! ❤️
        `
    },
    'chaveiros': {
        titulo: 'Chaveiros Bordados em Bastidor',
        texto: `
• O minibastidor é uma peça delicada, evite quedas.
• Não molhar (pode danificar a parte interna ou oxidar componentes).
• Limpar apenas com pano seco ou espanador pequeno.
• Evite atrito constante com objetos pontiagudos na bolsa.
        `,
        whatsapp: `
🔑 *Cuidados com seu Chaveiro Bordado* 🧵

Um mimo delicado que exige carinho:

✨ *No dia a dia:*
• Evite molhar! A umidade pode estragar a montagem interna 💧
• Cuidado com atrito excessivo junto com chaves pesadas 🗝️

✨ *Limpeza:*
• Apenas pano seco ou espanador 🧹
• Não lave! 🚫

Feito à mão para te acompanhar! ❤️
        `
    },
    'ponto-cruz': {
        titulo: 'Bordado em Ponto Cruz',
        texto: `
• Se for quadro: Não lavar, apenas espanador.
• Se for toalha/uso: Lavar à mão ou ciclo delicado.
• Jamais usar escova sobre os pontos.
• Passar pelo avesso sobre superfície macia para não achatar o relevo dos pontos.
        `,
        whatsapp: `
❌ *Cuidados com seu Ponto Cruz* ❌

A textura do ponto cruz é única! Para preservar:

✨ *Limpeza:*
• Quadros: Apenas espanador, não lave! 🖼️
• Toalhas: Lavagem delicada, sem alvejantes fortes 🧼
• Nunca esfregue escovas sobre os pontos 🚫

✨ *Passadoria:*
• Sempre pelo avesso e sobre algo fofinho ☁️
• Assim os pontos continuam em relevo e bonitos!

Feito ponto a ponto com amor! ❤️
        `
    }
};

// Função para gerar o HTML do modal
function getGuiaCuidadosHTML() {
    return `
        <div id="guia-cuidados-container">
            <div class="mb-4">
                <p class="text-muted">Selecione o tipo de peça para ver os cuidados:</p>
                <select id="tipo-peca-cuidado" class="form-select mb-3" onchange="mostrarCuidados(this.value)">
                    <option value="">Selecione...</option>
                    <option value="bastidor-livre">Bordado Livre em Bastidor</option>
                    <option value="roupas">Bordado em Roupas</option>
                    <option value="chaveiros">Chaveiros Bordados em Bastidor</option>
                    <option value="ponto-cruz">Bordado em Ponto Cruz</option>
                </select>
            </div>

            <div id="conteudo-cuidado" class="card d-none">
                <div class="card-body">
                    <h5 class="card-title" id="titulo-cuidado"></h5>
                    <div class="card-text mb-3" id="texto-cuidado" style="white-space: pre-line;"></div>
                    
                    <hr>
                    
                    <p class="small text-muted mb-2">
                        <i class="fas fa-mobile-alt me-1"></i> 
                        Para enviar para cliente:
                    </p>
                    <button class="btn btn-success w-100" onclick="copiarInstrucoesBordado()">
                        <i class="fab fa-whatsapp me-2"></i> Copiar com formatação bonitinha
                    </button>
                    <p id="msg-copiado-bordado" class="text-success small text-center mt-2 d-none">
                        <i class="fas fa-check"></i> Copiado! Agora é só colar no WhatsApp.
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Função executada ao selecionar uma opção
function mostrarCuidados(tipo) {
    const container = document.getElementById('conteudo-cuidado');

    if (!tipo || !cuidadosBordado[tipo]) {
        container.classList.add('d-none');
        return;
    }

    const info = cuidadosBordado[tipo];

    document.getElementById('titulo-cuidado').textContent = info.titulo;
    document.getElementById('texto-cuidado').innerText = info.texto; // innerText preserva quebras de linha básicas visualmente se tiver estilo adequado ou usamos pre-line

    // Armazena o tipo atual no botão para saber o que copiar
    const btn = container.querySelector('button');
    btn.setAttribute('data-tipo', tipo);

    container.classList.remove('d-none');
    document.getElementById('msg-copiado-bordado').classList.add('d-none');
}

// Função para copiar
function copiarInstrucoesBordado() {
    const container = document.getElementById('conteudo-cuidado');
    const btn = container.querySelector('button');
    const tipo = btn.getAttribute('data-tipo');

    if (tipo && cuidadosBordado[tipo]) {
        const textoParaCopiar = cuidadosBordado[tipo].whatsapp;

        navigator.clipboard.writeText(textoParaCopiar).then(() => {
            const msg = document.getElementById('msg-copiado-bordado');
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
