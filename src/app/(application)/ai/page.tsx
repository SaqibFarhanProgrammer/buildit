import ChatHeader from '@/components/Ai-Chat/ChatHeader';
import ChatInterface from '@/components/Ai-Chat/ChatInterface';

export default function AIChatPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ChatHeader />
      <ChatInterface />
    </div>
  );
}
