import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightboxModalProps {
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export default function LightboxModal({ imageSrc, imageAlt, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl max-h-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-2xl hover:text-orange-500 z-10"
        >
          <X className="h-8 w-8" />
        </Button>
        <img 
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
      </div>
      
      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  );
}
