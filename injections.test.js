import {test} from 'node:test';
import assert from 'node:assert/strict';
import {nextDue,suggestSite,currentDose,weightSinceStart,injectionsCSV,addDays,injectionSites} from './public/injections.js';
const inj=(date,dose,site,extra={})=>({id:date,date,time:'08:00',med:'Tirzepatide (Mounjaro)',dose,site,effects:[],notes:'',...extra});
test('next dose is due one interval after the latest injection, across months',()=>{
 assert.equal(nextDue([],7,'2026-10-08'),null);
 const list=[inj('2026-10-01',2.5,injectionSites[0]),inj('2026-09-24',2.5,injectionSites[1])];
 assert.deepEqual([nextDue(list,7,'2026-10-08').due,nextDue(list,7,'2026-10-08').status],['2026-10-08','today']);
 assert.equal(nextDue(list,7,'2026-10-05').days,3);
 assert.equal(nextDue(list,7,'2026-10-10').status,'overdue');
 assert.equal(addDays('2026-10-29',7),'2026-11-05');
 assert.equal(addDays('2026-03-05',-7),'2026-02-26');
});
test('site rotation suggests unused sites first, then the least recent',()=>{
 assert.equal(suggestSite([]),injectionSites[0]);
 assert.equal(suggestSite([inj('2026-10-01',2.5,injectionSites[0])]),injectionSites[1]);
 const all=injectionSites.map((s,i)=>inj(`2026-10-${String(10-i).padStart(2,'0')}`,2.5,s));
 assert.equal(suggestSite(all),injectionSites[5]);
});
test('current dose tracks when the latest dose step began',()=>{
 const list=[inj('2026-09-03',2.5,'a'),inj('2026-09-10',5,'a'),inj('2026-09-17',5,'a'),inj('2026-09-24',5,'a')];
 assert.deepEqual(currentDose(list),{dose:5,med:'Tirzepatide (Mounjaro)',since:'2026-09-10',count:3});
 assert.equal(currentDose([]),null);
});
test('weight change uses the check-in on or before the first injection',()=>{
 const body=[{date:'2026-08-30',weight:200},{date:'2026-09-02',weight:198},{date:'2026-10-01',weight:190.4}];
 assert.equal(weightSinceStart([inj('2026-09-03',2.5,'a')],body).change,-7.6);
 assert.equal(weightSinceStart([inj('2026-08-01',2.5,'a')],body).start.date,'2026-08-30');
 assert.equal(weightSinceStart([],body),null);
});
test('CSV export escapes commas, quotes and joins side effects',()=>{
 const csv=injectionsCSV([inj('2026-10-01',2.5,'Thigh – left',{effects:['Nausea','Fatigue'],notes:'Felt "fine", ate less'})]);
 assert.equal(csv.split('\n')[1],'2026-10-01,08:00,Tirzepatide (Mounjaro),2.5,Thigh – left,Nausea; Fatigue,"Felt ""fine"", ate less"');
});
