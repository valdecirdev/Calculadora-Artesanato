# Documentação do Projeto - Calculadora Artesanato

## Visão Geral

Este é um projeto web de ferramentas e calculadoras para artesãs iniciantes, focado principalmente em **Bordado** e **Feltro**. O projeto é um "canivete suíço" que oferece diversas calculadoras e guias práticos para facilitar o trabalho artesanal.

**Características principais:**
- Sem armazenamento de dados (sem banco de dados, sem localStorage)
- Código JavaScript isolado por ferramenta para facilitar manutenção
- Visual minimalista, simples, elegante e moderno
- Formatação brasileira (vírgula como separador decimal)
- Bootstrap 5 para responsividade
- Separação total entre módulos de Bordado e Feltro

## Estrutura de Pastas

```
calculadora-artesanato/
├── index.html                 # Página principal única
├── styles.css                 # CSS customizado (minimalista e moderno)
├── DOCUMENTACAO.md           # Este arquivo
├── js/
│   ├── main.js              # Gerenciador principal (alterna entre módulos)
│   ├── utils.js             # Funções utilitárias (formatação brasileira)
│   ├── shared/              # Scripts compartilhados entre módulos
│   │   ├── precificacao.js
│   │   ├── conversor-medidas.js
│   │   └── calculadora-tempo.js
│   ├── bordado/             # Módulo de Bordado (totalmente isolado)
│   │   ├── main-bordado.js  # Gerenciador do módulo bordado
│   │   ├── custo-fio.js
│   │   ├── calculadora-tecido.js
│   │   ├── calculadora-bastidor.js
│   │   └── guia-pontos.js
│   └── feltro/              # Módulo de Feltro (totalmente isolado)
│       ├── main-feltro.js   # Gerenciador do módulo feltro
│       ├── quantidade-feltro.js
│       ├── calculadora-enchimento.js
│       ├── calculadora-padrao.js
│       └── guia-pontos-feltro.js
└── data/                    # Dados JSON (se necessário no futuro)
```

## Arquitetura do Sistema

### Sistema de Módulos

O projeto usa um sistema de módulos separados:

1. **App** (`js/main.js`): Gerenciador principal que:
   - Controla a navegação entre módulos (Bordado ↔ Feltro)
   - Gerencia o modal de ferramentas
   - Coordena a inicialização dos módulos

2. **BordadoModule** (`js/bordado/main-bordado.js`): 
   - Gerencia todas as ferramentas de bordado
   - Contém o HTML de cada ferramenta
   - Inicializa e configura inputs das ferramentas

3. **FeltroModule** (`js/feltro/main-feltro.js`):
   - Gerencia todas as ferramentas de feltro
   - Contém o HTML de cada ferramenta
   - Inicializa e configura inputs das ferramentas

### Navegação entre Módulos

- Menu superior com botões "Bordado" e "Feltro"
- Ao clicar, alterna entre as seções
- Cada módulo mostra/esconde suas ferramentas
- O módulo ativo fica destacado no menu

### Sistema de Modais

- Um único modal (`toolModal`) é usado para todas as ferramentas
- O conteúdo é inserido dinamicamente via JavaScript
- Cada ferramenta tem seu próprio HTML isolado

## Padrões de Código

### Formatação Brasileira

**IMPORTANTE:** Todos os números decimais devem usar **vírgula (,) como separador**.

#### Funções Utilitárias (`js/utils.js`):

- `parseValorBrasileiro(valor)`: Converte string com vírgula para número
  - Exemplo: "10,50" → 10.5
  - Retorna `null` se valor inválido

- `formatarNumeroBrasileiro(numero, casasDecimais)`: Formata número com vírgula
  - Exemplo: 10.5 → "10,5"
  - Remove zeros desnecessários

- `configurarInputBrasileiro(inputId)`: Configura input para aceitar vírgula
  - Permite digitar vírgula
  - Converte automaticamente ao perder foco
  - Valida entrada

#### Uso nos Inputs:

```html
<input type="text" id="valor" class="form-control" placeholder="10,50" inputmode="decimal">
```

**NUNCA use `type="number"`** - sempre use `type="text"` com `inputmode="decimal"`

#### Uso nas Funções:

