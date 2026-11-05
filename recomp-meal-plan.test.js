import {test} from 'node:test';
import assert from 'node:assert/strict';
import {recompRecipes,recompPlan,khrisDinners,guideDates,guideWeeks,groceryRecipes,applyGroceryPlan,pantryStatus,noteForDate} from './public/recomp-meal-plan.js';
import {aggregateIngredients} from './public/model.js';

test('30-day guide covers both months with five personal meals and a separate dinner',()=>{
 assert.equal(guideDates.length,30);assert.equal(guideDates[0],'2026-11-05');assert.equal(guideDates.at(-1),'2026-12-04');
 assert.deepEqual(guideWeeks.map(w=>w.length),[7,7,7,7,2]);
 assert.equal(guideWeeks[3][6],'2026-12-02');
 for(const date of guideDates){
  assert.equal(recompPlan[date].length,5);
  for(const code of recompPlan[date]){const r=recompRecipes[code];assert.ok(r);assert.equal(r.household,false);assert.ok(r.cal>0);assert.ok(r.protein>0);assert.ok(r.ingredients.every(([n,q,u])=>n&&q>0&&u));}
  assert.ok(recompRecipes[khrisDinners[date]].household);
  assert.equal(recompRecipes[khrisDinners[date]].cal,null);
 }
 assert.match(noteForDate('2026-12-04'),/110–125/);
 assert.match(noteForDate('2026-11-03'),/November 3–9/);
});

test('PDF nutrition estimates and first-week recipe quantities are preserved',()=>{
 const calories=guideDates.map(d=>recompPlan[d].reduce((n,c)=>n+recompRecipes[c].cal,0));
 assert.deepEqual(calories,[1949,1797,1965,1974,1947,1944,1914,1847,1932,1942,1867,1937,1924,1933,1887,1996,1914,1918,1889,1902,1898,1941,1945,1934,1942,1824,1916,1960,1949,1960]);
 const codes=guideWeeks[0].flatMap(d=>recompPlan[d]);
 const own=aggregateIngredients(codes,groceryRecipes);
 const household=aggregateIngredients([...codes,...guideWeeks[0].map(d=>khrisDinners[d])],groceryRecipes);
 const amount=(items,name)=>items.find(i=>i.name===name)?.amount||0;
 assert.equal(amount(own,'Ground beef — Khris'),0);assert.equal(amount(household,'Ground beef — Khris'),850);
 assert.equal(amount(household,'Shrimp (raw, peeled)'),470);assert.equal(amount(household,'Salmon (raw)'),445);
 assert.equal(amount(household,'Cod (raw)'),300);assert.equal(amount(household,'Ahi/yellowfin tuna (raw)'),115);
 assert.equal(amount(household,'Sweet potatoes (raw)'),1930);
 assert.equal(amount(household,'Nonfat Greek yogurt'),1925);
 assert.equal(pantryStatus('Bagels'),'Check pantry / refill');assert.equal(pantryStatus('PBfit'),'Buy if missing');
 for(const week of guideWeeks){const ahi=week.flatMap(d=>recompPlan[d]).flatMap(c=>recompRecipes[c].ingredients).filter(([n])=>n.includes('Ahi/'));assert.ok(ahi.reduce((n,i)=>n+i[1],0)<=115);}
});

test('PDF migration upgrades prior plans without losing history, eaten slots, goals or later edits',()=>{
 const goals={calMin:1700,calMax:1900,protein:120};
 const state={homePlanVersion:'2026-11-03',groceryPlanVersion:'2026-10-09',goals,plans:{'2026-11-04':['H_OATS'],'2026-11-05':['H_CEREAL']},eaten:{'2026-11-05|0':'H_CEREAL'}};
 assert.equal(applyGroceryPlan(state,'2026-11-05'),true);
 assert.deepEqual(state.plans['2026-11-04'],['H_OATS']);assert.equal(state.plans['2026-11-05'][0],'H_CEREAL');
 assert.equal(state.plans['2026-12-04'].length,5);assert.deepEqual(state.goals,goals);
 state.plans['2026-11-06']=['H_BURGER'];
 assert.equal(applyGroceryPlan(state,'2026-11-05'),false);assert.deepEqual(state.plans['2026-11-06'],['H_BURGER']);
});
