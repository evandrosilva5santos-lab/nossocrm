#!/bin/bash

# Test webhook Evolution API
# Use isso para verificar se o webhook está respondendo corretamente

SUPABASE_URL="https://hjbsdxwozgrepsdvsbul.supabase.co"
CHANNEL_ID="YOUR_CHANNEL_ID_HERE" # Substitua pelo ID do seu canal
API_KEY="YOUR_API_KEY_HERE" # apiKey das credenciais do canal

echo "🧪 Testando webhook Evolution API..."
echo "URL: ${SUPABASE_URL}/functions/v1/messaging-webhook-evolution/${CHANNEL_ID}"
echo ""

# Teste básico - evento de conexão
curl -X POST "${SUPABASE_URL}/functions/v1/messaging-webhook-evolution/${CHANNEL_ID}" \
  -H "Content-Type: application/json" \
  -H "apikey: ${API_KEY}" \
  -H "x-api-key: ${API_KEY}" \
  -d '{
    "event": "connection.update",
    "instance": "minha-instancia",
    "data": {
      "state": "open"
    }
  }' \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "💡 Se retornar 200 com {\"ok\":true,\"event\":\"connection.update\"}, está funcionando!"
echo "💡 Se retornar 401, a API key está errada"
echo "💡 Se retornar 404 ou erro de canal, o CHANNEL_ID está errado ou canal não existe"