import { Instagram, Twitter, Youtube, Music } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img 
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/2dd1c854-2387-4376-a795-05536ce9f03d/f1d1ec064a3ef596ffb8e416b548c034.png"
              alt="Koollbreezze Logo" 
              className="h-8 w-auto"
            />
            <span className="font-orbitron font-bold text-lg text-gradient">
              DA BEATREPRENEUR
            </span>
          </div>
          
          <div className="flex justify-center space-x-6 mb-6">
            <a 
              href="https://instagram.com/koollbreezze" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a 
              href="https://twitter.com/koollbreezze" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a 
              href="https://youtube.com/@beatrepreneur" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
            >
              <Youtube className="h-6 w-6" />
            </a>
            <a 
              href="https://soundcloud.com/koollbreezze" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
            >
              <Music className="h-6 w-6" />
            </a>
          </div>
          
          <p className="text-gray-400 text-sm">
            &copy; 2024 Koollbreezze da Beatrepreneur. All rights reserved.
            <span className="block mt-1">Published by Kleanwititmuzik/ASCAP</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
