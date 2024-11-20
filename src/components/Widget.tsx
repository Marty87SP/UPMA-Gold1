import React from 'react';
import { MessageCircle, Video, Calendar, X } from 'lucide-react';
import { InlineWidget } from 'react-calendly';
import { useWidgetStore } from '../store';
import { VideoPlayer } from './VideoPlayer';
import { Chat } from './Chat';
import { fetchSalesRep } from '../api/mockData';
import { videoConfig } from '../config/videoConfig';

export const Widget: React.FC = () => {
  const { isOpen, mode, salesRep } = useWidgetStore();
  
  React.useEffect(() => {
    const loadSalesRep = async () => {
      const rep = await fetchSalesRep();
      useWidgetStore.setState({ salesRep: rep });
    };
    loadSalesRep();
  }, []);

  if (!isOpen || !salesRep) return null;

  return (
    <div className="fixed bottom-24 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
      <div className="bg-primary p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={salesRep.avatarUrl}
              alt={salesRep.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{salesRep.name}</h3>
              <p className="text-sm text-secondary">{salesRep.title}</p>
            </div>
          </div>
          <button
            onClick={() => useWidgetStore.setState({ isOpen: false })}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => useWidgetStore.setState({ mode: 'video' })}
            className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              mode === 'video'
                ? 'bg-secondary text-primary'
                : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            <Video size={16} />
            <span className="text-sm">Video</span>
          </button>
          <button
            onClick={() => useWidgetStore.setState({ mode: 'chat' })}
            className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              mode === 'chat'
                ? 'bg-secondary text-primary'
                : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            <MessageCircle size={16} />
            <span className="text-sm">AI Chat</span>
          </button>
          <button
            onClick={() => useWidgetStore.setState({ mode: 'booking' })}
            className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              mode === 'booking'
                ? 'bg-secondary text-primary'
                : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            <Calendar size={16} />
            <span className="text-sm">Book a Call</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {mode === 'video' && (
          <VideoPlayer videoUrl={videoConfig['intro'].url} />
        )}
        {mode === 'chat' && <Chat />}
        {mode === 'booking' && (
          <InlineWidget url={salesRep.calendlyUrl} styles={{ height: '100%' }} />
        )}
      </div>
    </div>
  );
};