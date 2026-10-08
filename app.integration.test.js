import {test} from 'node:test';
import assert from 'node:assert/strict';

test('daily nutrition, manual protein, empty meal days, weekly weights and settings validation',async()=>{
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
  submit('totals-form',{date,calories:'1800',protein:'90',carbs:'150',fat:'60',fiber:''});
  assert.equal(saved().daily[date].totals.protein,90);
  click({action:'protein',date,amount:'20'});
  assert.equal(saved().daily[date].totals.protein,110);
  assert.match(element('#app').innerHTML,/From your end-of-day totals/);
  click({action:'water',date,amount:'1'});assert.equal(saved().daily[date].water,1);
  submit('body-form',{date,weight:'180'});
  click({page:'checkin'});
  assert.match(element('#app').innerHTML,/<th>Weight<\/th>/);
  assert.match(element('#app').innerHTML,/180 lb/);
  click({action:'week',week:'4',kind:'meals'});
  click({action:'day',date:date.slice(0,8)+'30'});
  assert.match(element('#app').innerHTML,/Nutrition for this day/);
  const before=storage.get('lifefocus-v1');
  submit('settings-form',{unit:'kg',step:'5',theme:'dark',protein:'120',water:'8',workouts:'3',calMin:'2000',calMax:'1600'});
  assert.equal(storage.get('lifefocus-v1'),before);
  submit('settings-form',{unit:'lb',step:'5',theme:'dark',protein:'120',water:'8',workouts:'3',calMin:'1600',calMax:'2000'});
  assert.equal(saved().body[0].weight,180);
  assert.equal(element('root').dataset.theme,'dark');
  click({page:'progress'});
  assert.match(element('#app').innerHTML,/chart-band/);
 }finally{globalThis.FormData=NativeFormData;}
});
