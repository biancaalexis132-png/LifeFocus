import {test} from 'node:test';
import assert from 'node:assert/strict';
import {groceryRecipes as recipes,groceryPlan as plan,applyGroceryPlan} from './public/grocery-meal-plan.js';
import {aggregateIngredients} from './public/model.js';
test('dated grocery plan uses the purchased quantities and pescatarian ingredients',()=>{
 assert.deepEqual(Object.keys(plan),Array.from({length:7},(_,i)=>`2026-10-${String(9+i).padStart(2,'0')}`));
 const codes=Object.values(plan).flat();
 for(const code of codes){assert.ok(recipes[code]);assert.equal(plan[Object.keys(plan)[0]].length,5);}
 const items=aggregateIngredients(codes,recipes),amount=name=>items.find(i=>i.name===name).amount;
 assert.equal(amount('Shrimp (raw)'),12);assert.equal(amount('Salmon (raw)'),12);assert.equal(amount('Ahi tuna (raw)'),8);assert.equal(amount('Ready rice'),3);
 assert.ok(amount('Greek yogurt')<=64*28.3495);assert.ok(amount('Spinach')<=8*28.3495);assert.ok(amount('Broccoli')<=12*28.3495);assert.ok(amount('Sweet potatoes (raw)')<=3*453.592);
 assert.equal(amount('Seaweed snacks'),3);
 assert.ok(items.every(i=>!/chicken|bacon|ham|whole milk/i.test(i.name)));
});
test('grocery update preserves history, eaten meals and later customizations',()=>{
 const state={plans:{'2026-10-09':['B1'],'2026-10-10':['B2']},eaten:{'2026-10-10|0':'B2'}};
 assert.equal(applyGroceryPlan(state,'2026-10-10'),true);
 assert.deepEqual(state.plans['2026-10-09'],['B1']);
 assert.equal(state.plans['2026-10-10'][0],'B2');assert.equal(state.plans['2026-10-10'][1],'G_AHI_RICE');
 state.plans['2026-10-11']=['custom'];assert.equal(applyGroceryPlan(state,'2026-10-10'),false);assert.deepEqual(state.plans['2026-10-11'],['custom']);
});
