import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const allowedCategories=new Set(['3D World','Particles','Mouse','Scroll','Game','Generative','Sound','Experimental']);

function value(raw){
  const text=raw.trim();
  try{return JSON.parse(text)}catch{return text}
}

export function parseEntry(file){
  const source=fs.readFileSync(file,'utf8');
  const match=source.match(/^---\n([\s\S]*?)\n---/);
  if(!match) throw new Error(`${file}: missing YAML front matter`);
  const data={};let section='';
  for(const line of match[1].split('\n')){
    if(!line.trim())continue;
    const nested=line.match(/^  ([a-zA-Z]+):\s*(.+)$/);
    if(nested&&section){data[section]??={};data[section][nested[1]]=value(nested[2]);continue}
    const top=line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if(!top)throw new Error(`${file}: cannot parse “${line}”`);
    section=top[1];
    if(top[2])data[section]=value(top[2]);
  }
  return data;
}

export function loadEntries(){
  const files=[];
  for(const dir of fs.readdirSync(path.join(root,'sites')).sort()){
    const file=path.join(root,'sites',dir,'index.md');
    if(fs.existsSync(file))files.push(file);
  }
  return files.map(file=>({file,data:parseEntry(file)}));
}

export function validateEntries(entries){
  const errors=[],ids=new Set(),slugs=new Set(),urls=new Set();
  for(const {file,data:s} of entries){
    const label=path.relative(root,file);
    for(const key of ['id','name','slug','url','category','technologies','interactions','hasSound','mobileFriendly','aiAssisted','status','description'])if(s[key]===undefined)errors.push(`${label}: missing ${key}`);
    if(!/^\d{3}$/.test(s.id||''))errors.push(`${label}: id must use three digits`);
    if(!/^https?:\/\//.test(s.url||''))errors.push(`${label}: invalid URL`);
    if(!allowedCategories.has(s.category))errors.push(`${label}: unknown category ${s.category}`);
    if(!Array.isArray(s.technologies)||!s.technologies.length)errors.push(`${label}: technologies must not be empty`);
    if(!Array.isArray(s.interactions)||!s.interactions.length)errors.push(`${label}: interactions must not be empty`);
    if(!s.description?.en||!s.description?.zh)errors.push(`${label}: English and Chinese descriptions are required`);
    if(!['draft','published'].includes(s.status))errors.push(`${label}: status must be draft or published`);
    for(const [set,key] of [[ids,'id'],[slugs,'slug'],[urls,'url']]){if(set.has(s[key]))errors.push(`${label}: duplicate ${key}`);set.add(s[key])}
  }
  return errors;
}

export {root};
