export interface SalesRepInfo {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  calendlyUrl: string;
  videoUrl?: string;
  availability: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface WidgetState {
  isOpen: boolean;
  mode: 'video' | 'chat' | 'booking';
  salesRep?: SalesRepInfo;
  messages: ChatMessage[];
}