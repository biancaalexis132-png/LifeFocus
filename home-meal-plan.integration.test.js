import {test} from 'node:test';
import assert from 'node:assert/strict';
const RealDate=globalThis.Date;
globalThis.Date=class extends RealDate{constructor(...args){super(...(args.length?args:['2026-11-03T12:00:00']));}};
test('home meals render in the app and recipes expose ingredients and preparation',async()=>{
 const events={},storage=new Map(),els=new Map();
 const element=key=>{if(!els.has(key))els.set(key,{innerHTML:'',textContent:'',dataset:{},classList:{toggle(){},add(){},remove(){}},setAttribute(){},open:false,close(){this.open=false;},showModal(){this.open=true;},focus(){}});return els.get(key);};
 globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)};
 globalThis.document={querySelector:element,querySelectorAll:()=>[],documentElement:element('root'),body:element('body'),addEventListener:(name,fn)=>events[name]=fn};
 globalThis.matchMedia=()=>({matches:false,addEventListener(){}});
 globalThis.addEventListener=()=>{};globalThis.scrollTo=()=>{};
 const NativeFormData=globalThis.FormData;globalThis.FormData=class{constructor(f){this.values=f.values||{};}get(k){return this.values[k]??null;}getAll(k){return this.values[k]||[];}};
 const d=new Date(),date=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
 const click=dataset=>events.click({target:{closest:()=>({dataset})}});
 const submit=(id,values,dataset={})=>events.submit({preventDefault(){},target:{id,values,dataset}});
 const saved=()=>JSON.parse(storage.get('lifefocus-v1'));
 try{
  await import('./public/app.js');
  click({action:'week',week:'0',kind:'meals'});
  click({action:'day',date:'2026-11-03'});
  assert.match(element('#app').innerHTML,/Egg &amp; veggie|Egg & veggie/);
  assert.match(element('#app').innerHTML,/November 3–9/);
  assert.match(element('#app').innerHTML,/Planned base estimate:/);
  click({action:'recipe',recipe:'H_SALMON_BAGEL'});
  assert.match(element('#dialog').innerHTML,/Capers/);
  assert.match(element('#dialog').innerHTML,/145°F/);
  assert.ok(saved().plans['2026-11-03']);
 }finally{globalThis.FormData=NativeFormData;}
});
