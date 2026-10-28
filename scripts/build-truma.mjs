import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {checkSeo} from './check-seo.mjs';
import {checkLinks,inspectAssets} from './checks.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export async function buildTruma(out){
 const config=JSON.parse(await fs.readFile(path.join(root,'sites/truma.json'),'utf8'));
 const manifest=JSON.parse(await fs.readFile(path.join(root,'src/truma/manifest.json'),'utf8'));
 await inspectAssets(path.join(root,'public'));
 await fs.rm(out,{recursive:true,force:true});await fs.mkdir(out,{recursive:true});
 await fs.cp(path.join(root,'public'),out,{recursive:true});
 await fs.rm(path.join(out,'.assetsignore'),{force:true});
 await fs.cp(path.join(root,'src/truma/pages'),out,{recursive:true});
 const canonicalBase=config.url.replace(/\/$/,'');
 for(const page of manifest.pages){
  const file=path.join(out,page.path,'index.html');
  let html=await fs.readFile(file,'utf8');
  html=html.replace(/<link href="https:\/\/truma\.ccn-dev\.cz[^"]*" rel="canonical"\/>/,`<link rel="canonical" href="${canonicalBase+page.path}">`);
  html=html.replace(/<meta content="noindex,nofollow" name="robots"\/>/,`<meta name="robots" content="${config.indexable?'index,follow':'noindex,nofollow'}">`);
  await fs.writeFile(file,html);
 }
 const sitemap=manifest.pages.map(p=>`<url><loc>${canonicalBase+p.path}</loc></url>`).join('');
 await fs.writeFile(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>`);
 await fs.writeFile(path.join(out,'robots.txt'),config.indexable?`User-agent: *\nAllow: /\nSitemap: ${canonicalBase}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
 await fs.writeFile(path.join(out,'_headers'),`/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n${config.indexable?'':'  X-Robots-Tag: noindex, nofollow\n'}`);
 await fs.writeFile(path.join(out,'404.html'),'<!doctype html><html lang="cs"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Stránka nenalezena | Truma</title><style>body{font:20px Arial;padding:10vw;color:#005aaa}a{color:inherit}</style><h1>Tudy cesta nevede.</h1><p>Požadovaná stránka nebyla nalezena.</p><a href="/">Zpět na úvod</a></html>');
 await checkLinks(out);await checkSeo(out,{...config,pages:manifest.pages});
 return {name:'truma',pages:manifest.pages.length,out};
}
