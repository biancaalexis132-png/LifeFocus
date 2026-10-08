import {test} from 'node:test';
import assert from 'node:assert/strict';
import {nextWeight,progression,aggregateIngredients,weekDays} from './public/model.js';
import {recipes,schedule} from './public/meal-plan.js';
test('overload increases only when the rep target is achieved',()=>{assert.equal(nextWeight(65,9),65);assert.equal(nextWeight(65,10),70);assert.equal(nextWeight(20,12,10,2.5),22.5);});
test('session progression considers every set and effort',()=>{
 const log={weight:100,setReps:[10,10,10],effort:'comfortable'};
 assert.equal(progression([log],65,5).weight,105);
 assert.equal(progression([{...log,setReps:[10,9,10]}],65,5).action,'Hold');
 assert.equal(progression([{...log,effort:'hard'}],65,5).weight,100);
 assert.equal(progression([{weight:100,reps:10}],65,5).weight,100);
 assert.equal(progression([],65).weight,65);
 assert.equal(progression([log],65,2.5).weight,102.5);
});
test('two low-rep sessions suggest a reduction; one low session or changed loads do not',()=>{
 const low={weight:100,setReps:[8,7,6],effort:'hard'};
 assert.equal(progression([low,low],65).weight,95);
 assert.equal(progression([low],65).action,'Hold');
 assert.equal(progression([{...low,weight:95},low],65).action,'Hold');
 assert.equal(progression([{...low,weight:2},{...low,weight:2}],65,5).weight,0);
});
test('replacement exercises use their own set count and rep range',()=>{
 const routine={sets:2,minReps:10,maxReps:12};
 assert.equal(progression([{weight:30,setReps:[12,12],effort:'comfortable'}],20,2.5,routine).weight,32.5);
 assert.equal(progression([{weight:30,setReps:[12,11],effort:'comfortable'}],20,2.5,routine).weight,30);
 assert.equal(progression([{weight:30,setReps:[12,12,12],effort:'comfortable'}],20,2.5,routine).action,'Hold');
 assert.equal(progression([],20,2.5,routine).weight,20);
});
test('grocery list combines all planned servings without mixing units',()=>{assert.deepEqual(aggregateIngredients(['a','a','b'],{a:{ingredients:[['Rice',60,'g']]},b:{ingredients:[['Rice',40,'g'],['Lemon',0.5,'each']]}}),[{name:'Rice',amount:160,unit:'g'},{name:'Lemon',amount:0.5,unit:'each'}]);});
test('month weeks respect month boundaries and leap years',()=>{assert.equal(weekDays('2026-02',3).at(-1),'2026-02-28');assert.deepEqual(weekDays('2024-02',4),['2024-02-29']);assert.equal(weekDays('2026-10',4).length,3);});
test('PDF plan preserves supplied days, snacks, and known missing details',()=>{assert.equal(schedule.length,25);for(const day of schedule){assert.equal(day.length,5);for(const code of day)assert.ok(recipes[code]);}assert.deepEqual(schedule[0],['B1','L1','D1','S1','S2']);assert.equal(recipes.D7.ingredients.length,0);assert.ok(recipes.D4.note.includes('cut off'));assert.equal(recipes.B1.ingredients[0][1],250);});
