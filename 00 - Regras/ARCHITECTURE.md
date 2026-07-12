# 🏗️ ARCHITECTURE.md — ARQUITETURA DO SISTEMA START
> Define como organizar pastas, nomear arquivos e conectar módulos.
> Seguir esta arquitetura garante que qualquer módulo possa ser copiado entre projetos.

---

## 🗂️ ESTRUTURA COMPLETA DE UM PROJETO

```
/nome-do-projeto/
│
├── 📁 src/
│   ├── 📁 components/          ← Peças visuais menores e reutilizáveis
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Table/
│   │   └── Input/
│   │
│   ├── 📁 modules/             ← Funcionalidades completas
│   │   ├── kanban/
│   │   │   ├── index.jsx
│   │   │   ├── kanban.config.js
│   │   │   ├── kanban.utils.js
│   │   │   └── TUTORIAL.txt
│   │   ├── crm/
│   │   ├── proposta/
│   │   └── agenda/
│   │
│   ├── 📁 pages/               ← Telas completas do sistema
│   │   ├── Dashboard.jsx
│   │   ├── Clientes.jsx
│   │   └── Configuracoes.jsx
│   │
│   ├── 📁 config/              ← Configurações do sistema
│   │   ├── routes.js           ← Rotas das páginas
│   │   ├── permissions.js      ← Quem pode ver o quê
│   │   └── api.js              ← Endereços da API
│   │
│   └── 📁 utils/               ← Funções auxiliares
│       ├── formatters.js       ← Formatar datas, moedas, etc.
│       ├── validators.js       ← Validar formulários
│       └── helpers.js          ← Funções genéricas
│
├── 📁 docs/                    ← Toda documentação aqui
│   ├── PRD.md                  ← Requisitos do projeto
│   ├── TUTORIAL.txt            ← Tutorial geral do projeto
│   └── CHANGELOG.md            ← Histórico de mudanças
│
├── 📁 assets/                  ← Arquivos estáticos
│   ├── images/
│   └── icons/
│
├── 📁 backup/                  ← Backups antes de grandes mudanças
│
├── DESIGN.md                   ← Identidade visual
├── RULES.md                    ← Cópia das regras globais
└── config.js                   ← Configurações do cliente
```

---

## 📦 COMO NOMEAR ARQUIVOS

### Regras de nomenclatura:
```
COMPONENTES:   PascalCase     → Button.jsx, UserCard.jsx
MÓDULOS:       kebab-case     → kanban/, crm-avancado/
UTILITÁRIOS:   camelCase      → formatDate.js, validateEmail.js
CONFIGS:       kebab-case     → app.config.js, api.config.js
DOCS:          MAIÚSCULAS     → TUTORIAL.txt, CHANGELOG.md
PÁGINAS:       PascalCase     → Dashboard.jsx, ListaClientes.jsx
```

### Nunca use:
```
❌ arquivo novo (1).jsx       ← espaços no nome
❌ KANBAN_FINAL_v3.jsx        ← versão no nome
❌ temp_test_delete.js        ← arquivos temporários no projeto
❌ Arquivo.JSX                ← extensão em maiúscula
```

---

## 🔌 COMO MÓDULOS SE COMUNICAM

Os módulos não se falam diretamente. Eles usam um sistema de eventos:

```javascript
// ✅ CERTO — módulo CRM avisa que um lead foi ganho
window.dispatchEvent(new CustomEvent('start:lead-ganho', {
  detail: { leadId: '123', nome: 'João Silva', valor: 5000 }
}))

// ✅ CERTO — módulo de Projetos escuta e reage
window.addEventListener('start:lead-ganho', (evento) => {
  const lead = evento.detail
  criarProjeto(lead) // cria o projeto automaticamente
})
```

### Lista de eventos padrão do sistema:
```
start:lead-criado          → novo lead no CRM
start:lead-ganho           → negócio fechado
start:lead-perdido         → negócio perdido
start:proposta-gerada      → nova proposta criada
start:proposta-aprovada    → cliente aprovou
start:projeto-criado       → projeto iniciado
start:projeto-concluido    → projeto finalizado
start:tarefa-concluida     → tarefa do kanban concluída
```

---

## ⚙️ ARQUIVO CONFIG.JS — TEMPLATE PADRÃO

```javascript
// config.js — Configurações do Cliente
// ⚠️ NUNCA versione este arquivo com dados reais do cliente

const CONFIG = {
  // Dados do Cliente
  cliente: {
    nome: "Nome do Cliente",
    logo: "/assets/images/logo.png",
    favicon: "/assets/images/favicon.ico",
  },

  // Identidade Visual (sobrescreve DESIGN.md)
  design: {
    cor_primaria: "#FF6B00",
    cor_secundaria: "#0A0A0A",
    cor_fundo: "#F5F5F5",
    fonte: "Inter",
  },

  // Módulos ativos neste projeto
  modulos: {
    crm: true,
    kanban: true,
    proposta: true,
    agenda: false,
    relatorios: false,
  },

  // Conexões externas
  api: {
    url_base: "https://api.cliente.com",
    timeout: 10000,
  },

  // Configurações do sistema
  sistema: {
    idioma: "pt-BR",
    moeda: "BRL",
    fuso_horario: "America/Sao_Paulo",
    itens_por_pagina: 20,
  }
}

export default CONFIG
```

---

## 🔄 COMO COPIAR UM MÓDULO PARA OUTRO PROJETO

Passo a passo para reutilizar um módulo:

```
PASSO 1 → Copie a pasta inteira do módulo
          Ex: copie /cliente-x/src/modules/kanban/
          Para: /cliente-y/src/modules/kanban/

PASSO 2 → Leia o TUTORIAL.txt do módulo
          Verifique quais dependências ele precisa

PASSO 3 → Configure no config.js do novo cliente
          Ative o módulo: modulos: { kanban: true }

PASSO 4 → Ajuste as cores e textos via config.js
          Nunca altere o código do módulo para isso

PASSO 5 → Teste no novo projeto
          Confirme que os eventos estão funcionando
```

---

## 📊 TIPOS DE COMPONENTES

### 1. Componente Simples (presentacional)
```
Só mostra dados. Não busca nada. Não salva nada.
Exemplo: Button, Card, Badge, Avatar
```

### 2. Componente Inteligente (container)
```
Busca dados, salva dados, tem lógica.
Exemplo: ListaClientes, FormularioProposta
```

### 3. Módulo
```
Funcionalidade completa e independente.
Tem seus próprios componentes internos.
Exemplo: CRM completo, Kanban completo
```

### 4. Página
```
Junta módulos e componentes em uma tela.
Exemplo: Dashboard (junta Cards de métricas + Kanban + CRM)
```

---

## 🔐 REGRAS DE SEGURANÇA

```
- Nunca salve senhas no código
- Nunca versione o config.js com dados reais
- Nunca exponha chaves de API no frontend
- Use variáveis de ambiente (.env) para dados sensíveis
- Sempre valide dados antes de salvar
```

---

*Este arquivo é mantido pela Start Digital. Versão 1.0*
