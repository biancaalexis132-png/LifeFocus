import {test} from 'node:test';
import assert from 'node:assert/strict';
import {nextWeight,aggregateIngredients,weekDays} from './public/model.js';
import {recipes,schedule} from './public/meal-plan.js';
test('overload increases only when the rep target is achieved',()=>{assert.equal(nextWeight(65,9),65);assert.equal(nextWeight(65,10),70);assert.equal(nextWeight(20,12,10,2.5),22.5);});
test('grocery list combines all planned servings without mixing units',()=>{assert.deepEqual(aggregateIngredients(['a','a','b'],{a:{ingredients:[['Rice',60,'g']]},b:{ingredients:[['Rice',40,'g'],['Lemon',0.5,'each']]}}),[{name:'Rice',amount:160,unit:'g'},{name:'Lemon',amount:0.5,unit:'each'}]);});
test('month weeks respect month boundaries and leap years',()=>{assert.equal(weekDays('2026-02',3).at(-1),'2026-02-28');assert.deepEqual(weekDays('2024-02',4),['2024-02-29']);assert.equal(weekDays('2026-10',4).length,3);});
test('PDF plan preserves supplied days, snacks, and known missing details',()=>{assert.equal(schedule.length,25);for(const day of schedule){assert.equal(day.length,5);for(const code of day)assert.ok(recipes[code]);}assert.deepEqual(schedule[0],['B1','L1','D1','S1','S2']);assert.equal(recipes.D7.ingredients.length,0);assert.ok(recipes.D4.note.includes('cut off'));assert.equal(recipes.B1.ingredients[0][1],250);});
