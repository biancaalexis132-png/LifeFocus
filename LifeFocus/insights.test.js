import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sumProtein,weekStart,dayStreak,longestStreak,weekStreak,onTimeStreak,bestLoss,milestones} from './public/insights.js';
test('protein sums known recipes and treats unknown macros as zero',()=>{assert.equal(sumProtein(['a','b','c'],{a:{protein:30},b:{protein:null},c:{protein:12}}),42);});
test('weeks start on Monday',()=>{assert.equal(weekStart('2026-10-08'),'2026-10-05');assert.equal(weekStart('2026-10-05'),'2026-10-05');assert.equal(weekStart('2026-10-04'),'2026-09-28');});
test('day streak survives an unfinished today but breaks on a missed day',()=>{
 const hits=new Set(['2026-10-05','2026-10-06','2026-10-07']),hit=d=>hits.has(d);
 assert.equal(dayStreak(hit,'2026-10-08'),3);
 hits.add('2026-10-08');assert.equal(dayStreak(hit,'2026-10-08'),4);
 assert.equal(dayStreak(hit,'2026-10-10'),0);
 assert.equal(longestStreak(['2026-09-30','2026-10-01','2026-10-03','2026-10-04','2026-10-05']),3);
});
test('week streak counts back from this or last week',()=>{
 const weeks=new Set(['2026-09-21','2026-09-28']);
 assert.equal(weekStreak(w=>weeks.has(w),'2026-10-08'),2);
 weeks.add('2026-10-05');assert.equal(weekStreak(w=>weeks.has(w),'2026-10-08'),3);
});
test('on-time injection streak allows one grace day and resets when overdue',()=>{
 const inj=d=>({date:d,time:''});
 const list=['2026-09-03','2026-09-10','2026-09-18','2026-09-25','2026-10-02'].map(inj);
 assert.equal(onTimeStreak(list,7,'2026-10-08'),5);
 assert.equal(onTimeStreak([inj('2026-08-01'),...list],7,'2026-10-08'),5);
 assert.equal(onTimeStreak(list,7,'2026-10-12'),0);
});
test('best loss never decreases after a regain, and milestones reflect counts',()=>{
 assert.equal(bestLoss([{date:'a',weight:200},{date:'b',weight:189.5},{date:'c',weight:192}]),10.5);
 const m=milestones({workoutDays:12,injections:4,loss:10.5,bestProteinStreak:7,bestWaterStreak:0,mealsEaten:0,reflections:0,unit:'lb'});
 const earned=new Set(m.filter(x=>x.earned).map(x=>x.id));
 for(const id of ['first-workout','workouts-10','injections-4','loss-5','loss-10','protein-7'])assert.ok(earned.has(id),id);
 for(const id of ['workouts-25','loss-15','water-7','first-checkin'])assert.ok(!earned.has(id),id);
});
