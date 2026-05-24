# Diagnóstico Completo - Integração Evolution API + Supabase

## 📊 Análise da Documentação Evolution API

### 1. Webhook Configuration
Na Evolution API, o webhook é configurado via API:

```bash
POST {serverUrl}/webhook/set/{instanceName}
{
  "url": "https://hjbsdxwozgrepsdvsbul.supabase.co/functions/v1/messaging-webhook-evolution/{channelId}",
  "enabled": true,
  "byEvents": true,
  "events": ["MESSAGES_UPSERT", "MESSAGES_UPDATE", "CONNECTION_UPDATE"],
  "webhook_base64": false
}
```

Headers obrigatórios:
- `apikey: {AUTHENTICATION_API_KEY}`

### 2. Instance Connect
A conexão da instância é feita via:

```bash
GET {serverUrl}/instance/connect/{instanceName}
```

Isso gera um QR Code que precisa ser escaneado.

### 3. Pontos Críticos Identificados

| Problema | Causa | Solução |
|----------|-------|---------|
| **Edge Function não deployada** | Código existe localmente, não no servidor | `supabase functions deploy messaging-webhook-evolution --no-verify-jwt` |
| **Variáveis de ambiente** | Edge Function não tem acesso ao Supabase DB | Configurar `CRM_SUPABASE_*` no dashboard |
| **Canal status pending** | Webhook filtra por `connected`/`active` | ✅ Já corrigido (adicionado `pending`) |
| **Webhook URL format** | URL pode estar errada na Evolution API | Verificar `{channelId}` está correto |

## 🔧 Diagnóstico Passo a Passo

### PASSO 1: Verificar Edge Function Deployada
```bash
# Teste se a função existe
curl -X POST "https://hjbsdxwozgrepsdvsbul.supabase.co/functions/v1/messaging-webhook-evolution/test" \
  -H "Content-Type: application/json" \
  -H "apikey: test" \
  -d '{"event":"connection.update"}'

# Esperado: 200 ou 400 (bad channel) significa função existe
# Erro 404/403: função NÃO existe ou está sem permissões
```

### PASSO 2: Verificar Canal no Banco
```sql
-- No Supabase SQL Editor
SELECT 
  id,
  name,
  status,
  provider,
  external_identifier,
  credentials->>'apiKey' as api_key,
  created_at
FROM messaging_channels
WHERE provider = 'evolution'
  AND deleted_at IS NULL;
```

### PASSO 3: Testar Webhook Manualmente
```bash
# Substitua pelo CHANNEL_ID e API_KEY reais
curl -X POST "https://hjbsdxwozgrepsdvsbul.supabase.co/functions/v1/messaging-webhook-evolution/{CHANNEL_ID}" \
  -H "Content-Type: application/json" \
  -H "apikey: {API_KEY}" \
  -H "x-api-key: {API_KEY}" \
  -d '{
    "event": "messages.upsert",
    "instance": "minha-instancia",
    "data": {
      "key": {
        "remoteJid": "5551991490515@s.whatsapp.net",
        "id": "TEST123",
        "fromMe": false
      },
      "pushName": "Evandro Test",
      "message": {
        "conversation": "Mensagem de teste manual"
      },
      "messageType": "conversation",
      "messageTimestamp": 1717745600
    }
  }'
```

### PASSO 4: Verificar Resultado no Banco
```sql
-- Conversa criada?
SELECT id, external_contact_id, status, created_at
FROM messaging_conversations
WHERE created_at > NOW() - INTERVAL '5 minutes'
ORDER BY created_at DESC;

-- Mensagem criada?
SELECT id, direction, content_type, created_at
FROM messaging_messages
WHERE created_at > NOW() - INTERVAL '5 minutes'
ORDER BY created_at DESC;

-- Webhook events (audit log)
SELECT event_type, processed, error, created_at
FROM messaging_webhook_events
WHERE created_at > NOW() - INTERVAL '5 minutes'
ORDER BY created_at DESC;
```

## 🎯 Configuração Necessária no Supabase Dashboard

Vá em: `https://hjbsdxwozgrepsdvsbul.supabase.co` → `Settings` → `Edge Functions` → `Environment Variables`

Adicione estas variáveis:

| Key | Value | Descrição |
|-----|-------|-----------|
| `CRM_SUPABASE_URL` | `https://hjbsdxwozgrepsdvsbul.supabase.co` | URL do projeto Supabase |
| `CRM_SUPABASE_SECRET_KEY` | `{SUPABASE_SERVICE_ROLE_KEY}` | Service role key do .env.production |
| `SUPABASE_URL` | `https://hjbsdxwozgrepsdvsbul.supabase.co` | Fallback URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `{SUPABASE_SERVICE_ROLE_KEY}` | Fallback service key |
| `APP_URL` | URL do seu app (Vercel) | Para AI processing |
| `INTERNAL_API_SECRET` | `{generate with openssl rand -hex 32}` | Secret interno |
| `EVOLUTION_WEBHOOK_SECRET` | (opcional) | Fallback se apiKey do canal falhar |

## 📋 Checklist Final

- [ ] Deployar Edge Function: `supabase functions deploy messaging-webhook-evolution --no-verify-jwt`
- [ ] Configurar variáveis de ambiente no Supabase Dashboard
- [ ] Obter `CHANNEL_ID` no banco de dados
- [ ] Atualizar webhook URL na Evolution API com `{CHANNEL_ID}`
- [ ] Testar webhook manualmente via curl
- [ ] Enviar mensagem real pelo WhatsApp
- [ ] Verificar tabelas no banco de dados
- [ ] Limpar cache do navegador e verificar app

## 🐛 Troubleshooting Comum

### "Unauthorized" (401)
- API key errada no header
- Variável de ambiente `CRM_SUPABASE_SECRET_KEY` não configurada

### "Canal não encontrado"
- CHANNEL_ID na URL está errado
- Canal está com `deleted_at` não null
- Status do canal não é `connected`, `active` ou `pending`

### "Erro ao buscar canal"
- Variáveis de ambiente do Supabase não configuradas
- Edge Function não tem permissão de database

### Webhook chega mas nada aparece
- Verifique `messaging_webhook_events` para erros
- Logs da Edge Function no Supabase Dashboard
- Permissões RLS podem estar bloqueando

## 🚀 Deploy Completo

```bash
# 1. Instalar CLI do Supabase (se não tiver)
npm install -g supabase

# 2. Login
supabase login

# 3. Link ao projeto
supabase link --project-ref hjbsdxwozgrepsdvsbul

# 4. Deploy com no-verify-jwt (OBRIGATÓRIO)
supabase functions deploy messaging-webhook-evolution --no-verify-jwt

# 5. Verificar logs (em tempo real)
supabase functions logs messaging-webhook-evolution --follow
```

## ✅ Teste Final

Após completar todos os passos, envie uma mensagem para seu WhatsApp (5551991490515) e verifique:

1. ✅ Conversa aparece em `/messaging`
2. ✅ Mensagem aparece na conversa
3. ✅ Contato criado automaticamente
4. ✅ Deal criado (se routing configurado)
5. ✅ Não há erros nos logs

## 📚 Referências

- Evolution API Webhooks: https://doc.evolution-api.com/v2/pt/configuration/webhooks
- Evolution API Instance: https://doc.evolution-api.com/v2/api-reference/instance-controller/instance-connect
- Supabase Edge Functions: https://supabase.com/docs/guides/functions