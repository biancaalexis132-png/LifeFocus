import {groceryRecipes as previousRecipes,groceryPlan as previousPlan,groceryPlanNote as previousNote,applyGroceryPlan as applyPreviousPlan} from './grocery-meal-plan.js';
// Typical-label estimates for one serving. Package sizes and brands may differ.
const foods={
 bagel:['Bagels',1,'each',270,10],cream:['Garden veggie cream cheese',30,'g',80,2],capers:['Capers',10,'g',2,0],
 burger:['Beyond burger',1,'patty',230,20],beyond:['Beyond ground meat',113,'g',230,20],egg:['Eggs',1,'each',70,6],
 vanilla:['Vanilla Greek yogurt',200,'g',160,18],plain:['Plain Greek yogurt',200,'g',140,20],wings:['Vegan wings',100,'g',220,14],spam:['Omni vegan spam',100,'g',220,12],
 shrimp:['Shrimp (raw)',170,'g',145,34],salmon:['Salmon (raw)',140,'g',290,28],sausage:['Impossible breakfast sausage',1,'patty',150,6],
 oats:['Oatmeal (dry)',40,'g',150,5],cereal:['Cheerios',39,'g',140,5],milk:['Almond milk',240,'ml',30,1],apple:['Apples',1,'each',95,0.5],
 potato:['Sweet potatoes (raw)',250,'g',215,4],salad:['Salad greens',80,'g',15,1],pepper:['Bell peppers',150,'g',45,1.5]
};
const make=(name,emoji,items,steps,time=20)=>{
 const parts=items.map(item=>{const [key,mult=1]=Array.isArray(item)?item:[item,1];return {f:foods[key],mult};});
 return {name,emoji,cal:Math.round(parts.reduce((n,{f,mult})=>n+f[3]*mult,0)),protein:Math.round(parts.reduce((n,{f,mult})=>n+f[4]*mult,0)*10)/10,ingredients:parts.map(({f,mult})=>[f[0],f[1]*mult,f[2]]),steps,time,note:'Estimated nutrition; check your package labels. Portions are suggestions, since available quantities were not supplied.'};
};
const roast='Dice 250 g raw sweet potato. Roast at 400°F / 200°C until tender, about 25–35 minutes, using parchment or a splash of water.';
const greens='Wash salad greens and bell peppers before preparing. Use a splash of water in the pan as needed.';
export const homeRecipes={
 H_OATS:make('Apple oatmeal + plain Greek yogurt','🥣',['oats','milk','apple','plain'],['Cook 40 g oatmeal with 240 ml almond milk, adding water as needed.','Slice one apple and serve with oatmeal and 200 g plain Greek yogurt.'],10),
 H_BAGEL:make('Egg & veggie cream cheese bagel','🥯',['bagel','cream',['egg',2],['pepper',0.5]],['Toast one bagel and spread with 30 g garden veggie cream cheese.','Cook 75 g sliced bell pepper with a splash of water; add two eggs and cook until firm. Serve in the bagel.'],15),
 H_CEREAL:make('Cheerios + vanilla Greek yogurt','🥣',['cereal','milk','vanilla','apple'],['Serve 39 g Cheerios with 240 ml almond milk.','Serve 200 g vanilla Greek yogurt and one sliced apple on the side.'],5),
 H_SAUSAGE:make('Impossible sausage, eggs & bagel','🍳',['sausage',['egg',2],'bagel',['pepper',0.5]],['Cook one Impossible breakfast sausage patty according to its package.','Cook 75 g bell pepper and two eggs until eggs are firm; serve with a toasted bagel.'],15),
 H_SALMON_BAGEL:make('Cooked salmon bagel with capers','🥯',['salmon','bagel','cream','capers','salad'],['Cook 140 g raw salmon to 145°F / 63°C. Remove any bones and flake.','Toast one bagel, spread with 30 g garden veggie cream cheese and add salmon and 10 g capers.','Serve with 80 g washed salad greens.']),
 H_SHRIMP:make('Shrimp, peppers & sweet potato','🍤',['shrimp','pepper','potato',['plain',0.25]],[roast,greens,'Cook 170 g raw shrimp with 150 g sliced bell pepper until shrimp reach 145°F / 63°C and are opaque and firm. Serve with sweet potato and 50 g plain Greek yogurt.'],35),
 H_SALMON:make('Salmon, sweet potato & salad','🍠',['salmon','potato','salad','capers',['plain',0.25]],[roast,'Cook 140 g raw salmon to 145°F / 63°C.','Wash 80 g salad greens. Mix 50 g plain Greek yogurt with 10 g capers and a splash of water for dressing; serve with salmon and potato.'],35),
 H_BURGER:make('Beyond burger bagel + pepper salad','🍔',['burger','bagel','salad','pepper',['plain',0.25]],['Cook one Beyond burger according to its package. Toast one bagel.','Wash 80 g salad greens and 150 g bell pepper; slice the pepper. Serve the burger on the bagel with some greens and 50 g plain Greek yogurt, with remaining vegetables alongside.']),
 H_BEYOND:make('Beyond meat stuffed peppers','🫑',['beyond','pepper','potato',['plain',0.25]],[roast,'Halve and deseed 150 g bell pepper. Cook 113 g Beyond ground meat according to its package.','Fill peppers with cooked meat and bake until peppers are tender. Serve with sweet potato and 50 g plain Greek yogurt.'],35),
 H_WINGS:make('Vegan wings, sweet potato & salad','🥗',['wings','potato','salad',['plain',0.25]],[roast,'Cook 100 g vegan wings according to the package.','Wash 80 g salad greens; serve with wings, sweet potato and 50 g plain Greek yogurt as a dip.'],35),
 H_SPAM:make('Omni vegan spam, egg & pepper skillet','🍳',['spam',['egg',2],'pepper','potato'],[roast,'Cook 100 g sliced Omni vegan spam according to its package. Add 150 g sliced bell pepper and a splash of water; cook until tender.','Add two eggs and cook until firm. Serve with sweet potato.'],35),
 H_YOGURT:make('Vanilla Greek yogurt','🥣',['vanilla'],['Measure 200 g vanilla Greek yogurt and serve chilled.'],2),
 H_APPLE:make('Apple + plain Greek yogurt','🍎',['apple','plain'],['Wash and slice one apple; serve with 200 g plain Greek yogurt.'],3)
};
export const homePlan={
 '2026-11-03':['H_BAGEL','H_SALMON_BAGEL','H_SHRIMP','H_YOGURT','H_APPLE'],
 '2026-11-04':['H_OATS','H_BURGER','H_SALMON','H_YOGURT','H_APPLE'],
 '2026-11-05':['H_CEREAL','H_SHRIMP','H_BEYOND','H_YOGURT','H_APPLE'],
 '2026-11-06':['H_SAUSAGE','H_BEYOND','H_WINGS','H_YOGURT','H_APPLE'],
 '2026-11-07':['H_OATS','H_SALMON_BAGEL','H_SPAM','H_YOGURT','H_APPLE'],
 '2026-11-08':['H_BAGEL','H_BURGER','H_SHRIMP','H_YOGURT','H_APPLE'],
 '2026-11-09':['H_CEREAL','H_BEYOND','H_SALMON','H_YOGURT','H_APPLE']
};
export const groceryRecipes={...previousRecipes,...homeRecipes};
export const groceryPlan={...previousPlan,...homePlan};
export const groceryPlanNote='November 3–9 · Meals using your current foods at home, with three meals and two snacks daily. Quantities on hand were not supplied: check weekly ingredient totals and swap meals as needed. Nutrition uses typical labels, especially for plant-based meats and yogurt; totals are estimates, not a personalized calorie prescription. Almond milk is used in the recipes; dairy milk can be substituted using its label. Keep raw seafood refrigerated only 1–2 days; freeze later portions now and thaw in the refrigerator. Check sodium on vegan wings, vegan spam, burgers, sausage and capers.';
export const noteForDate=date=>homePlan[date]?groceryPlanNote:previousNote;
export function applyGroceryPlan(state,today){
 let changed=applyPreviousPlan(state,today);
 if(state.homePlanVersion==='2026-11-03')return changed;
 state.plans??={};
 for(const [date,codes] of Object.entries(homePlan)){
  if(date<today)continue;
  state.plans[date]=codes.map((code,i)=>state.eaten?.[date+'|'+i]||code);
 }
 state.homePlanVersion='2026-11-03';return true;
}
