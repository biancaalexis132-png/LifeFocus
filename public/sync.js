// Cross-device sync helpers. Data is encrypted in the browser with a key derived from the
// private sync code, so the server only ever stores ciphertext it cannot read.
const ALPHABET='0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford base32 (no I, L, O, U)
const enc=new TextEncoder(),dec=new TextDecoder();
const b64=bytes=>{let s='';for(const b of bytes)s+=String.fromCharCode(b);return btoa(s);};
const unb64=str=>Uint8Array.from(atob(str),c=>c.charCodeAt(0));

/** 20 random base32 characters (100 bits), shown as XXXXX-XXXXX-XXXXX-XXXXX. */
export function generateCode(){const bytes=crypto.getRandomValues(new Uint8Array(20));return formatCode(Array.from(bytes,b=>ALPHABET[b%32]).join(''));}
export function formatCode(raw){return raw.match(/.{1,5}/g).join('-');}
/** Accepts user-typed codes with any spacing/case; returns the formatted code or null. */
export function normalizeCode(input){
 const raw=String(input||'').toUpperCase().replace(/[^0-9A-Z]/g,'').replace(/O/g,'0').replace(/[IL]/g,'1');
 return raw.length===20&&[...raw].every(c=>ALPHABET.includes(c))?formatCode(raw):null;
}
export async function syncId(code){const hash=await crypto.subtle.digest('SHA-256',enc.encode('lifefocus-id:'+code));return Array.from(new Uint8Array(hash),b=>b.toString(16).padStart(2,'0')).join('');}
export async function deriveKey(code){
 const base=await crypto.subtle.importKey('raw',enc.encode(code),'PBKDF2',false,['deriveKey']);
 return crypto.subtle.deriveKey({name:'PBKDF2',salt:enc.encode('lifefocus-sync-v1'),iterations:150000,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
}
export async function encryptState(state,key){
 const iv=crypto.getRandomValues(new Uint8Array(12));
 const data=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,enc.encode(JSON.stringify(state)));
 return {iv:b64(iv),data:b64(new Uint8Array(data))};
}
export async function decryptState(record,key){
 const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:unb64(record.iv)},key,unb64(record.data));
 return JSON.parse(dec.decode(plain));
}

const isObj=v=>v&&typeof v==='object'&&!Array.isArray(v);
const byKey=(a,b,key)=>{const m=new Map();for(const x of [...a,...b])if(x&&x[key]!=null)m.set(x[key],x);return [...m.values()];};
/**
 * Combine two copies edited on different devices. Local values win when both changed the same
 * entry; records are merged by date (weights) or id (injections). Deletions made on only one
 * device while the other was offline may reappear.
 */
export function mergeStates(remote,local){
 if(!isObj(remote))return structuredClone(local);
 if(!isObj(local))return structuredClone(remote);
 const out=structuredClone(remote);
 for(const [k,v] of Object.entries(local)){
  const r=out[k];
  if(k==='body'&&Array.isArray(v)&&Array.isArray(r))out[k]=byKey(r,v,'date');
  else if(k==='injections'&&Array.isArray(v)&&Array.isArray(r))out[k]=byKey(r,v,'id');
  else if(k==='customExercises'&&Array.isArray(v)&&Array.isArray(r))out[k]=[...new Set([...r,...v])];
  else if(k==='milestones'&&Array.isArray(v)&&Array.isArray(r))out[k]=[...new Set([...r,...v])];
  else if(isObj(v)&&isObj(r))out[k]=mergeStates(r,v);
  else out[k]=structuredClone(v);
 }
 return out;
}
