import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {build,root} from '../scripts/build.mjs';
test('České stránky: jazyk, místní běhový skript, externí dokumentace a aktivní parametry',async()=>{
 const manifest=JSON.parse(await fs.readFile(path.join(root,'src/truma/manifest.json'),'utf8'));
 assert.equal(manifest.pages.length,89);
 for(const p of manifest.pages){
  const html=await fs.readFile(path.join(root,'src/truma/pages',p.path,'index.html'),'utf8');
  assert.match(html,/<html[^>]*lang="cs"/);
  assert(!html.match(/<script[^>]+src="https?:/));
  assert(!html.includes('googletagmanager.com/gtag'));
  if(p.path.startsWith('/products/')&&!p.path.includes('/page/')&&p.path!='/products/'){
   assert(html.includes('data-keep-external="true"'));
   assert(html.includes('href="https://www.truma.com'+p.path+'"'));
   if(html.includes('id="content-product-details"'))assert(html.includes('aria-controls="content-product-details"'));
  }
 }
});
test('Aktivní český web: kompletní sestavení, soubory, kotvy a SEO bez ukázkového formuláře',async()=>{
 const tmp=await fs.mkdtemp(path.join(os.tmpdir(),'truma-build-'));
 try{const result=await build('truma',tmp);assert.equal(result.pages,89);const html=await fs.readFile(path.join(tmp,'index.html'),'utf8');assert.match(html,/Aventa/);assert(!html.includes('data-mode="demo"'));assert.match(html,/noindex,nofollow/);}finally{await fs.rm(tmp,{recursive:true,force:true});}
});
test('Kontrola ID nerozpoznává data-id jako HTML id',async()=>{
 const {checkLinks}=await import('../scripts/build.mjs');const tmp=await fs.mkdtemp(path.join(os.tmpdir(),'truma-ids-'));
 try{await fs.writeFile(path.join(tmp,'index.html'),'<div data-id="same"></div><div data-id="same"></div>');await checkLinks(tmp);await fs.writeFile(path.join(tmp,'index.html'),'<div id="same"></div><div id="same"></div>');await assert.rejects(checkLinks(tmp),/Duplicitní ID/);}finally{await fs.rm(tmp,{recursive:true,force:true});}
});
