// Gerador de Paleta de Cores - Compartilhado

const temasPaletas = {
    'primavera': { nome: 'Primavera', cores: ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'], base: '#FFB7B2' },
    'verao': { nome: 'Verão', cores: ['#FF6F61', '#F7CAC9', '#88B04B', '#92A8D1', '#955251'], base: '#FF6F61' },
    'outono': { nome: 'Outono', cores: ['#D35400', '#F39C12', '#273746', '#E67E22', '#F0B27A'], base: '#D35400' },
    'inverno': { nome: 'Inverno', cores: ['#2C3E50', '#ECF0F1', '#3498DB', '#9B59B6', '#E74C3C'], base: '#2C3E50' },
    'natureza': { nome: 'Natureza', cores: ['#5D6D7E', '#A9DFBF', '#229954', '#1E8449', '#52BE80'], base: '#229954' },
    'bebe': { nome: 'Bebê', cores: ['#F5DA81', '#FAD7A0', '#F9E79F', '#AED6F1', '#D2B4DE'], base: '#AED6F1' },
    'natal': { nome: 'Natal', cores: ['#C0392B', '#27AE60', '#F1C40F', '#ECF0F1', '#E74C3C'], base: '#C0392B' }
};

function initPaletaCores() {
    const colorInput = document.getElementById('cor-base-input');
    const hexInput = document.getElementById('cor-base-hex');
    const container = document.getElementById('paleta-cores-container');

    // Injetar seção de temas se ainda não existir
    if (container && !document.getElementById('secao-temas')) {
        const temasDiv = document.createElement('div');
        temasDiv.id = 'secao-temas';
        temasDiv.className = 'mb-4';

        let botoesHtml = '<h6 class="mb-3">Paletas Prontas (Temas)</h6><div class="d-flex flex-wrap gap-2">';
        for (const key in temasPaletas) {
            const tema = temasPaletas[key];
            botoesHtml += `
                <button class="btn btn-outline-secondary btn-sm" onclick="carregarTema('${key}')">
                    <i class="fas fa-swatchbook me-1"></i>${tema.nome}
                </button>
            `;
        }
        botoesHtml += '</div><hr class="my-4">';

        container.insertBefore(temasDiv, container.firstChild);
        temasDiv.innerHTML = botoesHtml;
    }

    if (colorInput && hexInput) {
        // Sincronizar color picker e hex input
        colorInput.addEventListener('input', (e) => {
            hexInput.value = e.target.value.toUpperCase();
        });

        hexInput.addEventListener('input', (e) => {
            let val = e.target.value;
            if (val.length === 7 && val.startsWith('#')) {
                colorInput.value = val;
            } else if (val.length === 6 && !val.startsWith('#')) {
                colorInput.value = '#' + val;
            }
        });
    }
}

function carregarTema(chaveTema) {
    const tema = temasPaletas[chaveTema];
    if (!tema) return;

    // Setar cor base
    const colorInput = document.getElementById('cor-base-input');
    const hexInput = document.getElementById('cor-base-hex');

    if (colorInput && hexInput) {
        colorInput.value = tema.base;
        hexInput.value = tema.base;
    }

    // Gerar paleta padrão
    gerarPaleta(tema);
}

function gerarPaleta(temaExplicito = null) {
    const inputCor = document.getElementById('cor-base-input').value;
    const resultadoDiv = document.getElementById('resultado-paleta');

    // Converter hex para HSL
    const hexToHSL = (hex) => {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } else if (hex.length === 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        if (delta === 0) h = 0;
        else if (cmax === r) h = ((g - b) / delta) % 6;
        else if (cmax === g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);
        if (h < 0) h += 360;
        l = (cmax + cmin) / 2;
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        return { h, s, l };
    };

    // HSL para Hex
    const HSLToHex = (h, s, l) => {
        s /= 100;
        l /= 100;
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }

        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);

        if (r.length === 1) r = "0" + r;
        if (g.length === 1) g = "0" + g;
        if (b.length === 1) b = "0" + b;

        return "#" + r + g + b;
    };

    // Template para exibir cada harmonia
    const renderHarmonia = (titulo, cores) => {
        let html = `<div class="mb-4"><h6 class="mb-2">${titulo}</h6><div class="d-flex rounded overflow-hidden shadow-sm" style="height: 60px;">`;
        cores.forEach(cor => {
            html += `
                <div class="flex-grow-1 d-flex align-items-center justify-content-center flex-column" style="background-color: ${cor}; cursor: pointer;" title="Copiar: ${cor}" onclick="navigator.clipboard.writeText('${cor}'); alert('Cor ${cor} copiada!')">
                    <span class="badge bg-dark bg-opacity-25 user-select-all small" style="text-shadow: 0 1px 2px rgba(0,0,0,0.5);">${cor.toUpperCase()}</span>
                </div>
            `;
        });
        html += `</div></div>`;
        return html;
    };

    let htmlResultado = '<div class="result-card p-4">';

    // Se foi chamado com um tema específico, mostra ele primeiro
    if (temaExplicito) {
        htmlResultado += renderHarmonia(`Paleta Sugerida: ${temaExplicito.nome}`, temaExplicito.cores);
        htmlResultado += '<hr>';
    }

    // Gerar Harmonias Baseadas na Cor (input ou base do tema)
    const baseHSL = hexToHSL(inputCor);

    // Complementar (oposto)
    const complementar = HSLToHex((baseHSL.h + 180) % 360, baseHSL.s, baseHSL.l);

    // Análogas (vizinhos)
    const analoga1 = HSLToHex((baseHSL.h + 30) % 360, baseHSL.s, baseHSL.l);
    const analoga2 = HSLToHex((baseHSL.h - 30 + 360) % 360, baseHSL.s, baseHSL.l);

    // Tríade (triângulo)
    const triade1 = HSLToHex((baseHSL.h + 120) % 360, baseHSL.s, baseHSL.l);
    const triade2 = HSLToHex((baseHSL.h + 240) % 360, baseHSL.s, baseHSL.l);

    // Monocromática (tons)
    const mono1 = HSLToHex(baseHSL.h, baseHSL.s, Math.min(95, baseHSL.l + 30)); // Mais claro
    const mono2 = HSLToHex(baseHSL.h, baseHSL.s, Math.max(5, baseHSL.l - 30)); // Mais escuro

    htmlResultado += renderHarmonia('Cor Base', [inputCor]);
    htmlResultado += renderHarmonia('Complementar (Contraste Máximo)', [inputCor, complementar]);
    htmlResultado += renderHarmonia('Análogas (Suave e Harmônico)', [analoga2, inputCor, analoga1]);
    htmlResultado += renderHarmonia('Tríade (Vibrante e Equilibrado)', [inputCor, triade1, triade2]);
    htmlResultado += renderHarmonia('Monocromática (Tom sobre Tom)', [mono1, inputCor, mono2]);

    htmlResultado += `
            <div class="alert alert-light border mt-3 small">
                <i class="fas fa-info-circle me-1"></i> Clique nas cores para copiar o código Hex.
            </div>
        </div>
    `;

    resultadoDiv.innerHTML = htmlResultado;
}
