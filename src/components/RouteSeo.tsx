import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeo } from '@/lib/seo';
export default function RouteSeo() {
 const {pathname}=useLocation();
 useEffect(()=>{
  const seo=getSeo(pathname);document.title=seo.title;document.documentElement.lang='pt-BR';
  const meta=(attr:string,key:string,value:string)=>{let el=document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);if(!el){el=document.createElement('meta');el.setAttribute(attr,key);document.head.appendChild(el);}el.content=value;};
  meta('name','description',seo.description);meta('name','robots',seo.robots);
  for(const [key,value] of Object.entries({'og:title':seo.title,'og:description':seo.description,'og:url':seo.canonical,'og:image':seo.image,'og:locale':'pt_BR','og:site_name':'Bravissea','og:type':'website'}))meta('property',key,value);
  for(const [key,value] of Object.entries({'twitter:card':'summary_large_image','twitter:title':seo.title,'twitter:description':seo.description,'twitter:image':seo.image}))meta('name',key,value);
  let canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);}canonical.href=seo.canonical;
  let schema=document.getElementById('bravissea-schema');if(!schema){schema=document.createElement('script');schema.id='bravissea-schema';schema.setAttribute('type','application/ld+json');document.head.appendChild(schema);}schema.textContent=JSON.stringify(seo.schema);
 },[pathname]);return null;
}
