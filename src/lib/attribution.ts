import { canTrack } from './consent';
const entryUrl = typeof location !== 'undefined' ? location.href : '';
const KEY = 'bravissea_attribution_v1';
const TTL = 30 * 86400000;
const analyticsKeys = {utm_source:'utmSource',utm_medium:'utmMedium',utm_campaign:'utmCampaign',utm_content:'utmContent',utm_term:'utmTerm',utm_id:'utmId'};
const adKeys = {fbclid:'fbclid',gclid:'gclid',gbraid:'gbraid',wbraid:'wbraid',ttclid:'ttclid',campaign_id:'campaignId',adset_id:'adGroupId',adgroup_id:'adGroupId',ad_id:'adId',placement:'placement'};
type Touch = Record<string,string>;
type Attribution = {first:Touch,last:Touch,at:number};
let memory: Attribution | null = null;
let ready: Promise<void>;
function save() { try { if(memory) localStorage.setItem(KEY,JSON.stringify(memory)); else localStorage.removeItem(KEY); } catch {} }
function strip(t:Touch, analytics:boolean, advertising:boolean) {
 return Object.fromEntries(Object.entries(t).filter(([key]) => (Object.values(adKeys).includes(key) ? advertising : analytics)));
}
export function startAttribution() {
 const query = new URLSearchParams(location.search);
 const path = location.pathname;
 let ref='';try {ref=new URL(document.referrer).hostname;}catch{}
 ready=(async()=>{
  const [analytics,advertising]=await Promise.all([canTrack('analytics'),canTrack('advertising')]);
  try { const old=JSON.parse(localStorage.getItem(KEY)||'null'); if(old && Date.now()-old.at<TTL) memory=old; }catch{}
  if(memory) {memory.first=strip(memory.first,analytics,advertising);memory.last=strip(memory.last,analytics,advertising);}
  const touch:Touch={};
  for(const [keys,allowed] of [[analyticsKeys,analytics],[adKeys,advertising]] as const) if(allowed) for(const [param,field] of Object.entries(keys)) {const value=query.get(param);if(value)touch[field]=value.slice(0,500);}
  if(analytics) {touch.landingPath=path.slice(0,500);touch.referrerHost=ref;}
  if(Object.keys(touch).length) memory={first:memory&&Object.keys(memory.first).length?memory.first:touch,last:Object.keys(touch).some(k=>!['landingPath','referrerHost'].includes(k))?touch:(memory?.last||touch),at:Date.now()};
  else if(!analytics&&!advertising) memory=null;
  save();
 })();
 window.addEventListener('consent-change',()=>{void getAttribution();});
 window.addEventListener('storage',()=>{void getAttribution();});
}
export async function getAttribution(captureForThisSubmission = false):Promise<Record<string,string>> {
 await ready;
 const [analytics,advertising]=await Promise.all([canTrack('analytics'),canTrack('advertising')]);
 if(!analytics&&!advertising){memory=null;save();return {};}
 if(captureForThisSubmission) {
  const query=new URL(entryUrl).searchParams;const touch:Touch={};
  for(const [keys,allowed] of [[analyticsKeys,analytics],[adKeys,advertising]] as const) if(allowed) for(const [param,field] of Object.entries(keys)){const value=query.get(param);if(value)touch[field]=value.slice(0,500);}
  if(analytics){touch.landingPath=new URL(entryUrl).pathname;try{touch.referrerHost=new URL(document.referrer).hostname;}catch{}}
  if(Object.keys(touch).length) memory={first:memory&&Object.keys(memory.first).length?memory.first:touch,last:Object.keys(touch).some(k=>!['landingPath','referrerHost'].includes(k))?touch:(memory?.last||touch),at:Date.now()};
 }
 if(!memory || Date.now()-memory.at>=TTL){memory=null;save();return {};}
 memory.first=strip(memory.first,analytics,advertising);memory.last=strip(memory.last,analytics,advertising);save();
 return {...memory.last,firstTouch:JSON.stringify(memory.first),lastTouch:JSON.stringify(memory.last),attributionConsent:JSON.stringify({analytics,advertising})};
}
