import type { Metadata } from 'next';
import { InboxPage } from '@/features/inbox/InboxPage'

export const metadata: Metadata = { title: 'Inbox | StartCRM' };

export default function Inbox() {
    return <InboxPage />
}
