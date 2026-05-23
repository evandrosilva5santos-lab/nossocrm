import { NextRequest } from 'next/server';
import { isAllowedOrigin } from '@/lib/security/sameOrigin';

function json(body: any, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

export async function POST(request: NextRequest) {
  console.log('[api/ai/validate-key] Received validation request');

  if (!isAllowedOrigin(request)) {
    console.warn('[api/ai/validate-key] Blocked by origin validation');
    return json({ valid: false, error: 'Forbidden' }, 403);
  }

  try {
    const { apiKey, model } = await request.json();
    console.log(`[api/ai/validate-key] Validating key ending in ...${apiKey?.slice(-4)}, model: ${model}`);
    
    if (!apiKey || apiKey.trim().length < 10) {
      return json({ valid: false, error: 'Chave muito curta' }, 400);
    }

    // Force validation to use a known working model regardless of what the user has selected
    // since older models like gemini-1.5-flash might be deprecated.
    const modelToUse = 'gemini-2.5-flash';

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Hi' }] }],
          generationConfig: { maxOutputTokens: 1 }
        })
      }
    );

    if (response.ok) {
      return json({ valid: true });
    }

    const error = await response.json();
    if (response.status === 400 && error?.error?.message?.includes('API key not valid')) {
      return json({ valid: false, error: 'Chave de API inválida' }, 400);
    }
    if (response.status === 403) {
      return json({ valid: false, error: 'Chave sem permissão para este modelo' }, 403);
    }
    if (response.status === 429) {
      return json({ valid: true }); // rate limit = key válida
    }

    return json({ valid: false, error: error?.error?.message || 'Erro desconhecido' }, 400);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido';
    console.error(`[api/ai/validate-key] ${message}`);
    return json({ valid: false, error: 'Erro de conexão no servidor.' }, 500);
  }
}
