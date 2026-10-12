// User's October 9–15 grocery plan. Estimates use typical labels; actual brands vary.
const foods={
 oats:['Maple-brown-sugar oatmeal',1,'packet',160,4],powder:['Protein powder',1,'scoop',120,24],milk:['Unsweetened almond milk',240,'ml',30,1],mandarin:['Mandarins',1,'each',45,1],apple:['Apples',1,'each',95,0.5],egg:['Eggs',1,'each',70,6],
 yogurt:['Greek yogurt',100,'g',70,9],granola:['Protein granola',30,'g',130,4],cereal:['Honey Nut Cheerios',37,'g',140,3],pb:['Peanut butter',16,'g',95,3.5],
 shrimp:['Shrimp (raw)',4,'oz',100,23],salmon:['Salmon (raw)',4,'oz',230,23],ahi:['Ahi tuna (raw)',4,'oz',130,27],tuna:['Canned tuna (drained)',1,'can',120,26],
 rice:['Ready rice',0.5,'pouch',190,4],pasta:['Spaghetti (dry)',3,'oz',315,11],potato:['Sweet potatoes (raw)',300,'g',258,5],broccoli:['Broccoli',40,'g',14,1],spinach:['Spinach',15,'g',4,0.4],seaweed:['Seaweed snacks',0.5,'pack',15,0.5],cheese:['Colby Jack',1,'slice',80,5],coconut:['Coconut water',500,'ml',90,0]
};
const make=(name,emoji,items,steps,note='')=>{
 const parts=items.map(item=>{const [key,mult=1]=Array.isArray(item)?item:[item,1];return {f:foods[key],mult};});
 return {name,emoji,cal:Math.round(parts.reduce((n,{f,mult})=>n+f[3]*mult,0)),protein:Math.round(parts.reduce((n,{f,mult})=>n+f[4]*mult,0)*10)/10,ingredients:parts.map(({f,mult})=>[f[0],f[1]*mult,f[2]]),steps,note,time:20};
};
export const groceryRecipes={
 G_OAT:make('Protein oatmeal shake + mandarin','🥤',['oats','powder','milk','mandarin'],["Cook one oatmeal packet with water according to its package; let cool.", "Blend with one scoop of protein powder and 240 ml unsweetened almond milk until smooth.", "Serve one mandarin on the side."]),
 G_SHRIMP_RICE:make('Shrimp rice bowl','🍚',['shrimp','rice','broccoli','spinach','seaweed'],["Heat \u00bd pouch of ready rice according to its package.", "Cook 4 oz shrimp until opaque and firm.", "Steam 40 g broccoli until tender.", "Wilt 15 g spinach with a splash of water.", "Combine the prepared ingredients and top with \u00bd pack of seaweed snacks."]),
 G_SALMON_POTATO:make('Salmon + roasted sweet potatoes','🍠',['salmon','potato','broccoli','spinach'],["Dice 300 g raw sweet potatoes and roast at 400\u00b0F / 200\u00b0C until tender, about 25\u201335 minutes.", "Cook 4 oz salmon to 145\u00b0F / 63\u00b0C.", "Steam 40 g broccoli until tender.", "Wilt 15 g spinach with a splash of water.", "Combine the prepared ingredients."]),
 G_YOGURT_GRANOLA:make('Greek yogurt + ¼ cup protein granola','🥣',[['yogurt',2],'granola'],["Measure 200 g Greek yogurt and top with 30 g protein granola."],'¼ cup granola is estimated as 30 g; check your label.'),
 G_COCONUT:make('Coconut water','🥥',['coconut'],['Drink one 500 ml bottle; check the label for calories.']),
 G_EGG_OATS:make('Eggs, maple oatmeal + Greek yogurt','🍳',[['egg',2],'oats','yogurt'],["Cook two eggs until whites and yolks are firm; serve on the side.", "Cook one maple-brown-sugar oatmeal packet with water according to its package; serve separately.", "Measure 100 g Greek yogurt; serve on the side."],'100 g yogurt is approximately ½ cup; adjust to your label.'),
 G_AHI_RICE:make('Cooked ahi poke-style rice bowl','🍚',['ahi','rice','spinach','seaweed'],["Heat \u00bd pouch of ready rice according to its package.", "Cook 4 oz ahi tuna to 145\u00b0F / 63\u00b0C, then slice; this recipe uses cooked tuna.", "Wilt 15 g spinach with a splash of water.", "Combine the prepared ingredients and top with \u00bd pack of seaweed snacks."]),
 G_TUNA_PASTA:make('Tuna spaghetti + spinach','🍝',['tuna','pasta','spinach'],["Cook 3 oz dry spaghetti according to its package; reserve a little pasta water and drain.", "Drain one can of tuna and warm through.", "Wilt 15 g spinach with a splash of water.", "Combine the prepared ingredients."],'Optional: one Colby Jack slice adds about 80 kcal and 5 g protein; it is not included in the base estimate.'),
 G_SHAKE_APPLE:make('Protein shake + apple','🥤',['powder','apple'],['Mix protein powder with water and serve the apple on the side.']),
 G_JUICE: {name:'Optional measured juice',emoji:'🧃',cal:0,protein:0,ingredients:[],steps:['If desired, measure 4–6 fl oz guava-mango or strawberry-kiwi juice. Log the amount you drink.'],note:'Optional; excluded from planned calories and groceries. Check your label: often approximately 60–100 kcal.',time:1},
 G_YOGURT_EGGS:make('Yogurt, granola, mandarin + eggs','🥣',[['yogurt',2],'granola','mandarin',['egg',2]],["Cook two eggs until whites and yolks are firm; serve on the side.", "Measure 200 g Greek yogurt and top with 30 g protein granola.", "Peel one mandarin; serve with the yogurt."]),
 G_SALMON_RICE:make('Salmon rice bowl','🍚',['salmon','rice','spinach','seaweed'],["Heat \u00bd pouch of ready rice according to its package.", "Cook 4 oz salmon to 145\u00b0F / 63\u00b0C.", "Wilt 15 g spinach with a splash of water.", "Combine the prepared ingredients and top with \u00bd pack of seaweed snacks."]),
 G_SHRIMP_PASTA:make('Shrimp spaghetti','🍝',['shrimp','pasta','broccoli','spinach'],["Cook 3 oz dry spaghetti according to its package; reserve a little pasta water and drain.", "Cook 4 oz shrimp until opaque and firm.", "Steam 40 g broccoli until tender.", "Wilt 15 g spinach with a splash of water.", "Combine the prepared ingredients."]),
 G_OAT_SHAKE:make('Protein-oat shake','🥤',['oats','powder','milk'],["Cook one oatmeal packet with water according to its package; let cool.", "Blend with one scoop of protein powder and 240 ml unsweetened almond milk until smooth."]),
 G_CEREAL_YOGURT:make('Cheerios, almond milk + Greek yogurt','🥣',['cereal','milk',['yogurt',2]],["Serve 37 g Cheerios with 240 ml unsweetened almond milk.", "Measure 200 g Greek yogurt; serve on the side."]),
 G_TUNA_POTATO:make('Tuna sweet potato bowl + cheese','🍠',['tuna','potato','spinach','cheese'],['Roast or air-fry the sweet potatoes until tender.','Drain tuna, wilt spinach, and combine. Melt one cheese slice over the bowl.']),
 G_AHI_BROCCOLI:make('Ahi rice bowl + broccoli','🍚',['ahi','rice','broccoli','seaweed'],["Heat \u00bd pouch of ready rice according to its package.", "Cook 4 oz ahi tuna to 145\u00b0F / 63\u00b0C, then slice; this recipe uses cooked tuna.", "Steam 40 g broccoli until tender.", "Combine the prepared ingredients and top with \u00bd pack of seaweed snacks."]),
 G_PB_OATS:{name:'Optional maple oatmeal + peanut butter',emoji:'🥣',cal:0,protein:0,ingredients:[],steps:['If hungry, cook one maple oatmeal packet and add one measured tablespoon (16 g) peanut butter.'],note:'Optional; excluded from base totals and grocery quantities. Adds about 255 kcal and 7.5 g protein.',time:5},
 G_SALMON_PASTA:make('Salmon spaghetti + spinach','🍝',['salmon','pasta','spinach'],["Cook 3 oz dry spaghetti according to its package; reserve a little pasta water and drain.", "Cook 4 oz salmon to 145\u00b0F / 63\u00b0C.", "Wilt 15 g spinach with a splash of water.", "Combine the prepared ingredients."]),
 G_YOGURT_APPLE:make('Greek yogurt, granola + apple','🍎',[['yogurt',2],'granola','apple'],["Measure 200 g Greek yogurt and top with 30 g protein granola.", "Wash and slice one apple; serve with the yogurt."]),
 G_EGG_CEREAL:make('Eggs, Cheerios, almond milk + yogurt','🍳',[['egg',2],'cereal','milk','yogurt'],["Cook two eggs until whites and yolks are firm; serve on the side.", "Serve 37 g Cheerios with 240 ml unsweetened almond milk.", "Measure 100 g Greek yogurt; serve on the side."]),
 G_TUNA_RICE:make('Tuna rice bowl','🍚',['tuna','rice','broccoli','spinach','seaweed'],["Heat \u00bd pouch of ready rice according to its package.", "Drain one can of tuna and warm through.", "Steam 40 g broccoli until tender.", "Wilt 15 g spinach with a splash of water.", "Combine the prepared ingredients and top with \u00bd pack of seaweed snacks."]),
 G_EGG_POTATO:make('Egg & sweet potato skillet','🍳',[['egg',2],'potato','spinach','cheese'],['Cook diced sweet potatoes with a splash of water until tender.','Add spinach, then eggs; cook until eggs are firm. Melt the cheese on top.']),
 G_EXTRA_OATS:{name:'Optional extra maple oatmeal',emoji:'🥣',cal:0,protein:0,ingredients:[],steps:['If needed, prepare one oatmeal packet according to its label.'],note:'Optional; excluded from base totals and grocery quantities. Adds approximately 160 kcal and 4 g protein.',time:5},
 G_YOGURT_OATS:make('Yogurt, granola, oatmeal + mandarin','🥣',[['yogurt',2],'granola','oats','mandarin'],["Cook one maple-brown-sugar oatmeal packet with water according to its package; serve separately.", "Measure 200 g Greek yogurt and top with 30 g protein granola.", "Peel one mandarin; serve with the yogurt."]),
 G_EGG_PASTA:make('Spaghetti, spinach, eggs + cheese','🍝',['pasta','spinach',['egg',2],['cheese',0.5]],['Cook and drain 3 oz dry spaghetti.','Wilt spinach, scramble eggs until firm, and combine with the pasta. Add half a slice of cheese.']),
 G_SHAKE:make('Protein shake','🥤',['powder'],['Mix one scoop with water according to its label.']),
 G_EXTRA_CEREAL:{name:'Optional small cereal bowl',emoji:'🥣',cal:0,protein:0,ingredients:[],steps:['If needed, measure 37 g Cheerios and 240 ml unsweetened almond milk.'],note:'Optional; excluded from base totals and grocery quantities. Adds approximately 170 kcal and 4 g protein.',time:2}
};
export const groceryPlan={
 '2026-10-09':['G_OAT','G_SHRIMP_RICE','G_SALMON_POTATO','G_YOGURT_GRANOLA','G_COCONUT'],
 '2026-10-10':['G_EGG_OATS','G_AHI_RICE','G_TUNA_PASTA','G_SHAKE_APPLE','G_JUICE'],
 '2026-10-11':['G_YOGURT_EGGS','G_SALMON_RICE','G_SHRIMP_PASTA','G_OAT_SHAKE','G_JUICE'],
 '2026-10-12':['G_CEREAL_YOGURT','G_TUNA_POTATO','G_AHI_BROCCOLI','G_YOGURT_GRANOLA','G_PB_OATS'],
 '2026-10-13':['G_OAT','G_SHRIMP_RICE','G_SALMON_PASTA','G_YOGURT_APPLE','G_COCONUT'],
 '2026-10-14':['G_EGG_CEREAL','G_TUNA_RICE','G_EGG_POTATO','G_SHAKE_APPLE','G_EXTRA_OATS'],
 '2026-10-15':['G_YOGURT_OATS','G_TUNA_POTATO','G_EGG_PASTA','G_SHAKE','G_EXTRA_CEREAL']
};
export const groceryPlanNote='October 9–15 · Your grocery-based pescatarian plan. Target: 1,750–1,850 kcal and 120–130 g protein. The listed portions do not reliably reach those targets: base estimates appear below; optional add-ons and actual labels change totals. Yogurt portions are measured to fit your two 32 oz tubs. Sweet potatoes replace the unspecified potatoes. Keep granola near ¼ cup, peanut butter near 1 tbsp and juice at 4–6 oz. Portion salmon into three 4 oz servings, shrimp into three 4 oz servings and ahi into two 4 oz servings; freeze the extra ahi and unused salmon. Refrigerate seafood for only 1–2 days; freeze later portions and thaw in the refrigerator. Emergency meal: ½ rice pouch + tuna/shrimp + greens + seaweed.';

// Apply this dated update once. Keep already eaten meals and all dates before today.
export function applyGroceryPlan(state,today){
 if(state.groceryPlanVersion==='2026-10-09')return false;
 state.plans??={};
 for(const [date,codes] of Object.entries(groceryPlan)){
  if(date<today)continue;
  state.plans[date]=codes.map((code,i)=>state.eaten?.[date+'|'+i]||code);
 }
 state.groceryPlanVersion='2026-10-09';return true;
}
