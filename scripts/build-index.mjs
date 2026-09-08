import fs from 'node:fs';
import path from 'node:path';
import {loadEntries,validateEntries,root} from './site-content.mjs';
const entries=loadEntries(),errors=validateEntries(entries);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
const published=entries.map(x=>x.data).filter(x=>x.status==='published').sort((a,b)=>a.id.localeCompare(b.id));
fs.mkdirSync(path.join(root,'public'),{recursive:true});
fs.writeFileSync(path.join(root,'public','sites.json'),JSON.stringify(published,null,2)+'\n');
console.log(`Built public/sites.json with ${published.length} entries.`);
