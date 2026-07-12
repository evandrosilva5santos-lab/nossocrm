import type { Metadata } from 'next';
import { AIHubPage } from '@/features/ai-hub/AIHubPage'

export const metadata: Metadata = { title: 'AI Hub | StartCRM' };

export default function AIHub() {
    return <AIHubPage />
}