```javascript
// SEMPRE use parseValorBrasileiro para ler valores
const valor = parseValorBrasileiro(document.getElementById('valor').value);

// SEMPRE formate números para exibição
const formatarNumero = (num) => {
    if (num % 1 === 0) return num.toString();
    return num.toFixed(2).replace('.', ',');
};
```

### Estrutura de uma Ferramenta

Cada ferramenta deve seguir este padrão:

```javascript
// Nome do arquivo: nome-ferramenta.js
// Localização: js/bordado/ ou js/feltro/ ou js/shared/

// Função de inicialização (opcional)
function initNomeFerramenta() {
    // Configurações iniciais se necessário
}

// Função principal de cálculo
function calcularNomeFerramenta() {
    // 1. Limpar resultado anterior
    const resultadoDiv = document.getElementById('resultado-ferramenta');
    resultadoDiv.innerHTML = '';
    
    // 2. Obter valores (SEMPRE usar parseValorBrasileiro)
    const valor1 = parseValorBrasileiro(document.getElementById('campo1').value);
    
    // 3. Validar entradas
    if (!valor1 || valor1 <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Mensagem de erro</div>';
        return;
    }
    
    // 4. Calcular
    const resultado = valor1 * 2;
    
    // 5. Formatar e exibir
    const formatarNumero = (num) => {
        if (num % 1 === 0) return num.toString();
        return num.toFixed(2).replace('.', ',');
    };
    
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-icon me-2"></i>Título</h5>
            <div class="result-value">${formatarNumero(resultado)}</div>
        </div>
    `;
}
```

### Estrutura HTML no Módulo

Cada módulo deve ter uma função que retorna o HTML da ferramenta:

```javascript
// No main-bordado.js ou main-feltro.js
getNomeFerramentaHTML: function() {
    return `
        <div id="nome-ferramenta-container">
            <div class="mb-3">
                <label class="form-label">Campo</label>
                <input type="text" id="campo-id" class="form-control" placeholder="0,00" inputmode="decimal">
            </div>
            <button class="btn btn-calculate" onclick="calcularNomeFerramenta()">
                <i class="fas fa-icon me-2"></i>Calcular
            </button>
            <div id="resultado-ferramenta"></div>
        </div>
    `;
}
```

### Registro da Ferramenta no Módulo

```javascript
// No loadTools() do módulo
loadTools: function() {
    this.tools = {
        'id-ferramenta': {
            id: 'id-ferramenta',  // OBRIGATÓRIO
            title: 'Nome da Ferramenta',
            content: this.getNomeFerramentaHTML(),
            module: 'bordado' // ou 'feltro'
        }
    };
}

// No initializeTool()
initializeTool: function(toolName) {
    switch(toolName) {
        case 'id-ferramenta':
            if (typeof initNomeFerramenta === 'function') initNomeFerramenta();
            break;
    }
}

