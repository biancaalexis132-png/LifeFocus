import {test} from 'node:test';
import assert from 'node:assert/strict';
import {generateCode,normalizeCode,syncId,deriveKey,encryptState,decryptState,mergeStates} from './public/sync.js';
import {handle} from './netlify/functions/sync.mjs';
test('sync codes are random, formatted and forgiving to type',()=>{
 const a=generateCode(),b=generateCode();
 assert.match(a,/^[0-9A-HJKMNP-TV-Z]{5}(-[0-9A-HJKMNP-TV-Z]{5}){3}$/);assert.notEqual(a,b);
 assert.equal(normalizeCode(a.toLowerCase().replace(/-/g,' ')),a);
 assert.equal(normalizeCode('oooo0-11111-22222-33333'),'00000-11111-22222-33333');
 assert.equal(normalizeCode('too-short'),null);
});
test('data round-trips through encryption and ids differ per code',async()=>{
 const code=generateCode(),key=await deriveKey(code),state={body:[{date:'2026-10-01',weight:180}],note:'héllo'};
 const rec=await encryptState(state,key);
 assert.ok(!rec.data.includes('180'));
 assert.deepEqual(await decryptState(rec,key),state);
 assert.match(await syncId(code),/^[a-f0-9]{64}$/);
 assert.notEqual(await syncId(code),await syncId(generateCode()));
 await assert.rejects(decryptState(rec,await deriveKey(generateCode())));
});
test('merging keeps both devices’ entries and prefers local edits',()=>{
 const remote={unit:'lb',body:[{date:'a',weight:1},{date:'b',weight:2}],injections:[{id:'x',dose:2.5}],daily:{d1:{water:3}},logs:{k:{weight:50}}};
 const local={unit:'kg',body:[{date:'b',weight:3},{date:'c',weight:4}],injections:[{id:'y',dose:5}],daily:{d1:{protein:20},d2:{water:1}},logs:{}};
 const m=mergeStates(remote,local);
 assert.equal(m.unit,'kg');
 assert.deepEqual(m.body,[{date:'a',weight:1},{date:'b',weight:3},{date:'c',weight:4}]);
 assert.deepEqual(m.injections.map(i=>i.id),['x','y']);
 assert.deepEqual(m.daily,{d1:{water:3,protein:20},d2:{water:1}});
 assert.deepEqual(m.logs,{k:{weight:50}});
});
test('sync endpoint stores records, detects conflicts and validates input',async()=>{
 const mem=new Map(),store={get:async k=>mem.get(k)??null,setJSON:async(k,v)=>mem.set(k,v),delete:async k=>mem.delete(k)};
 const id='a'.repeat(64),url=`http://x/api/sync?id=${id}`;
 assert.equal((await handle(new Request('http://x/api/sync?id=bad'),store)).status,400);
 assert.equal((await handle(new Request(url),store)).status,404);
 const put=await handle(new Request(url,{method:'PUT',body:JSON.stringify({iv:'i',data:'d'})}),store);
 const {updatedAt}=await put.json();assert.equal(put.status,200);
 assert.equal((await (await handle(new Request(url),store)).json()).data,'d');
 assert.equal((await handle(new Request(url,{method:'PUT',body:JSON.stringify({iv:'i',data:'e',base:1})}),store)).status,409);
 assert.equal((await handle(new Request(url,{method:'PUT',body:JSON.stringify({iv:'i',data:'e',base:updatedAt})}),store)).status,200);
 assert.equal((await handle(new Request(url,{method:'PUT',body:'nope'}),store)).status,400);
 assert.equal((await handle(new Request(url,{method:'DELETE'}),store)).status,200);
 assert.equal((await handle(new Request(url),store)).status,404);
});
