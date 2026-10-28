import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {build,root} from './build.mjs';
import {selectProject} from './project.mjs';
const args=process.argv.slice(2);
const requested=args[0]?.startsWith('--')?undefined:args[0];
const option=name=>{const i=args.indexOf(name);return i>=0?args[i+1]:undefined;};
const result=await build(await selectProject(root,requested||process.env.SITE));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.jpg':'image/jpeg','.mp4':'video/mp4','.webm':'video/webm','.xml':'application/xml','.txt':'text/plain'};
const port=Number(option('--port')||process.env.PORT||4173);
http.createServer(async(req,res)=>{try{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const f=path.resolve(result.out,'.'+pathname+(pathname.endsWith('/')?'index.html':''));
 if(!f.startsWith(result.out+path.sep)){res.writeHead(403);res.end();return;}
 const data=await fs.readFile(f);res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
}catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await fs.readFile(path.join(root,'dist','404.html')));}}).listen(port,option('--host')||'127.0.0.1',()=>console.log(`Náhled: http://127.0.0.1:${port}`));
