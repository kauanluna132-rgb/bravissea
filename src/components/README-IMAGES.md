# Sistema de Imagens - Bravissea

## Implementação Global Anti-Bug de Imagens

Este sistema foi implementado para garantir que **NUNCA MAIS** apareçam imagens em branco no site, independentemente de problemas de carregamento, URLs quebradas ou falhas de servidor.

## Componentes Principais

### 1. ImageWithFallback (Componente Principal)
- **Localização**: `src/components/ui/image-with-fallback.tsx`
- **Uso**: Substitui todas as tags `<img>` no site
- **Funcionalidades**:
  - ✅ Loading state com spinner
  - ✅ Fallback automático para placeholder
  - ✅ Múltiplos níveis de fallback
  - ✅ Logs de erro para debugging
  - ✅ Lazy loading nativo
  - ✅ Transições suaves

### 2. Hooks Utilitários
- **useImageLoader**: Hook para gerenciar estado de carregamento
- **useImagePreloader**: Hook para precarregar múltiplas imagens

### 3. Validação e Utilitários
- **imageValidation.ts**: Funções para validar URLs e logs
- **Placeholder automático**: SVG incorporado para fallback

## Como Usar

### Exemplo Básico
```tsx
import ImageWithFallback from "@/components/ui/image-with-fallback";

<ImageWithFallback
  src="/path/to/image.jpg"
  alt="Descrição da imagem"
  className="w-full h-full object-cover"
  showLoader={true}
/>
```

### Exemplo Avançado
```tsx
<ImageWithFallback
  src={vesselImage}
  alt={vesselName}
  fallbackSrc="/custom-placeholder.jpg"
  className="w-full h-64 object-cover"
  showLoader={false}
  onLoadingChange={(isLoading) => console.log('Loading:', isLoading)}
/>
```

## Locais Implementados

✅ **VesselCard.tsx** - Cards das embarcações
✅ **VesselImageCarousel.tsx** - Carrossel de imagens
✅ **Navbar.tsx** - Logo da empresa
✅ **Hero.tsx** - Imagem de fundo (pronto para implementação)

## Fallbacks Implementados

1. **Primeiro Nível**: Imagem original
2. **Segundo Nível**: Placeholder customizado (se fornecido)
3. **Terceiro Nível**: `/placeholder.svg` (padrão do sistema)
4. **Quarto Nível**: `/images/placeholder.png` (backup)
5. **Último Nível**: Mensagem "Imagem não disponível"

## Benefícios

### Para o Usuário
- ✅ Nunca mais verá imagens em branco
- ✅ Loading suave com indicadores visuais
- ✅ Experiência consistente em qualquer dispositivo

### Para o Desenvolvedor
- ✅ Logs automáticos de erros
- ✅ Sistema modular e reutilizável
- ✅ Fácil debugging e manutenção
- ✅ TypeScript completo

### Para o Negócio
- ✅ Site sempre funcional
- ✅ Aparência profissional mantida
- ✅ Redução de support por "imagens quebradas"

## Configuração Global

O sistema está configurado para:
- Detectar automaticamente imagens quebradas
- Aplicar fallbacks em cascata
- Registrar erros para monitoramento
- Otimizar performance com lazy loading

## Manutenção

### Para Adicionar Novas Imagens
1. Use sempre o componente `ImageWithFallback`
2. Forneça alt text descritivo
3. Configure fallback customizado se necessário

### Para Debugging
- Verifique console para logs de erro
- Use `showLoader={true}` durante desenvolvimento
- Teste com URLs quebradas para validar fallbacks

## Próximos Passos

- [ ] Implementar preload para imagens críticas
- [ ] Adicionar suporte a WebP automático
- [ ] Integrar com CDN de imagens
- [ ] Adicionar métricas de performance