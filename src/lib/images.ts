// Public derivatives are generated before the production build; development uses originals.
export function optimizedImage(src: string, width: 640 | 1280 = 1280) {
 if(!import.meta.env.PROD || !/^\/lovable-uploads\/[a-f0-9-]{36}\.png$/i.test(src))return src;
 return src.replace('/lovable-uploads/','/optimized/').replace('.png',`-${width}.webp`);
}
export function imageSources(src: string) {
 return optimizedImage(src)!==src ? `${optimizedImage(src,640)} 640w, ${optimizedImage(src,1280)} 1280w` : undefined;
}
