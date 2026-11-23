// Função para validar se uma URL de imagem é válida
export const validateImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  // Verificar se é uma URL válida
  try {
    new URL(url);
  } catch {
    // Se não é uma URL absoluta, verificar se é um caminho relativo válido
    if (!url.startsWith('/') && !url.startsWith('./') && !url.startsWith('../')) {
      return false;
    }
  }
  
  // Verificar extensões de imagem válidas
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
  const hasValidExtension = imageExtensions.some(ext => 
    url.toLowerCase().includes(ext)
  );
  
  return hasValidExtension;
};

// Função para otimizar URLs de imagem (adicionar parâmetros de qualidade, etc.)
export const optimizeImageUrl = (url: string, options?: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}): string => {
  if (!validateImageUrl(url)) return url;
  
  // Se é uma imagem do Lovable uploads, mantém como está
  if (url.includes('/lovable-uploads/')) {
    return url;
  }
  
  // Para outras imagens, poderia adicionar parâmetros de otimização
  // Por exemplo, para serviços como Cloudinary, ImageKit, etc.
  return url;
};

// Lista de URLs de fallback em ordem de prioridade
export const getFallbackUrls = (): string[] => [
  '/placeholder.svg',
  '/images/placeholder.png'
];

// Função para registrar erros de carregamento de imagem
export const logImageError = (url: string, error?: Error): void => {
  if (import.meta.env.DEV) {
    console.warn(`[Image Loading Error] Failed to load: ${url}`, error);
  }
  
  // Em produção, você poderia enviar para um serviço de monitoramento
  // como Sentry, LogRocket, etc.
};