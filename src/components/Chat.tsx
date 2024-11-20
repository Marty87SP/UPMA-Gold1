import React from 'react';
import { Send } from 'lucide-react';
import { useWidgetStore } from '../store';
import { getRagResponse } from '../api/mockData';

export const Chat: React.FC = () => {
  const [input, setInput] = React.useState('');
  const messages = useWidgetStore((state) => state.messages);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    useWidgetStore.setState((state) => ({
      messages: [...state.messages, {
        id: crypto.randomUUID(),
        content: input,
        sender: 'user',
        timestamp: new Date()
      }]
    }));

    setInput('');

    // Get AI response
    const response = await getRagResponse(input);
    useWidgetStore.setState((state) => ({
      messages: [...state.messages, {
        id: crypto.randomUUID(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      }]
    }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="p-2 bg-secondary text-primary rounded-lg hover:bg-secondary-hover transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};