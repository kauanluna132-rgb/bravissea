import { optimizedImage, imageSources } from "@/lib/images";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { validateImageUrl, getFallbackUrls, logImageError } from "@/utils/imageValidation";
import { imageCache } from "@/utils/imageOptimization";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  onLoadingChange?: (isLoading: boolean) => void;
  showLoader?: boolean;
}

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = "/placeholder.svg",
  className,
  onLoadingChange,
  showLoader = false,
  loading = "lazy",
  ...props 
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  // Validar URL inicial
  useEffect(() => {
    if (!validateImageUrl(src)) {
      console.warn(`Invalid image URL provided: ${src}`);
      setHasError(true);
      setIsLoading(false);
    }
  }, [src]);

  // Reset states when src changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
    setFallbackIndex(0);
  }, [src]);

  // Notify parent component about loading state
  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    imageCache.markAsLoaded(imgSrc);
  };

  const handleError = () => {
    logImageError(imgSrc);
    
    // Tentar fallbacks em sequência
    const fallbacks = [fallbackSrc, ...getFallbackUrls()];
    const nextFallback = fallbacks[fallbackIndex];
    
    if (nextFallback && imgSrc !== nextFallback && fallbackIndex < fallbacks.length) {
      console.warn(`Failed to load image: ${imgSrc}, trying fallback: ${nextFallback}`);
      setImgSrc(nextFallback);
      setFallbackIndex(prev => prev + 1);
    } else {
      console.error(`All fallback images failed for: ${src}`);
      setIsLoading(false);
      setHasError(true);
    }
  };

  return (
    <div className="relative inline-block w-full h-full">
      {/* Loading Spinner */}
      {isLoading && showLoader && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded z-10">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Error State - só mostra se todas as opções falharam */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded z-10">
          <div className="text-center p-4">
            <div className="w-8 h-8 bg-muted-foreground/20 rounded mb-2 mx-auto"></div>
            <p className="text-xs text-muted-foreground">Imagem indisponível</p>
          </div>
        </div>
      )}

      <img
        {...props}
        src={optimizedImage(imgSrc)}
        srcSet={imageSources(imgSrc)}
        sizes={props.sizes || "100vw"}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        decoding="async"
      />
    </div>
  );
};

export default ImageWithFallback;