import {loadEntries,validateEntries} from './site-content.mjs';
const entries=loadEntries();
const errors=validateEntries(entries);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Validated ${entries.length} Motion Atlas entries.`);
