export interface AiChatResponse {
  answer: string;
  code_example: string;
  difficulty: string;
}

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
