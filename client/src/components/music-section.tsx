import { Play, SkipBack, SkipForward, Music, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MusicSection() {
  return (
    <section id="music" className="py-20 gradient-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-6 text-gradient">
            MUSIC
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Listen to the latest tracks from Koollbreezze da Beatrepreneur
          </p>
        </div>
        
        {/* Music Player Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-effect rounded-2xl p-8 mb-12 border border-gray-700 bg-gray-800/50">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
                  <Music className="text-4xl text-white h-16 w-16" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No Tracks Available Yet</h3>
                <p className="text-gray-400">New music coming soon. Stay tuned!</p>
              </div>
              
              {/* Player Controls */}
              <div className="flex items-center justify-center space-x-6 mb-6">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button 
                  size="icon"
                  className="bg-orange-500 hover:bg-orange-600 rounded-full w-16 h-16"
                >
                  <Play className="h-6 w-6 text-white ml-1" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                  <SkipForward className="h-6 w-6" />
                </Button>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-400 h-2 rounded-full w-0"></div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-400">
                <span>0:00</span>
                <span>0:00</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Coming Soon Notice */}
          <Card className="text-center bg-gray-800 rounded-xl p-8 border border-gray-700">
            <CardContent className="p-0">
              <Upload className="text-orange-500 text-3xl mb-4 h-12 w-12 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">New Music Coming Soon</h3>
              <p className="text-gray-400">Use the admin panel to upload your music tracks</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