// No configurarInputs()
configurarInputs: function(toolName) {
    const inputIds = {
        'id-ferramenta': ['campo1', 'campo2']
    };
    // ...
}
```

## Ferramentas Existentes

### Módulo Bordado

1. **Precificação** (`precificacao.js` - shared)
   - Calcula mark-up, margem de lucro, preço de mercado
   - Métodos: Mark-up, Margem %, Preço de Mercado

2. **Custo por Fio** (`custo-fio.js`)
   - Calcula custo por fio de meada
   - Lógica: (Preço meada ÷ Total metros) × Comprimento utilizado

3. **Conversor de Medidas** (`conversor-medidas.js` - shared)
   - Converte entre mm, cm, m, polegadas

4. **Calculadora de Tempo** (`calculadora-tempo.js` - shared)
   - Calcula tempo total e custo de mão de obra

5. **Calculadora de Tecido** (`calculadora-tecido.js`)
   - Calcula quantas peças cabem em um pedaço de tecido
   - Considera múltiplas camadas

6. **Pano para Bastidor** (`calculadora-bastidor.js`)
   - Calcula tamanho do pano necessário para bastidor redondo
   - Fórmula: Diâmetro + (Margem × 2)

7. **Guia de Pontos Básicos** (`guia-pontos.js`)
   - Referência de pontos de bordado
   - Inclui: Ponto Atrás, Cheio, Corrente, Haste, Nó Francês, Folha, Margarida, Cruz

8. **Checklist de Início de Projeto** (`checklist-projeto.js`)
   - Gera lista de materiais por tipo de projeto (Livre, Ponto Cruz, Roupas)
   - Permite copiar a lista para área de transferência

### Módulo Feltro

1. **Precificação** (`precificacao.js` - shared)
   - Mesma ferramenta do bordado

2. **Quantidade de Feltro** (`quantidade-feltro.js`)
   - Calcula quantas peças cabem em um pedaço de feltro
   - Similar à calculadora de tecido

3. **Conversor de Medidas** (`conversor-medidas.js` - shared)
   - Mesma ferramenta do bordado

4. **Calculadora de Tempo** (`calculadora-tempo.js` - shared)
   - Mesma ferramenta do bordado

5. **Calculadora de Enchimento** (`calculadora-enchimento.js`)
   - Calcula quantidade de enchimento necessária
   - Considera tipo: Fibra Sintética, Algodão, Espuma
   - Inclui margem de segurança de 20%

6. **Redimensionador de Padrões** (`calculadora-padrao.js`)
   - Redimensiona padrões mantendo proporções
   - Calcula escala de redimensionamento

7. **Guia de Pontos para Feltro** (`guia-pontos-feltro.js`)
    - Referência de pontos específicos para feltro
    - Pontos: Invisível, Chuleado, Caseado, Palito, Espinha

8. **Checklist de Início de Projeto** (`checklist-feltro.js`)
    - Gera lista de materiais para: Bonecos, Guirlandas, Lembrancinhas
    - Permite copiar a lista para área de transferência

## Como Adicionar Nova Ferramenta

### Passo 1: Criar o arquivo JavaScript

```javascript
// js/bordado/nova-ferramenta.js (ou feltro/shared)
function initNovaFerramenta() {
    // Inicializações se necessário
}

function calcularNovaFerramenta() {
    const resultadoDiv = document.getElementById('resultado-nova-ferramenta');
    resultadoDiv.innerHTML = '';
    
    // Obter valores com parseValorBrasileiro
    const valor = parseValorBrasileiro(document.getElementById('campo').value);
    
    // Validar
    if (!valor || valor <= 0) {
        resultadoDiv.innerHTML = '<div class="alert alert-warning">Erro</div>';
        return;
    }
    
    // Calcular
    const resultado = valor * 2;
    
    // Formatar e exibir
    const formatarNumero = (num) => {
        if (num % 1 === 0) return num.toString();
        return num.toFixed(2).replace('.', ',');
    };
    
    resultadoDiv.innerHTML = `
        <div class="result-card">
            <h5><i class="fas fa-icon me-2"></i>Resultado</h5>
            <div class="result-value">${formatarNumero(resultado)}</div>
        </div>
    `;
}
```

### Passo 2: Adicionar HTML no módulo

No `main-bordado.js` ou `main-feltro.js`:

```javascript
getNovaFerramentaHTML: function() {
    return `
        <div id="nova-ferramenta-container">
            <div class="mb-3">
                <label class="form-label">Campo</label>
                <input type="text" id="campo" class="form-control" placeholder="0,00" inputmode="decimal">
            </div>
            <button class="btn btn-calculate" onclick="calcularNovaFerramenta()">
                <i class="fas fa-calculator me-2"></i>Calcular
            </button>
            <div id="resultado-nova-ferramenta"></div>
        </div>
    `;
}
```

### Passo 3: Registrar no módulo

```javascript
// No loadTools()
'nova-ferramenta': {
    id: 'nova-ferramenta',
    title: 'Nova Ferramenta',
    content: this.getNovaFerramentaHTML(),
    module: 'bordado' // ou 'feltro'
}

// No initializeTool()
case 'nova-ferramenta':
    if (typeof initNovaFerramenta === 'function') initNovaFerramenta();
    break;

// No configurarInputs()
'nova-ferramenta': ['campo1', 'campo2']
```

### Passo 4: Adicionar card no HTML

No `index.html`, na seção apropriada:

```html
<div class="col-md-6 col-lg-4">
    <div class="tool-card" data-tool="nova-ferramenta" data-module="bordado">
        <div class="tool-icon">
            <i class="fas fa-icon"></i>
        </div>
        <h3>Nova Ferramenta</h3>
        <p>Descrição da ferramenta</p>
        <button class="btn btn-primary">Abrir</button>
    </div>
