import { useState } from "react";
import { Expand } from "lucide-react";

const galleryImages = [
  {
    id: "regal-attire",
    src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/2dd1c854-2387-4376-a795-05536ce9f03d/37fcfa0886492d0b92cfe796e6e03987.png",
    alt: "Koollbreezze - Regal Attire"
  },
  {
    id: "contemplative-look",
    src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/2dd1c854-2387-4376-a795-05536ce9f03d/27ce715a8bd633f9f63c0546f0a1b738.png",
    alt: "Koollbreezze - Contemplative Look"
  },
  {
    id: "sharp-style",
    src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/2dd1c854-2387-4376-a795-05536ce9f03d/4fd3dff7cbf504f9c9601b647fb3ba01.png",
    alt: "Koollbreezze - Sharp Style"
  },
  {
    id: "logo",
    src: "https://ziiteyctnftmpeivjjag.supabase.co/storage/v1/object/public/media/gallery_images/1748701968684_KoollbreezzeLogoGoldTransparentPNG2025Work.png",
    alt: "Koollbreezze - Logo"
  },
  {
    id: "fresco",
    src: "https://ziiteyctnftmpeivjjag.supabase.co/storage/v1/object/public/media/gallery_images/1748702026031_KoollBreezzeFresco2020s.PNG",
    alt: "KoollFresco"
  },
  {
    id: "purple",
    src: "https://ziiteyctnftmpeivjjag.supabase.co/storage/v1/object/public/media/gallery_images/1748702180421_Screenshot_20230426-042726%20(1).png",
    alt: "KoollInPurple"
  },
  {
    id: "black",
    src: "https://ziiteyctnftmpeivjjag.supabase.co/storage/v1/object/public/media/gallery_images/1748702215681_IMG_20240328_201314060_HDR.jpg",
    alt: "KoollInBlack"
  },
  {
    id: "devices",
    src: "https://ziiteyctnftmpeivjjag.supabase.co/storage/v1/object/public/media/gallery_images/1748702328817_RaymondEFavorscomp1-1.jpg",
    alt: "Koollwdevices"
  },
  {
    id: "bobonix",
    src: "https://ziiteyctnftmpeivjjag.supabase.co/storage/v1/object/public/media/gallery_images/1748733954632_BobonixLogo2025.png",
    alt: "Bobonix Logo"
  },
  {
    id: "shades-black",
    src: "https://ziiteyctnftmpeivjjag.supabase.co/storage/v1/object/public/media/gallery_images/1748804509203_IMG_20250523_195634618_HDR.jpg",
    alt: "Kooll in shades black"
  },
  {
    id: "shades-redone",
    src: "https://ziiteyctnftmpeivjjag.supabase.co/storage/v1/object/public/media/gallery_images/1748804571471_IMG_20250519_084707447.jpg",
    alt: "Kooll in shades Redone"
  },
  {
    id: "cowboy-hat",
    src: "https://ziiteyctnftmpeivjjag.supabase.co/storage/v1/object/public/media/gallery_images/1748804666346_IMG_20250405_012447827_HDR.jpg",
    alt: "Kooll in cowboy hat black"
  },
  {
    id: "suit-tie",
    src: "https://ziiteyctnftmpeivjjag.supabase.co/storage/v1/object/public/media/gallery_images/1748804789568_IMG_20241222_222348_611.webp",
    alt: "Kooll in suit and tie"
  }
];

interface GallerySectionProps {
  onImageClick: (imageSrc: string, imageAlt: string) => void;
}

export default function GallerySection({ onImageClick }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-20 gradient-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-6 text-gradient">
            GALLERY
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Photos from performances, studio sessions, and more
          </p>
        </div>
        
        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div 
              key={image.id}
              className="group cursor-pointer aspect-square overflow-hidden rounded-xl hover-glow relative"
              onClick={() => onImageClick(image.src, image.alt)}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <Expand className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
