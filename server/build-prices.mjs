import {readFileSync,writeFileSync} from 'node:fs';
const source=readFileSync('src/components/VesselCatalog.tsx','utf8');
const prices={};
for(const match of source.matchAll(/id: "([^"]+)"[\s\S]*?name: "([^"]+)"[\s\S]*?price: "R\$ ([\d.,]+)"/g)) {
 const value=Number(match[3].replaceAll('.','').replace(',','.'));
 if(!Number.isFinite(value)||value<=0)throw new Error('Invalid vessel price');
 prices[match[1]]={name:match[2],amountMicros:Math.round(value*1e6),currencyCode:'BRL'};
}
if(Object.keys(prices).length<18)throw new Error('Incomplete price catalog');
writeFileSync('server/prices.json',JSON.stringify(prices));
