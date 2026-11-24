import sharp from 'sharp';
import {readdir,mkdir,stat} from 'node:fs/promises';
import {basename} from 'node:path';
sharp.concurrency(1);
await mkdir('public/optimized',{recursive:true});
const files=(await readdir('public/lovable-uploads')).filter(f=>/^[a-f0-9-]{36}\.png$/i.test(f));
let before=0,after=0;
for(const file of files) {
 const source='public/lovable-uploads/'+file;before+=(await stat(source)).size;
 for(const width of [640,1280]) {
  const target=`public/optimized/${basename(file,'.png')}-${width}.webp`;
  let fresh=false;try{fresh=(await stat(target)).mtimeMs>=(await stat(source)).mtimeMs;}catch{}
  if(!fresh)await sharp(source).rotate().resize({width}).webp({quality:78,effort:3}).toFile(target);after+=(await stat(target)).size;
 }
}
for(const width of [800,1600])await sharp('src/assets/hero-yacht.jpg').rotate().resize({width}).webp({quality:80}).toFile(`public/optimized/hero-${width}.webp`);
console.log(`Optimized ${files.length} images: ${Math.round(before/1024/1024)}MB originals; ${Math.round(after/1024/1024)}MB for both responsive WebP variants.`);
