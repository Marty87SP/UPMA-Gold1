import { create } from 'zustand';
import { WidgetState } from './types';

export const useWidgetStore = create<WidgetState>((set) => ({
  isOpen: false,
  mode: 'video',
  messages: [],
  salesRep: undefined,
}));

export const toggleWidget = () => 
  useWidgetStore.setState((state) => ({ isOpen: !state.isOpen }));

export const setMode = (mode: 'video' | 'chat' | 'booking') =>
  useWidgetStore.setState({ mode });

export const addMessage = (content: string, sender: 'user' | 'bot') =>
  useWidgetStore.setState((state) => ({
    messages: [...state.messages, {
      id: crypto.randomUUID(),
      content,
      sender,
      timestamp: new Date()
    }]
  }));