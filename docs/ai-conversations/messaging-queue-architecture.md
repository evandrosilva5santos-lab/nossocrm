# Arquitetura de Fila de Mensagens (Message Queue) para Vercel + Supabase

## 📌 Contexto e Problema Atual
Atualmente, o envio de mensagens pelo CRM funciona de forma **síncrona** na API Route do Next.js (hospedada na Vercel). Ao removermos o *fire-and-forget* (que causava o `AbortError`), adicionamos um `await` que faz a Vercel aguardar a resposta da Evolution API. 

Embora funcione 100% para baixo volume (como provado pelos checkmarks de "enviado" nas suas prints recentes! 🎉), essa abordagem **não escala** para alto volume. Se 50 atendentes mandarem disparos em massa, a Vercel vai manter dezenas de processos abertos aguardando o provedor, o que esgotará o limite de conexões (concurrency) e causará timeouts de 10s a 60s (limite da Vercel).

---

## 🏗️ Visão da Solução: Fila de Tarefas Assíncrona (Asynchronous Queue)

Precisamos desacoplar o **Ato de Salvar a Mensagem** do **Ato de Enviar a Mensagem**. A interface (UI) deve ser imediata, e o envio real deve acontecer em *background* de forma segura, gerenciada por uma fila que garanta *retries* se algo falhar.

### Componentes Principais

1. **Vercel API Route (`/api/messaging/messages`)**: Passa a apenas inserir a mensagem no banco e responder imediatamente (`200 OK`). Não faz mais requisições HTTP para a Evolution.
2. **Supabase Database (Fila)**: A própria tabela `messaging_messages` atua como nossa fila de estados (`pending` -> `queued` -> `sent` / `failed`).
3. **Supabase Edge Function (Worker)**: Uma função serverless dedicada apenas a consumir a fila, enviar a requisição HTTP para a Evolution API, e atualizar o status da mensagem.
4. **Trigger / Database Webhook**: O mecanismo que avisa a Edge Function que há uma nova mensagem a ser enviada.

---

## 🛠️ Desenho Arquitetural Recomendado (Pattern: DB Webhook -> Edge Function)

Como estamos no ecossistema do Supabase, a solução mais robusta, de menor custo e menor fricção (sem precisar pagar serviços extras como Inngest, Upstash ou Vercel KV) é o uso de **Database Webhooks**.

### Fluxo de Execução (Passo a Passo)

1. **Ação do Usuário**: O atendente envia "Olá!" no CRM.
2. **Inserção Rápida (Vercel)**: A API Route no Next.js insere um registro na tabela `messaging_messages` com `status = 'pending'` e devolve a resposta para o frontend.
   - *Tempo de resposta para o usuário: ~50ms (instantâneo).*
3. **Database Webhook (Supabase)**: O Supabase escuta o `INSERT` na tabela `messaging_messages` e, de forma 100% assíncrona, dispara uma requisição HTTP interna para uma **Supabase Edge Function** chamada `process-outbound-message`, passando o `ID` da mensagem no Payload.
4. **Processamento (Edge Function)**:
   - A Edge Function recebe o webhook.
   - Troca o status da mensagem para `status = 'queued'`.
   - Faz o `fetch` para a Evolution API (`/message/sendText`).
   - Avalia a resposta:
     - Se der Sucesso: Atualiza para `status = 'sent'` e salva o `external_id`.
     - Se der Erro (ex: timeout da Evolution): Atualiza para `status = 'failed'` (ou coloca numa *Dead Letter Queue* para tentar novamente).
5. **Atualização da UI (Realtime)**: O Supabase Realtime percebe que a linha da mensagem mudou para `sent` e notifica o frontend React, que desenha os *checkmarks* de envio na tela do usuário.

---

## 📈 Vantagens dessa Arquitetura

- **Tolerância a Falhas**: Se a Evolution API cair por 10 minutos, as mensagens falham isoladamente no Worker, sem derrubar a API do seu CRM (que continuará super rápida). Podemos facilmente adicionar um loop de *Retry* na Edge Function.
- **Custos Zeros Extras**: Supabase Edge Functions e Database Webhooks já estão inclusos no seu plano do Supabase. Não precisa assinar Redis ou RabbitMQ.
- **Timeouts Ilimitados na Vercel**: A Vercel não precisa mais esperar integrações lentas de terceiros. A Edge Function no Supabase tem timeouts muito mais permissivos para integrações pesadas (ex: envio de mídias/vídeos grandes para o WhatsApp).
- **Sem Perda de Mensagens (No Message Loss)**: A mensagem já está salva no banco *antes* de tentar enviar. Nunca mais perderemos uma mensagem por causa de "AbortError".

---

## 🗣️ Para o Jarvis (Outro Agente):
*Olá Jarvis! O que você acha dessa arquitetura utilizando Supabase Database Webhooks conectados diretamente a uma Edge Function como "Worker" de fila? Considerando que já temos o Supabase na stack, isso elimina a necessidade de infraestrutura adicional (como BullMQ ou Redis). Você faria algum ajuste em como gerenciar o "Retry" e "Dead Letter Queue" dentro dessa própria Edge Function para envios que tomem Rate Limit da Evolution?*
