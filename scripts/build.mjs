import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildTruma} from './build-truma.mjs';
import {selectProject} from './project.mjs';
export {files,inspectAssets,checkLinks} from './checks.mjs';
export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export async function build(name='truma',out=path.join(root,'dist')){if(name!=='truma')throw Error('Tato kopie obsahuje projekt truma.');return buildTruma(out);}
if(process.argv[1]===fileURLToPath(import.meta.url))selectProject(root,process.argv[2]||process.env.SITE).then(name=>build(name)).then(r=>console.log(`Hotovo: ${r.pages} stránek → ${r.out}`)).catch(e=>{console.error(e.message);process.exitCode=1;});
