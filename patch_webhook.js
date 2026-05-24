const fs = require('fs');
const file = 'supabase/functions/messaging-webhook-evolution/index.ts';
let content = fs.readFileSync(file, 'utf8');

const target = `function getApiKeyFromRequest(req: Request): string {
  const xApiKey = req.headers.get("x-api-key") || "";
  if (xApiKey.trim()) return xApiKey.trim();

  const apikey = req.headers.get("apikey") || "";
  if (apikey.trim()) return apikey.trim();

  return "";
}`;

const replacement = `function getApiKeyFromRequest(req: Request): string {
  const url = new URL(req.url);
  const queryApiKey = url.searchParams.get("apikey") || url.searchParams.get("apiKey") || "";
  if (queryApiKey.trim()) return queryApiKey.trim();

  const xApiKey = req.headers.get("x-api-key") || "";
  if (xApiKey.trim()) return xApiKey.trim();

  const apikey = req.headers.get("apikey") || "";
  if (apikey.trim()) return apikey.trim();

  return "";
}`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
console.log("Patched");
