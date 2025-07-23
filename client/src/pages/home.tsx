import { useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import MusicSection from "@/components/music-section";
import VideoSection from "@/components/video-section";
import GallerySection from "@/components/gallery-section";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";
import LightboxModal from "@/components/lightbox-modal";

export default function Home() {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  const handleImageClick = (imageSrc: string, imageAlt: string) => {
    setLightboxImage({ src: imageSrc, alt: imageAlt });
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <MusicSection />
      <VideoSection />
      <GallerySection onImageClick={handleImageClick} />
      <AboutSection />
      <Footer />
      {lightboxImage && (
        <LightboxModal 
          imageSrc={lightboxImage.src}
          imageAlt={lightboxImage.alt}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
