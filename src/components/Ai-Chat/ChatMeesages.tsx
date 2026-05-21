import MessageBubble from './MessageBubble';
import type { ChatMessage } from '@/types/ai/chat.types';

export default function ChatMessages({
  messages,
}: {
  messages: ChatMessage[];
}) {
  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}
