import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseDailyNutritionLine} from './public/daily-nutrition-import.js';

test('pasted actual daily totals parse separately from planned meal slots',()=>{
 const parsed=parseDailyNutritionLine('2026-11-08 | 870 kcal | 76.5 g protein | 90 g carbs | 21 g fat | 8 g fiber');
 assert.deepEqual(parsed,{date:'2026-11-08',totals:{calories:870,protein:76.5,carbs:90,fat:21,fiber:8}});
});
test('CSV-style totals work without optional fields',()=>{
 assert.deepEqual(parseDailyNutritionLine('2026-11-08,870,76.5,90,21'),{
  date:'2026-11-08',totals:{calories:870,protein:76.5,carbs:90,fat:21}
 });
});
test('sugar can be included as an optional final field',()=>{
 const parsed=parseDailyNutritionLine('2026-11-08 | 1500 | 110 | 140 | 50 | 18 | 27');
 assert.equal(parsed.totals.sugar,27);
});
test('malformed, missing and impossible values are rejected',()=>{
 for(const line of ['', '2026-02-30 | 400 | 25 | 50 | 8','2026-13-01 | 400 | 25 | 50 | 8','2026-11-08 | -5 | 20 | 40 | 5','2026-11-08 | 999999 | 20 | 40 | 5','2026-11-08 | 400 | 20 | missing | 5']){
  assert.throws(()=>parseDailyNutritionLine(line));
 }
});
