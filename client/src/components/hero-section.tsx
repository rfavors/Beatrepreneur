import { ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const MusicVisualizer = () => (
  <div className="music-visualizer">
    <div className="bar"></div>
    <div className="bar"></div>
    <div className="bar"></div>
    <div className="bar"></div>
    <div className="bar"></div>
  </div>
);

export default function HeroSection() {
  const { scrollToSection } = useSmoothScroll();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('https://storage.googleapis.com/hostinger-horizons-assets-prod/2dd1c854-2387-4376-a795-05536ce9f03d/2ca638fb07d373d57c8e482ff9e0f266.jpg')"
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <img 
          src="https://storage.googleapis.com/hostinger-horizons-assets-prod/2dd1c854-2387-4376-a795-05536ce9f03d/f1d1ec064a3ef596ffb8e416b548c034.png" 
          alt="Koollbreezze Logo" 
          className="h-32 md:h-48 lg:h-64 w-auto mx-auto mb-8"
        />
        <h2 className="font-orbitron font-bold text-xl md:text-2xl lg:text-3xl mb-12 text-yellow-400 tracking-widest">
          DA BEATREPRENEUR
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            onClick={() => scrollToSection("music")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full font-bold text-lg transition-all duration-300"
          >
            Listen Now
          </Button>
          
          <Button
            variant="outline"
            onClick={() => scrollToSection("videos")}
            className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300"
          >
            Watch Videos
          </Button>
        </div>
        
        {/* Under Construction Notice */}
        <div className="flex items-center justify-center space-x-3 text-yellow-400">
          <span className="text-4xl">🚧</span>
          <span className="font-semibold text-lg">Under Construction</span>
          <span className="text-4xl">👷‍♂️</span>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-yellow-500 text-2xl h-8 w-8" />
      </div>
    </section>
  );
}