</div>
```

### Passo 5: Adicionar script no HTML

```html
<script src="js/bordado/nova-ferramenta.js"></script>
```

## Estilos e Design

### Cores Principais (CSS Variables)

```css
--primary-color: #8B6F47    /* Marrom principal */
--secondary-color: #D4AF37  /* Dourado */
--accent-color: #F5E6D3     /* Bege claro */
--text-dark: #2C2C2C        /* Texto escuro */
--text-light: #6C6C6C       /* Texto claro */
--bg-light: #FAFAFA         /* Fundo claro */
--border-color: #E0E0E0     /* Borda */
```

### Componentes Principais

- **`.tool-card`**: Card de cada ferramenta
- **`.result-card`**: Card de resultado (fundo bege claro)
- **`.result-value`**: Valor destacado do resultado
- **`.btn-calculate`**: Botão de calcular (marrom)

### Ícones Font Awesome

Usar ícones do Font Awesome 6.4.0:
- `fa-calculator` - Calculadoras
- `fa-ruler` - Medidas
- `fa-clock` - Tempo
- `fa-cut` - Corte/tecido
- `fa-circle` - Bastidor
- `fa-book` - Guias
- `fa-exchange-alt` - Conversores
- `fa-cube` - Enchimento
- `fa-expand-arrows-alt` - Redimensionar

## Regras Importantes

1. **NUNCA** use `type="number"` nos inputs - sempre `type="text"` com `inputmode="decimal"`
2. **SEMPRE** use `parseValorBrasileiro()` para ler valores dos inputs
3. **SEMPRE** formate números com vírgula para exibição
4. **SEMPRE** valide entradas antes de calcular
5. **SEMPRE** limpe o resultado anterior antes de exibir novo
6. **SEMPRE** use `data-module` nos cards de ferramentas
7. **SEMPRE** isole o código de cada ferramenta em arquivo próprio
8. **NUNCA** persista dados (sem localStorage, sem banco)
9. **SEMPRE** use IDs únicos para elementos (prefixar com nome da ferramenta)
10. **SEMPRE** inclua `id` no objeto da ferramenta no `loadTools()`

## Convenções de Nomenclatura

- **Arquivos JS**: `kebab-case.js` (ex: `calculadora-tecido.js`)
- **Funções**: `camelCase` (ex: `calcularTecido()`)
- **IDs de elementos**: `kebab-case` (ex: `largura-tecido`)
- **IDs de ferramentas**: `kebab-case` (ex: `calculadora-tecido`)
- **Variáveis CSS**: `kebab-case` (ex: `--primary-color`)

## Estrutura do Modal

O modal é único e compartilhado:

```html
<div id="toolModal" class="modal fade">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitle">Ferramenta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="modalBody">
                <!-- Conteúdo inserido dinamicamente -->
            </div>
        </div>
    </div>
</div>
```

## Fluxo de Funcionamento

1. Usuário clica em um card de ferramenta
2. `App.openTool()` é chamado com o objeto da ferramenta
3. Modal é aberto com o HTML da ferramenta
4. `initializeTool()` é chamado para inicializar a ferramenta
5. `configurarInputs()` configura os inputs para aceitar vírgula
6. Usuário preenche os campos e clica em calcular
7. Função de cálculo valida, calcula e exibe resultado

## Dependências Externas

- **Bootstrap 5.3.2** (CSS e JS via CDN)
- **Font Awesome 6.4.0** (CSS via CDN)
- Nenhuma outra dependência

## Notas de Desenvolvimento

- O projeto não usa frameworks JavaScript (vanilla JS)
- Não há build process - arquivos são servidos diretamente
- Compatível com navegadores modernos
- Responsivo via Bootstrap
- Código deve ser mantido simples e legível

## Exemplo Completo de Nova Ferramenta

Veja `js/bordado/calculadora-bastidor.js` como referência completa de uma ferramenta bem implementada seguindo todos os padrões.

## Contato e Manutenção

Para adicionar novas ferramentas ou fazer alterações:
1. Seguir a estrutura de módulos existente
2. Manter código isolado por ferramenta
3. Usar formatação brasileira sempre
4. Testar em ambos os módulos se for ferramenta compartilhada
5. Manter consistência visual com o restante do projeto

