const fs = require('fs');
const file = 'features/settings/components/ChannelsSection.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetInfo = `function WebhookInfo({ channelId, provider, verifyToken }: { channelId: string; provider: string; verifyToken?: string }) {
  const { addToast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const projectRef = getSupabaseProjectRef();
  const fn = WEBHOOK_FUNCTION_MAP[provider] || 'messaging-webhook-zapi';
  const webhookUrl = \`https://\${projectRef}.supabase.co/functions/v1/\${fn}/\${channelId}\`;`;

const replacementInfo = `function WebhookInfo({ channelId, provider, verifyToken, apiKey }: { channelId: string; provider: string; verifyToken?: string; apiKey?: string }) {
  const { addToast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const projectRef = getSupabaseProjectRef();
  const fn = WEBHOOK_FUNCTION_MAP[provider] || 'messaging-webhook-zapi';
  let webhookUrl = \`https://\${projectRef}.supabase.co/functions/v1/\${fn}/\${channelId}\`;
  if (provider === 'evolution' && apiKey) {
    webhookUrl += \`?apikey=\${apiKey}\`;
  }`;

const targetCall = `        <WebhookInfo
          channelId={channel.id}
          provider={channel.provider}
          verifyToken={(channel.settings?.verifyToken || channel.credentials?.verifyToken) as string | undefined}
        />`;

const replacementCall = `        <WebhookInfo
          channelId={channel.id}
          provider={channel.provider}
          verifyToken={(channel.settings?.verifyToken || channel.credentials?.verifyToken) as string | undefined}
          apiKey={channel.credentials?.apiKey as string | undefined}
        />`;

content = content.replace(targetInfo, replacementInfo);
content = content.replace(targetCall, replacementCall);

fs.writeFileSync(file, content);
console.log("UI Patched");
