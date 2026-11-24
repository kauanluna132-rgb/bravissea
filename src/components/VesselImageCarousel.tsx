import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ImageWithFallback from "@/components/ui/image-with-fallback";

interface VesselImageCarouselProps {
  images: string[];
  vesselName: string;
}

const VesselImageCarousel = ({ images, vesselName }: VesselImageCarouselProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">Nenhuma imagem disponível</p>
        </div>
      </div>
    );
  }

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] bg-muted rounded-lg overflow-hidden group">
        {/* Error State */}
        {imageError[currentImage] && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Erro ao carregar imagem</p>
            </div>
          </div>
        )}
        
        <ImageWithFallback
          src={images[currentImage]}
          alt={`${vesselName} - Imagem ${currentImage + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded[currentImage] ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadingChange={(loading) => !loading && handleImageLoad(currentImage)}
          showLoader={true}
        />
        
        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 sm:w-10 sm:h-10"
              onClick={prevImage}
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 sm:w-10 sm:h-10"
              onClick={nextImage}
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </>
        )}

        {/* Zoom Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 sm:w-10 sm:h-10"
            >
              <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-[95vw] h-[95vh] p-2 sm:p-4">
            <ImageWithFallback
              src={images[currentImage]}
              alt={`${vesselName} - Imagem ${currentImage + 1}`}
              className="w-full h-auto max-h-full object-contain"
              showLoader={true}
            />
          </DialogContent>
        </Dialog>

        {/* Image Counter */}
        <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-black/50 text-white px-2 py-1 rounded text-xs sm:text-sm">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-14 h-10 sm:w-16 sm:h-12 lg:w-20 lg:h-16 rounded-md overflow-hidden border-2 transition-all ${
                index === currentImage
                  ? "border-primary"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <ImageWithFallback
                src={image}
                alt={`${vesselName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                showLoader={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VesselImageCarousel;