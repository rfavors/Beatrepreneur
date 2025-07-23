import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import VideoPlayerModal from "./video-player-modal";

interface Video {
  id: number;
  title: string;
  description: string | null;
  thumbnailUrl: string;
  videoUrl: string | null;
  isPublished: boolean | null;
  createdAt: string | null;
}

export default function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        const data = await response.json();
        setVideos(data.filter((video: Video) => video.isPublished));
      } catch (error) {
        console.error('Error fetching videos:', error);
        // Keep empty array as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <section id="videos" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-orbitron font-bold text-4xl mb-4 text-gradient">
              Music Videos
            </h2>
            <p className="text-xl text-gray-400">
              Visual stories behind the beats
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-700 rounded-lg aspect-video mb-4"></div>
                <div className="bg-gray-700 h-6 rounded mb-2"></div>
                <div className="bg-gray-700 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="videos" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4 text-gradient">
            Music Videos
          </h2>
          <p className="text-xl text-gray-400">
            Visual stories behind the beats
          </p>
        </div>
        
        {videos.length === 0 ? (
          <div className="text-center py-16">
            <Play className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">No Videos Yet</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Music videos will appear here once they are uploaded through the admin panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <Card 
                key={video.id} 
                className="bg-gray-900 border-gray-700 overflow-hidden group cursor-pointer hover:transform hover:scale-105 transition-transform duration-300"
                onClick={() => openVideoModal(video)}
              >
                <div className="relative">
                  <img 
                    src={video.thumbnailUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop"} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-orange-500 rounded-full p-4">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl text-white mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-400">
                    {video.description || "Music video"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayerModal
          videoId={selectedVideo.id.toString()}
          title={selectedVideo.title}
          onClose={closeVideoModal}
        />
      )}
    </section>
  );
}