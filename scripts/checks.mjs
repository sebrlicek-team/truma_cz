import fs from 'node:fs/promises';
import path from 'node:path';
export async function files(dir){const result=[];for(const entry of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isSymbolicLink())throw new Error(`Symbolický odkaz není povolen: ${p}`);if(entry.isDirectory())result.push(...await files(p));else result.push(p);}return result;}
export async function inspectAssets(dir){
 const all=await files(dir);
 for(const f of all){const rel=path.relative(dir,f);if(rel.split(path.sep).some(part=>part.startsWith('.')&&part!=='.assetsignore'||part==='node_modules')||/^(wrangler\.|package(-lock)?\.json)/.test(path.basename(f)))throw new Error(`Technický soubor v public: ${rel}`);if((await fs.stat(f)).size>25*1024*1024)throw new Error(`Soubor přesahuje 25 MiB: ${rel}. Zmenšete jej nebo použijte externí úložiště.`);}
 return all;
}
export async function checkLinks(dir){
 const all=await files(dir),known=new Set(all.map(f=>'/'+path.relative(dir,f).split(path.sep).join('/'))),docs=new Map();
 for(const f of all.filter(x=>x.endsWith('.html'))){const html=await fs.readFile(f,'utf8');const pathname='/'+path.relative(dir,f).split(path.sep).join('/');const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);if(new Set(ids).size!==ids.length)throw new Error(`Duplicitní ID: ${pathname}`);docs.set(pathname,{html,ids:new Set(ids)});}
 for(const [pathname,{html}] of docs){for(const m of html.matchAll(/\b(?:href|src|poster|data-src)="([^"]+)"/g)){
  const value=m[1].replaceAll('&amp;','&');if(!value.startsWith('/')&&!value.startsWith('#'))continue;
  const u=new URL(value,'https://local.invalid'+pathname);if(u.hostname!=='local.invalid')continue;
  const target=u.pathname.endsWith('/')?u.pathname+'index.html':u.pathname;
  if(!known.has(target))throw new Error(`Chybějící soubor ${value} na ${pathname}`);
  if(u.hash&&docs.has(target)&&!docs.get(target).ids.has(decodeURIComponent(u.hash.slice(1))))throw new Error(`Chybějící kotva ${value} na ${pathname}`);
 }}
}
