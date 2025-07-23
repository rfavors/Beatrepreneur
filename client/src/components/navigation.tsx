import { useState } from "react";
import { Menu, X, Moon, Sun, Instagram, Youtube, Twitter, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollToSection } = useSmoothScroll();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/2dd1c854-2387-4376-a795-05536ce9f03d/f1d1ec064a3ef596ffb8e416b548c034.png" 
              alt="Koollbreezze Logo" 
              className="h-12 w-auto"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick("home")}
              className="hover:text-orange-500 transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick("music")}
              className="hover:text-orange-500 transition-colors duration-300"
            >
              Music
            </button>
            <button 
              onClick={() => handleNavClick("videos")}
              className="hover:text-orange-500 transition-colors duration-300"
            >
              Videos
            </button>
            <button 
              onClick={() => handleNavClick("gallery")}
              className="hover:text-orange-500 transition-colors duration-300"
            >
              Gallery
            </button>
            <button 
              onClick={() => handleNavClick("about")}
              className="hover:text-orange-500 transition-colors duration-300"
            >
              About
            </button>
            <a 
              href="#beat-store"
              className="hover:text-orange-500 transition-colors duration-300 flex items-center space-x-1"
            >
              <span>🛒</span>
              <span>Beat Store</span>
            </a>
            <a 
              href="/admin"
              className="hover:text-orange-500 transition-colors duration-300 flex items-center space-x-1"
            >
              <span>👤</span>
              <span>Admin</span>
            </a>
            
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-gray-700"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a 
                href="https://instagram.com/koollbreezze" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com/@beatrepreneur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/koollbreezze" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://soundcloud.com/koollbreezze" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
              >
                <Music className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavClick("home")}
                className="text-left hover:text-orange-500 transition-colors duration-300"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick("music")}
                className="text-left hover:text-orange-500 transition-colors duration-300"
              >
                Music
              </button>
              <button 
                onClick={() => handleNavClick("videos")}
                className="text-left hover:text-orange-500 transition-colors duration-300"
              >
                Videos
              </button>
              <button 
                onClick={() => handleNavClick("gallery")}
                className="text-left hover:text-orange-500 transition-colors duration-300"
              >
                Gallery
              </button>
              <button 
                onClick={() => handleNavClick("about")}
                className="text-left hover:text-orange-500 transition-colors duration-300"
              >
                About
              </button>
              <a 
                href="#beat-store"
                className="text-left hover:text-orange-500 transition-colors duration-300 flex items-center space-x-1"
              >
                <span>🛒</span>
                <span>Beat Store</span>
              </a>
              <a 
                href="/admin"
                className="text-left hover:text-orange-500 transition-colors duration-300 flex items-center space-x-1"
              >
                <span>👤</span>
                <span>Admin</span>
              </a>
              
              <div className="flex space-x-4 pt-4">
                <a 
                  href="https://instagram.com/koollbreezze" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-500"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://youtube.com/@beatrepreneur" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-500"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com/koollbreezze" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-500"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://soundcloud.com/koollbreezze" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-500"
                >
                  <Music className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
