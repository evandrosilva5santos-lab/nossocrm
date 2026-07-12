# 📋 PRD — DOCUMENTO DE REQUISITOS DO PRODUTO
> Preencha este template ANTES de pedir para a IA criar qualquer coisa.
> Copie este arquivo, renomeie para PRD.md e coloque na pasta /docs/ do projeto.

---

## 1. IDENTIFICAÇÃO

```
Nome do Projeto:     _______________________________
Nome do Cliente:     _______________________________
Data de Criação:     _______________________________
Responsável:         _______________________________
Versão:              1.0
```

---

## 2. RESUMO DO PROJETO

> Em 3 linhas: o que é este projeto e qual problema ele resolve?

```
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
```

---

## 3. OBJETIVO PRINCIPAL

> Qual é o resultado que o cliente vai ter ao usar este sistema?

```
_________________________________________________________________
```

---

## 4. QUEM VAI USAR (PERFIS DE USUÁRIO)

| Perfil | O que ele faz no sistema | Nível de acesso |
|--------|--------------------------|-----------------|
| Admin  |                          | Total           |
|        |                          |                 |
|        |                          |                 |

---

## 5. MÓDULOS NECESSÁRIOS

Marque quais módulos este projeto vai ter:

- [ ] CRM (gestão de leads e clientes)
- [ ] Kanban (gestão de tarefas)
- [ ] Proposta (gerador de propostas)
- [ ] Agenda (calendário e agendamentos)
- [ ] Dashboard (painel de métricas)
- [ ] Relatórios
- [ ] Chat interno
- [ ] Financeiro
- [ ] Outro: _______________________________

---

## 6. TELAS DO SISTEMA

Liste todas as telas que o sistema precisa ter:

```
TELA 1: _______________________________________________
  - O que o usuário vê:
  - O que o usuário pode fazer:
  - Dados que aparecem:

TELA 2: _______________________________________________
  - O que o usuário vê:
  - O que o usuário pode fazer:
  - Dados que aparecem:

(continue para cada tela...)
```

---

## 7. FLUXO PRINCIPAL DO USUÁRIO

> Descreva o caminho mais comum que o usuário vai fazer:

```
PASSO 1 → 
PASSO 2 → 
PASSO 3 → 
PASSO 4 → 
RESULTADO FINAL → 
```

---

## 8. INTEGRAÇÕES NECESSÁRIAS

O sistema precisa se conectar com algum serviço externo?

- [ ] WhatsApp
- [ ] E-mail
- [ ] Google Calendar
- [ ] Stripe / Pagamentos
- [ ] Outro CRM (qual?): _______________
- [ ] API própria do cliente
- [ ] Não precisa de integração

---

## 9. DADOS QUE O SISTEMA SALVA

> Liste os principais dados que precisam ser armazenados:

```
ENTIDADE 1: _______________
  Campos: nome, email, telefone, ...

ENTIDADE 2: _______________
  Campos: título, status, responsável, ...

(continue para cada entidade...)
```

---

## 10. O QUE ESTE SISTEMA NÃO FAZ (ESCOPO NEGATIVO)

> Muito importante! Liste o que está FORA do projeto:

```
❌ Este sistema NÃO vai:
  - 
  - 
  - 
```

---

## 11. DESIGN E IDENTIDADE VISUAL

```
Cores do cliente:       Primária: _______ Secundária: _______
Logo disponível?        [ ] Sim  [ ] Não
Referência visual:      _______________________________
Usar padrão Start?      [ ] Sim  [ ] Não
```

---

## 12. PRAZO E PRIORIDADES

```
Data de entrega:        _______________________________
Módulo mais urgente:    _______________________________
Módulo pode esperar:    _______________________________
```

---

## 13. 🤖 ESTRATÉGIA DE IA — AGENTE, SKILL E WORKFLOW

> Esta seção é preenchida PELA IA antes de começar qualquer código.
> O usuário deve LER e APROVAR antes de autorizar a execução.

### AGENTE PRINCIPAL
> Qual ferramenta/IA vai executar esta tarefa?

- [ ] Claude (geração de código, documentação, lógica de negócio)
- [ ] Cursor AI (edição de arquivos no projeto, refatoração)
- [ ] Claude + Cursor AI (planejamento no Claude, execução no Cursor)
- [ ] n8n (automações e workflows entre sistemas)
- [ ] Make (integrações visuais entre ferramentas)
- [ ] Outro: _______________________________

**Agente escolhido:** _______________________________
**Motivo da escolha:** _______________________________

---

### SKILL APLICADA
> Qual habilidade específica será usada para construir este módulo?

- [ ] Geração de componente React do zero
- [ ] Adaptação de módulo existente para novo cliente
- [ ] Criação de automação de eventos entre módulos
- [ ] Integração com API externa
- [ ] Geração de relatório / PDF / proposta
- [ ] Criação de fluxo de dados (CRM → Projeto → Proposta)
- [ ] Refatoração e melhoria de código existente
- [ ] Outra: _______________________________

**Skill escolhida:** _______________________________

---

### WORKFLOW DE EXECUÇÃO
> Sequência exata do que a IA vai fazer, na ordem que vai fazer.
> Preenchido pela IA. Aprovado pelo usuário antes de executar.

```
PASSO 1 → 
PASSO 2 → 
PASSO 3 → 
PASSO 4 → 
PASSO 5 → 
PASSO 6 → Gerar TUTORIAL.txt do módulo
PASSO 7 → Atualizar CHANGELOG.md
```

**Tempo estimado:** _______________________________
**Dependências necessárias antes de começar:** _______________________________

---

### ✅ APROVAÇÃO DO WORKFLOW
```
[ ] Li e aprovei o agente, skill e workflow acima
[ ] Confirmei que as dependências estão disponíveis
[ ] Autorizo a execução

Aprovado por: _______________________________
Data:         _______________________________
```

---

## 14. CRITÉRIOS DE APROVAÇÃO

> Como vamos saber que o projeto está pronto?

```
✅ O projeto está concluído quando:
  1. 
  2. 
  3. 
```

---

## 15. HISTÓRICO DE VERSÕES


| Versão | Data | O que mudou | Aprovado por |
|--------|------|-------------|--------------|
| 1.0    |      | Versão inicial |            |

---

*Template mantido pela Start Digital. Copie e preencha para cada novo projeto.*
