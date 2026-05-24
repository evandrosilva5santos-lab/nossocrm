# Guia: Deploy e Configuração do Webhook Evolution API

## 🚨 Problema Atual

- ✅ Webhook configurado na Evolution API
- ✅ Código da Edge Function existe localmente
- ❌ Edge Function **NÃO está deployada** no Supabase
- ❌ Variáveis de ambiente não configuradas

## 📋 Checklist Completo

### 1️⃣ Deploy da Edge Function

```bash
# No diretório do projeto
supabase functions deploy messaging-webhook-evolution --no-verify-jwt
```

> **IMPORTANTE:** O flag `--no-verify-jwt` é OBRIGATÓRIO porque o webhook é chamado pela Evolution API sem JWT do Supabase.

### 2️⃣ Configurar Variáveis de Ambiente no Supabase Dashboard

Vá em `https://hjbsdxwozgrepsdvsbul.supabase.co` → `Settings` → `Edge Functions` → `Environment Variables`:

| Variável | Valor |
|----------|-------|
| `CRM_SUPABASE_URL` | `https://hjbsdxwozgrepsdvsbul.supabase.co` |
| `CRM_SUPABASE_SECRET_KEY` | (same as `SUPABASE_SECRET_KEY` do .env.production) |
| `SUPABASE_URL` | `https://hjbsdxwozgrepsdvsbul.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | (same as `SUPABASE_SERVICE_ROLE_KEY` do .env.production) |
| `APP_URL` | URL do seu app (ex: `https://seu-app.vercel.app`) |
| `INTERNAL_API_SECRET` | Gere um: `openssl rand -hex 32` |
| `EVOLUTION_WEBHOOK_SECRET` | Opcional - use `apiKey` do canal como fallback |

### 3️⃣ Verificar Deploy

```bash
# Testar se a função está respondendo
curl -X POST "https://hjbsdxwozgrepsdvsbul.supabase.co/functions/v1/messaging-webhook-evolution/test-channel-id" \
  -H "Content-Type: application/json" \
  -H "apikey: test" \
  -d '{"event":"connection.update","instance":"test","data":{"state":"open"}}'
```

Resposta esperada (400 se channel não existe, mas 200 significa função está ativa):
```json
{
  "ok": false,
  "error": "Canal não encontrado"
}
```

### 4️⃣ Obter o Channel ID

No Supabase SQL Editor:
```sql
SELECT id, name, status, provider
FROM messaging_channels
WHERE provider = 'evolution'
  AND deleted_at IS NULL;
```

Copie o `id` (UUID) do seu canal.

### 5️⃣ Atualizar Webhook na Evolution API

URL do webhook (substitua `CHANNEL_ID` pelo UUID copiado):
```
https://hjbsdxwozgrepsdvsbul.supabase.co/functions/v1/messaging-webhook-evolution/CHANNEL_ID
```

Headers no Evolution API:
- `x-api-key: {seu api key}` ou `apikey: {seu api key}`
- `Content-Type: application/json`

### 6️⃣ Teste Manual

Envie uma mensagem para o seu WhatsApp e verifique no Supabase SQL Editor:

```sql
-- Verificar conversas
SELECT id, external_contact_id, status, last_message_preview
FROM messaging_conversations
ORDER BY created_at DESC
LIMIT 10;

-- Verificar mensagens
SELECT id, direction, content, status, created_at
FROM messaging_messages
ORDER BY created_at DESC
LIMIT 10;

-- Verificar webhook events (audit log)
SELECT channel_id, event_type, processed, error
FROM messaging_webhook_events
ORDER BY created_at DESC
LIMIT 20;
```

## 🐛 Troubleshooting

### Problema: "Unauthorized" (401)
- Verifique se a API key está correta nas credenciais do canal
- Verifique se o header está sendo enviado

### Problema: "Canal não encontrado"
- Verifique se o `CHANNEL_ID` na URL está correto
- Verifique se o status do canal não é `disconnected` ou `error`

### Problema: Webhook chega mas nada aparece
- Verifique `messaging_webhook_events` para erros
- Verifique logs da Edge Function no Supabase Dashboard

### Problema: Mensagens não aparecem no app
- Limpe cache do navegador (Ctrl+Shift+Delete)
- Dê F5 na página de Mensagens
- Verifique console do navegador por erros

## 📊 Fluxo Completo

```
Evolution API → Webhook → Edge Function → Supabase DB → Frontend
     (5551991490515)    (URL)      (processa)     (salva)    (exibe)
```

## ✅ Sucesso!

Quando funcionar, você verá:
1. ✅ Conversas em `/messaging`
2. ✅ Mensagens em tempo real
3. ✅ Contatos criados automaticamente
4. ✅ Deals criados (se regra de routing configurada)