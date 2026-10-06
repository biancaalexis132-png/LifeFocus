import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sessions,sessionId,swapSessions,sourceDate,exerciseVideos} from './public/workout-plan.js';
test('Tuesday strength swaps with Thursday mobility and both complete sessions move',()=>{
 const original={};const changed=swapSessions(original,'2026-10-06','2026-10-08');
 assert.equal(sessionId(changed,'2026-10-06'),'Thursday');
 assert.equal(sessionId(changed,'2026-10-08'),'Tuesday');
 assert.match(sessions[sessionId(changed,'2026-10-08')].warm,/5 minutes/);
 assert.match(sessions[sessionId(changed,'2026-10-08')].cool,/90\/90/);
 assert.deepEqual(original,{});
});
test('repeated swaps keep the current sessions and customization source',()=>{
 let a=swapSessions({},'2026-10-06','2026-10-08');
 a=swapSessions(a,'2026-10-08','2026-11-02');
 assert.equal(sessionId(a,'2026-11-02'),'Tuesday');
 assert.equal(sourceDate(a,'2026-11-02'),'2026-10-06');
 assert.equal(sessionId(a,'2026-10-08'),'Monday');
 assert.deepEqual(swapSessions(a,'2026-11-02','2026-11-02'),a);
});
test('each session has warmup and cooldown, and all supplied exercises have direct videos',()=>{
 for(const s of Object.values(sessions)){
  assert.match(s.warm,/5 minutes/);assert.ok(s.cool.length>100);
  for(const e of s.items)assert.match(exerciseVideos[e.name],/^https:\/\/www\.youtube\.com\/watch\?v=/);
 }
 assert.equal(sessions.Wednesday.items.find(e=>e.name==='Lat pulldown').sets,2);
 assert.equal(sessions.Sunday.items.find(e=>e.name==='Lat pulldown').sets,3);
});
