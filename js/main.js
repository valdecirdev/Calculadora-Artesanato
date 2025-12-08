// Main JavaScript - Gerencia navegação entre módulos e modais

const App = {
    currentModule: 'bordado', // 'bordado' ou 'feltro'
    modal: null,
    
    init: function() {
        this.setupModal();
        this.setupNavigation();
        this.loadModule('bordado');
    },
    
    setupModal: function() {
        this.modal = new bootstrap.Modal(document.getElementById('toolModal'));
    },
    
    setupNavigation: function() {
        const bordadoBtn = document.getElementById('nav-bordado');
        const feltroBtn = document.getElementById('nav-feltro');
        
        if (bordadoBtn) {
            bordadoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadModule('bordado');
            });
        }
        
        if (feltroBtn) {
            feltroBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadModule('feltro');
            });
        }
    },
    
    loadModule: function(moduleName) {
        this.currentModule = moduleName;
        
        // Atualiza navegação
        document.querySelectorAll('.nav-module').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.getElementById(`nav-${moduleName}`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Atualiza título e descrição
        const title = document.querySelector('.hero-section h1');
        const description = document.querySelector('.hero-section .lead');
        const sectionTitle = document.querySelector('.section-title');
        
        if (moduleName === 'bordado') {
            if (title) title.textContent = 'Ferramentas para Bordadeiras';
            if (description) description.textContent = 'Calculadoras e ferramentas práticas para bordadeiras iniciantes';
            if (sectionTitle) sectionTitle.textContent = 'Ferramentas de Bordado';
            
            // Carrega módulo de bordado
            if (typeof BordadoModule !== 'undefined') {
                BordadoModule.init();
            }
            
            // Mostra seção de bordado, esconde feltro
            document.getElementById('ferramentas-bordado')?.classList.remove('d-none');
            document.getElementById('ferramentas-feltro')?.classList.add('d-none');
        } else {
            if (title) title.textContent = 'Ferramentas para Artesãs em Feltro';
            if (description) description.textContent = 'Calculadoras e ferramentas práticas para trabalhos em feltro';
            if (sectionTitle) sectionTitle.textContent = 'Ferramentas de Feltro';
            
            // Carrega módulo de feltro
            if (typeof FeltroModule !== 'undefined') {
                FeltroModule.init();
            }
            
            // Mostra seção de feltro, esconde bordado
            document.getElementById('ferramentas-bordado')?.classList.add('d-none');
            document.getElementById('ferramentas-feltro')?.classList.remove('d-none');
        }
    },
    
    openTool: function(tool) {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        if (modalTitle && modalBody) {
            modalTitle.textContent = tool.title;
            modalBody.innerHTML = tool.content;
            this.modal.show();
            
            // Inicializa a ferramenta específica após abrir o modal
            setTimeout(() => {
                if (tool.module === 'bordado' && typeof BordadoModule !== 'undefined') {
                    BordadoModule.initializeTool(tool.id);
                    BordadoModule.configurarInputs(tool.id);
                } else if (tool.module === 'feltro' && typeof FeltroModule !== 'undefined') {
                    FeltroModule.initializeTool(tool.id);
                    FeltroModule.configurarInputs(tool.id);
                }
            }, 100);
        }
    }
};

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});
