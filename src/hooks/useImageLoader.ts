import { useState, useEffect } from 'react';

interface ImageLoadState {
  loaded: boolean;
  error: boolean;
  loading: boolean;
}

export const useImageLoader = (src: string) => {
  const [state, setState] = useState<ImageLoadState>({
    loaded: false,
    error: false,
    loading: true,
  });

  useEffect(() => {
    if (!src) {
      setState({ loaded: false, error: true, loading: false });
      return;
    }

    setState({ loaded: false, error: false, loading: true });

    const img = new Image();
    
    img.onload = () => {
      setState({ loaded: true, error: false, loading: false });
    };
    
    img.onerror = () => {
      setState({ loaded: false, error: true, loading: false });
    };
    
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return state;
};

// Função utilitária para precarregar imagens
export const preloadImages = (urls: string[]): Promise<void[]> => {
  const promises = urls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });

  return Promise.allSettled(promises).then(() => []);
};

// Hook para precarregar múltiplas imagens
export const useImagePreloader = (urls: string[]) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (urls.length === 0) {
      setIsComplete(true);
      return;
    }

    let loadedImages = 0;
    setLoadedCount(0);
    setIsComplete(false);

    const loadImage = (url: string) => {
      const img = new Image();
      img.onload = () => {
        loadedImages++;
        setLoadedCount(loadedImages);
        if (loadedImages === urls.length) {
          setIsComplete(true);
        }
      };
      img.onerror = () => {
        loadedImages++;
        setLoadedCount(loadedImages);
        if (loadedImages === urls.length) {
          setIsComplete(true);
        }
      };
      img.src = url;
    };

    urls.forEach(loadImage);
  }, [urls]);

  return { loadedCount, isComplete, progress: (loadedCount / urls.length) * 100 };
};