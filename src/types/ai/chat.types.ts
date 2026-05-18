export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export interface ChatMessagesProps {
  messages: ChatMessage[];
}

export interface MessageBubbleProps {
  message: ChatMessage;
}
