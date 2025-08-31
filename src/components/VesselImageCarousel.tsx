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

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ZoomIn className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Nenhuma imagem disponível</p>
          {isAdminMode && (
            <Button 
              onClick={onAddImage} 
              variant="outline" 
              size="sm" 
              className="mt-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeira Foto
            </Button>
          )}
        </div>
      </div>
    );
  }

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
                  onError={(e) => {
                    console.error('Erro ao carregar imagem:', image);
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzE3NS44IDEzNSAxNjAuMiAxNTEgMTYwIDIwMEMxNjAgMjQ5IDE3NS44IDI2NSAyMDAgMjUwQzIyNC4yIDI2NSAyNDAgMjQ5IDI0MCAyMDBDMjQwIDE1MSAyMjQuMiAxMzUgMjAwIDE1MFoiIGZpbGw9IiM5Q0E5QjQiLz4KPC9zdmc+';
                  }}
                />
                
                {/* Overlay com botões de ação */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/20">
                          <ZoomIn className="w-4 h-4 mr-2" />
                          Ampliar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl w-full bg-background/95 backdrop-blur-md">
                        <img
                          src={image}
                          alt={`${vesselName} - Foto ${index + 1}`}
                          className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                        />
                      </DialogContent>
                    </Dialog>
                    
                    {isAdminMode && (
                      <>
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="bg-white/20 backdrop-blur-sm text-white border-white/20"
                          onClick={() => onEditImage?.(index)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        {images.length > 1 && (
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="bg-red-500/80 backdrop-blur-sm text-white"
                            onClick={() => onDeleteImage?.(index)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remover
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                {/* Indicador de posição */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {index + 1} / {images.length}
                </div>
              </div>
            </CarouselItem>
          ))}
          
          {/* Botão para adicionar nova imagem (modo admin) */}
          {isAdminMode && (
            <CarouselItem>
              <div 
                className="w-full h-[400px] border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors group"
                onClick={onAddImage}
              >
                <div className="text-center">
                  <Plus className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-primary font-medium text-lg mb-2">Adicionar Nova Foto</p>
                  <p className="text-muted-foreground text-sm">Clique para fazer upload de múltiplas imagens</p>
                </div>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        
        {(images.length > 1 || isAdminMode) && (
          <>
            <CarouselPrevious className="left-4 bg-black/20 border-white/20 text-white hover:bg-black/40" />
            <CarouselNext className="right-4 bg-black/20 border-white/20 text-white hover:bg-black/40" />
          </>
        )}
      </Carousel>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                currentImage === index ? 'border-primary shadow-lg scale-105' : 'border-transparent hover:border-primary/50'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA4MCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyMkMzNy41IDIwIDM1LjUgMjEuNSAzNS41IDI4QzM1LjUgMzQuNSAzNy41IDM2IDQwIDM0QzQyLjUgMzYgNDQuNSAzNC41IDQ0LjUgMjhDNDQuNSAyMS41IDQyLjUgMjAgNDAgMjJaIiBmaWxsPSIjOUNBOUI0Ii8+Cjwvc3ZnPg==';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VesselImageCarousel;