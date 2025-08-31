// Utilitários para otimização de imagens
export const getOptimizedImageUrl = (
  originalUrl: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  }
): string => {
  // Para URLs do Lovable uploads, retorna como está
  if (originalUrl.includes('/lovable-uploads/') || originalUrl.includes('/assets/')) {
    return originalUrl;
  }

  // Para outros provedores, aplicaria otimizações específicas
  return originalUrl;
};

// Preload crítico de imagens
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/lovable-uploads/3dd1c35b-81c4-4a09-85cd-8cd136cac6b0.png', // Logo
    '/placeholder.svg', // Placeholder
  ];

  criticalImages.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Função para detectar suporte a WebP
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => resolve(webP.height === 2);
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Cache de imagens carregadas
class ImageCache {
  private cache = new Map<string, boolean>();

  isLoaded(url: string): boolean {
    return this.cache.get(url) || false;
  }

  markAsLoaded(url: string): void {
    this.cache.set(url, true);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const imageCache = new ImageCache();