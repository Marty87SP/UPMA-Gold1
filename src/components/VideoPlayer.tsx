import React from 'react';
import { Play, Pause, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { videoConfig, VideoNode } from '../config/videoConfig';

interface VideoPlayerProps {
  videoUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = React.useState<VideoNode>(
    videoConfig['intro'] || { id: 'default', url: videoUrl }
  );
  const [showQuestion, setShowQuestion] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          setError('Failed to play video. Please try again.');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleError = () => {
    setError('Failed to load video. Please try again later.');
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (currentVideo.question && currentVideo.choices) {
      setShowQuestion(true);
    }
  };

  const handleChoiceClick = (nextVideoId: string) => {
    const nextVideo = videoConfig[nextVideoId];
    if (nextVideo) {
      setCurrentVideo(nextVideo);
      setShowQuestion(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          setError('Failed to play video. Please try again.');
        });
        setIsPlaying(true);
      }
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-8 text-center">
        <AlertCircle size={48} className="mb-4 text-red-500" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-900 h-full">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        src={currentVideo.url}
        muted={isMuted}
        playsInline
        onError={handleError}
        onEnded={handleVideoEnd}
      />
      
      {showQuestion && currentVideo.question && currentVideo.choices && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6">
          <h3 className="text-xl text-white mb-6">{currentVideo.question}</h3>
          <div className="flex flex-col gap-3 w-full max-w-sm">
            {currentVideo.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoiceClick(choice.nextVideoId)}
                className="w-full px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-secondary-hover transition-colors"
              >
                {choice.text}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};