// Preserve the original image bytes and resolution requested by the owner.
export function optimizedImage(src: string, _width?: 640 | 1280) { return src; }
export function imageSources(_src: string): string | undefined { return undefined; }
