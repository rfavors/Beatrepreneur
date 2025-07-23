import { useEffect, useState } from "react";
import { X, Video } from "lucide-react";

interface VideoPlayerModalProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

export default function VideoPlayerModal({ videoId, title, onClose }: VideoPlayerModalProps) {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/videos`);
        const videos = await response.json();
        const foundVideo = videos.find((v: any) => v.id.toString() === videoId);
        setVideo(foundVideo);
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading video...</p>
            </div>
          ) : video && video.videoUrl ? (
            <div className="space-y-4">
              <video 
                controls 
                className="w-full rounded-lg bg-black max-h-[60vh]"
                poster={video.thumbnailUrl || undefined}
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {video.description && (
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300">{video.description}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <Video className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-400 mb-4">
                Video not found or not yet uploaded.
              </p>
              <p className="text-sm text-gray-500">
                Video ID: {videoId}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}