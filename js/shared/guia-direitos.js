// Função inicial do módulo
function initGuiaDireitos() {
    // Inicialização se necessária
}

const faqsDireitos = [
    {
        id: 'moldes-gratuitos',
        pergunta: 'Posso usar moldes gratuitos para vender?',
        resposta: `
            <p><strong>Depende da licença fornecida pelo criador.</strong></p>
            <ul>
                <li>Na maioria das vezes, quando um artesão disponibiliza um molde gratuito, é permitido vender a <em>peça pronta</em> feita a partir dele.</li>
                <li>Porém, geralmente é <strong>PROIBIDO</strong> vender o molde digital, doar o arquivo digital em grupos, ou dizer que o molde é seu.</li>
                <li><strong>Dica:</strong> Sempre procure o termo de uso ou pergunte ao criador "Posso vender a peça final?".</li>
            </ul>
        `
    },
    {
        id: 'licenca-comercial',
        pergunta: 'O que é licença de uso comercial?',
        resposta: `
            <p>É uma permissão que você compra (ou recebe) para usar aquele desenho/molde para gerar lucro.</p>
            <ul>
                <li><strong>Uso Pessoal:</strong> Você só pode fazer para você ou presentear. Não pode vender.</li>
                <li><strong>Uso Comercial (Pequena Escala):</strong> Permite vender as peças prontas (geralmente limitado a uma quantidade, ex: 1000 peças). É o padrão na maioria das compras de apostilas de feltro e matrizes de bordado.</li>
                <li><strong>O que geralmente NÃO pode:</strong> Revender o arquivo digital, fazer cursos ensinando a peça sem autorização, ou produção industrial em larga escala.</li>
            </ul>
        `
    },
    {
        id: 'personagens-protegidos',
        pergunta: 'Posso fazer peças da Disney ou personagens famosos?',
        resposta: `
            <p><strong>Tecnicamente, não sem licença da marca.</strong></p>
            <ul>
                <li>Personagens como Mickey, super-heróis e filmes são protegidos por direitos autorais. Vender produtos com eles sem pagar royalties é pirataria/contrafação.</li>
                <li><strong>"Mas todo mundo faz!":</strong> O fato de muitos fazerem não torna legal. A marca pode derrubar seu anúncio no Elo7/Instagram ou até processar (embora seja mais raro com artesãos pequenos, o risco existe).</li>
                <li><strong>Alternativa:</strong> Crie "inspired" (inspirado em). Use as cores e elementos que lembrem o tema, sem copiar o personagem idêntico. Ou foque em temas genéricos (safari, circo, flores) que são livres.</li>
            </ul>
        `
    },
    {
        id: 'fotografia-cliente',
        pergunta: 'Como usar fotos de clientes (LGPD)?',
        resposta: `
            <p><strong>Sempre peça autorização expressa.</strong></p>
            <ul>
                <li><strong>Direito de Imagem:</strong> A imagem da pessoa é protegida. Você não pode postar foto da cliente ou do filho dela segurando a peça sem permissão por escrito (ou print de WhatsApp claro).</li>
                <li><strong>LGPD (Dados):</strong> Não exponha dados da cliente em etiquetas de envio nas fotos (nome completo, endereço, CPF). Borre essas informações antes de postar.</li>
                <li><strong>Dica Prática:</strong> Ao finalizar a venda, mande: <em>"Posso repostar a foto se você me mandar? Adoraria mostrar no meu perfil!"</em>. Se ela disser sim, tire um print dessa autorização e guarde.</li>
            </ul>
        `
    }
];

function getGuiaDireitosHTML() {
    let accordionItems = '';

    faqsDireitos.forEach((item, index) => {
        accordionItems += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading-${item.id}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${item.id}" aria-expanded="false" aria-controls="collapse-${item.id}">
                        ${item.pergunta}
                    </button>
                </h2>
                <div id="collapse-${item.id}" class="accordion-collapse collapse" aria-labelledby="heading-${item.id}" data-bs-parent="#accordionDireitos">
                    <div class="accordion-body">
                        ${item.resposta}
                    </div>
                </div>
            </div>
        `;
    });

    return `
        <div id="guia-direitos-container">
            <div class="alert alert-info mb-4" role="alert">
                <i class="fas fa-info-circle me-2"></i><strong>Nota:</strong> Este guia é apenas educativo e baseado em boas práticas. Não substitui consultoria jurídica.
            </div>
            
            <div class="accordion" id="accordionDireitos">
                ${accordionItems}
            </div>
        </div>
    `;
}
