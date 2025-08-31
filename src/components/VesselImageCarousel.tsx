import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, Edit, Plus, Trash2 } from "lucide-react";

interface VesselImageCarouselProps {
  images: string[];
  vesselName: string;
  isAdminMode?: boolean;
  onAddImage?: () => void;
  onEditImage?: (index: number) => void;
  onDeleteImage?: (index: number) => void;
}

const VesselImageCarousel = ({ 
  images, 
  vesselName, 
  isAdminMode = false,
  onAddImage,
  onEditImage,
  onDeleteImage
}: VesselImageCarouselProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative group">
                <img
                  src={image}
                  alt={`${vesselName} - Foto ${index + 1}`}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
                
                {/* Overlay com botões de ação */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm">
                          <ZoomIn className="w-4 h-4 mr-2" />
                          Ampliar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full">
                        <img
                          src={image}
                          alt={`${vesselName} - Foto ${index + 1}`}
                          className="w-full h-auto max-h-[80vh] object-contain"
                        />
                      </DialogContent>
                    </Dialog>
                    
                    {isAdminMode && (
                      <>
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="bg-white/20 backdrop-blur-sm"
                          onClick={() => onEditImage?.(index)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          className="bg-red-500/80 backdrop-blur-sm"
                          onClick={() => onDeleteImage?.(index)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remover
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Indicador de posição */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {index + 1} / {images.length}
                </div>
              </div>
            </CarouselItem>
          ))}
          
          {/* Botão para adicionar nova imagem (modo admin) */}
          {isAdminMode && (
            <CarouselItem>
              <div 
                className="w-full h-[400px] border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                onClick={onAddImage}
              >
                <div className="text-center">
                  <Plus className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-primary font-medium">Adicionar Nova Foto</p>
                  <p className="text-muted-foreground text-sm">Clique para fazer upload</p>
                </div>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </>
        )}
      </Carousel>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                currentImage === index ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VesselImageCarousel;