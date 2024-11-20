import React, { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Widget } from './components/Widget';
import { useWidgetStore } from './store';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

function MainContent() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-primary mb-6">
          UPMA Video Chat v2
        </h1>
        <ul className="list-decimal pl-6 mb-6 space-y-2">
          <li>Sales person name and avatar</li>
          <li>Multi-Mode: switch to video, chat mode, or schedule Calendly appointment anytime</li>
          <li>Back office call samples</li>
        </ul>
        <Link 
          to="/original" 
          className="text-secondary hover:text-secondary-hover underline"
        >
          Original Version
        </Link>
      </div>

      <button
        onClick={() => useWidgetStore.setState({ isOpen: true })}
        className="fixed bottom-4 right-4 p-4 bg-secondary text-primary rounded-full shadow-lg hover:bg-secondary-hover transition-colors"
      >
        <MessageSquare size={24} />
      </button>

      <Widget />
    </div>
  );
}

function OriginalVersion() {
  useEffect(() => {
    // Add VideoAsk embed script
    const script = document.createElement('script');
    script.innerHTML = `
      window.VIDEOASK_EMBED_CONFIG = {
        kind: "widget",
        url: "https://www.videoask.com/fytz82ky3",
        options: {
          widgetType: "VideoThumbnailExtraLarge",
          text: "Can I help?",
          backgroundColor: "#FBCE37",
          position: "bottom-right",
          dismissible: false,
          videoPosition: "center center",
        },
      }
    `;
    document.body.appendChild(script);

    const embedScript = document.createElement('script');
    embedScript.src = 'https://www.videoask.com/embed/embed.js';
    document.body.appendChild(embedScript);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(embedScript);
      // Remove VideoAsk widget iframe if it exists
      const widgetIframe = document.querySelector('iframe[src*="videoask"]');
      if (widgetIframe && widgetIframe.parentNode) {
        widgetIframe.parentNode.removeChild(widgetIframe);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-primary mb-6">
          UPMA Video Chat V1
        </h1>
        <ul className="list-decimal pl-6 mb-6 space-y-2">
          <li>Video, then User chooses a path</li>
          <li>AI-assisted query to video</li>
        </ul>
        
        <div className="mt-4">
          <Link 
            to="/" 
            className="text-secondary hover:text-secondary-hover underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  const isOriginalVersion = location.pathname === '/original';

  useEffect(() => {
    if (isOriginalVersion) {
      // Hide custom widget on original version page
      useWidgetStore.setState({ isOpen: false });
    } else {
      // Remove VideoAsk widget when returning to main page
      const widgetIframe = document.querySelector('iframe[src*="videoask"]');
      if (widgetIframe && widgetIframe.parentNode) {
        widgetIframe.parentNode.removeChild(widgetIframe);
      }
    }
  }, [isOriginalVersion]);

  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/original" element={<OriginalVersion />} />
    </Routes>
  );
}

export default App;