import {test} from 'node:test';
import assert from 'node:assert/strict';
import {homeRecipes,homePlan,groceryRecipes,applyGroceryPlan,noteForDate} from './public/home-meal-plan.js';
import {aggregateIngredients} from './public/model.js';
test('home week resolves five meals per day with measured available ingredients',()=>{
 assert.equal(Object.keys(homePlan).length,7);
 assert.equal(Object.keys(homePlan)[0],'2026-11-03');
 assert.equal(Object.keys(homePlan).at(-1),'2026-11-09');
 for(const codes of Object.values(homePlan)){
  assert.equal(codes.length,5);
  for(const code of codes){const r=homeRecipes[code];assert.ok(r);assert.ok(r.cal>0);assert.ok(r.protein>0);assert.ok(r.steps.length);}
 }
 const items=aggregateIngredients(Object.values(homePlan).flat(),groceryRecipes);
 assert.ok(items.every(i=>i.amount>0));
 assert.ok(items.every(i=>!/powder|rice|pasta|tuna|berries|granola|banana/i.test(i.name)));
 assert.match(noteForDate('2026-11-03'),/November 3–9/);
 assert.match(noteForDate('2026-10-09'),/October 9–15/);
});
test('new update upgrades existing states, preserves history and eaten meals, then keeps edits',()=>{
 const state={groceryPlanVersion:'2026-10-09',plans:{'2026-11-03':['historic'],'2026-11-04':['old']},eaten:{'2026-11-04|0':'B1'}};
 assert.equal(applyGroceryPlan(state,'2026-11-04'),true);
 assert.deepEqual(state.plans['2026-11-03'],['historic']);
 assert.equal(state.plans['2026-11-04'][0],'B1');
 assert.equal(state.plans['2026-11-04'][1],'H_BURGER');
 state.plans['2026-11-05']=['custom'];
 assert.equal(applyGroceryPlan(state,'2026-11-04'),false);
 assert.deepEqual(state.plans['2026-11-05'],['custom']);
});
