# ⚡ RULES.md — LEI GLOBAL DO SISTEMA START
> Leia este arquivo ANTES de escrever qualquer linha de código.
> Este arquivo é obrigatório em TODO projeto criado pela Start Digital.
> Nenhuma exceção é permitida sem aprovação explícita do arquiteto do projeto.

---

## 🔴 REGRA 0 — LEITURA OBRIGATÓRIA
Antes de qualquer ação, a IA deve:
1. Ler este arquivo (RULES.md) completamente
2. Ler o arquivo DESIGN.md
3. Ler o arquivo ARCHITECTURE.md
4. Confirmar que entendeu, listando as 5 regras principais

Se qualquer um desses arquivos estiver faltando, **PARE** e avise o usuário.

---

## 🏗️ REGRA 1 — ORDEM DE CRIAÇÃO (NUNCA PULE ETAPAS)

Toda feature, módulo ou projeto deve seguir esta ordem obrigatória:

```
ETAPA 1 → Criar o PRD (documento de requisitos)
ETAPA 2 → Criar a estrutura de pastas
ETAPA 3 → Criar o DESIGN.md do módulo
ETAPA 4 → Criar o TUTORIAL.txt
ETAPA 5 → Escrever o código
ETAPA 6 → Testar e documentar o resultado
```

**NUNCA comece a escrever código sem ter o PRD aprovado.**

---

## 📁 REGRA 2 — ESTRUTURA DE PASTAS OBRIGATÓRIA

Todo projeto deve ter exatamente esta estrutura:

```
/nome-do-projeto/
  ├── /src/
  │     ├── /components/     ← peças visuais reutilizáveis
  │     ├── /modules/        ← funcionalidades completas (kanban, crm, etc)
  │     ├── /pages/          ← telas do sistema
  │     ├── /config/         ← configurações do cliente
  │     └── /utils/          ← funções auxiliares
  ├── /docs/
  │     ├── PRD.md           ← documento de requisitos
  │     ├── TUTORIAL.txt     ← tutorial gerado automaticamente
  │     └── CHANGELOG.md     ← histórico de mudanças
  ├── /assets/
  │     ├── /images/
  │     └── /icons/
  ├── DESIGN.md              ← identidade visual do projeto
  ├── RULES.md               ← cópia deste arquivo (sempre incluir)
  └── config.js              ← configurações gerais do cliente
```

**Se uma dessas pastas não existir, crie antes de continuar.**

---

## 📋 REGRA 3 — PRD OBRIGATÓRIO ANTES DE CODAR

Todo módulo novo precisa de um PRD (Product Requirements Document).
Use o template em PRD-TEMPLATE.md.

O PRD deve responder:
- O que este módulo faz?
- Quem vai usar?
- Quais são as telas?
- Quais dados ele salva?
- Como ele se conecta com outros módulos?
- O que ele NÃO faz (escopo negativo)?
- **Qual agente, skill ou workflow a IA vai usar para construir esta tarefa?**

### 🤖 DECLARAÇÃO DE ESTRATÉGIA DE IA (obrigatória no PRD)

Antes de começar qualquer módulo, a IA deve declarar explicitamente:

**1. AGENTE** — Qual ferramenta/IA vai executar a tarefa?
Exemplos:
- Claude (geração de código, documentação, lógica)
- Cursor AI (edição de arquivos, refatoração, projeto completo)
- ChatGPT (alternativa de geração)
- n8n (automações e workflows entre sistemas)
- Make (integrações visuais)

**2. SKILL** — Qual habilidade específica será aplicada?
Exemplos:
- Geração de componente React
- Criação de API REST
- Integração com banco de dados
- Criação de automação de eventos
- Geração de PDF/proposta
- Análise e refatoração de código existente

**3. WORKFLOW** — Qual é a sequência de execução?
A IA deve descrever passo a passo o que ela vai fazer, na ordem que vai fazer, antes de executar qualquer coisa.

Exemplo de declaração válida:
```
AGENTE:    Claude + Cursor AI
SKILL:     Geração de módulo React com eventos personalizados
WORKFLOW:
  1. Criar estrutura de pastas do módulo
  2. Gerar o componente principal (index.jsx)
  3. Criar arquivo de configuração (kanban.config.js)
  4. Criar utilitários internos (kanban.utils.js)
  5. Configurar eventos de comunicação (start:tarefa-concluida)
  6. Gerar TUTORIAL.txt do módulo
  7. Atualizar CHANGELOG.md do projeto
```

**A IA só começa a executar após o usuário aprovar esta declaração.**

---

## 🎨 REGRA 4 — DESIGN ANTES DE CÓDIGO

Nenhum componente visual pode ser criado sem antes existir o DESIGN.md.
O DESIGN.md define:
- Paleta de cores (com códigos hex)
- Tipografia (fontes e tamanhos)
- Espaçamentos padrão
- Estilo dos botões, cards e formulários

**Se o cliente não definiu o design, use o padrão Start Digital em DESIGN.md**

---

## 📖 REGRA 5 — TUTORIAL.txt OBRIGATÓRIO EM TODO MÓDULO

Cada módulo criado deve gerar automaticamente um arquivo `TUTORIAL.txt` dentro da pasta `/docs/` contendo:
- Nome do módulo
- O que ele faz em linguagem simples
- Como instalar/copiar para outro projeto
- Quais arquivos dependem de quê
- Como configurar para um novo cliente
- Possíveis problemas e soluções

**Este tutorial deve ser escrito para alguém que não sabe programar.**

---

## 🔌 REGRA 6 — MÓDULOS DEVEM SER INDEPENDENTES

Cada módulo em `/modules/` deve funcionar sozinho.
Ele não pode depender de outro módulo diretamente.
A comunicação entre módulos acontece via `config.js` e eventos.

Estrutura de um módulo:
```
/modules/kanban/
  ├── index.jsx         ← componente principal
  ├── kanban.config.js  ← configurações do módulo
  ├── kanban.utils.js   ← funções internas
  └── TUTORIAL.txt      ← tutorial deste módulo
```

---

## ⚙️ REGRA 7 — ARQUIVO CONFIG.JS POR CLIENTE

Cada projeto de cliente tem um `config.js` na raiz com:
```javascript
const CONFIG = {
  cliente: "Nome do Cliente",
  cor_primaria: "#000000",
  cor_secundaria: "#ffffff",
  logo: "/assets/images/logo.png",
  modulos_ativos: ["kanban", "crm", "proposta"],
  api_url: "https://api.cliente.com"
}
```

O código NUNCA deve ter cores, nomes ou dados do cliente fixos.
Tudo vem do config.js.

---

## 🚫 REGRA 8 — PROIBIÇÕES ABSOLUTAS

- ❌ Nunca escreva cores fixas no código (use variáveis do config)
- ❌ Nunca crie uma tela sem responsividade mobile
- ❌ Nunca delete um módulo sem fazer backup na pasta /backup/
- ❌ Nunca comece código sem PRD aprovado
- ❌ Nunca deixe comentários em inglês (use português)
- ❌ Nunca crie componente sem documentar no TUTORIAL.txt

---

## ✅ CHECKLIST ANTES DE ENTREGAR QUALQUER COISA

Antes de dizer "pronto", confirme:
- [ ] PRD foi criado e aprovado?
- [ ] Estrutura de pastas está correta?
- [ ] DESIGN.md existe?
- [ ] TUTORIAL.txt foi gerado?
- [ ] config.js está configurado para o cliente?
- [ ] Funciona no celular?
- [ ] CHANGELOG.md foi atualizado?

---

*Este arquivo é mantido pela Start Digital. Versão 1.0*
