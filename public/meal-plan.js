// Transcribed from the user's Whimsy Goth Recomp Tracker. Preparation steps
// are added by the app; the PDF supplies ingredient quantities and macro estimates.
const r=(name,emoji,cal,protein,ingredients,steps,note='')=>({name,emoji,cal,protein,ingredients,steps,note,time:20});
const yogurt=['Combine the yogurt, fruit, and other listed ingredients in a bowl or jar.','Mix well and serve chilled.'];
const bowl=['Prepare rice according to the package, or roast sweet potato until tender. Weigh the cooked portion shown.','Cook the listed seafood until safely cooked; fish should reach 145°F / 63°C. Cook vegetables until tender.','Assemble the bowl. Use listed ingredient quantities; additional oils or sauces change the nutrition.'];
const pasta=['Cook and drain the pasta according to its package. Weigh pasta dry before cooking.','Cook the seafood in the stock, then stir in spinach until wilted.','Combine with pasta. Additional oils or sauces change the nutrition.'];
export const recipes={
B1:r('PBfit Berry Yogurt Bowl','🫐',390,36,[['Greek yogurt',250,'g'],['PBfit',16,'g'],['Frozen berries',140,'g'],['Chia seeds',12,'g'],['Banana',60,'g']],yogurt),
B2:r('Berry Protein Smoothie','🫐',359,29,[['Protein powder',30,'g'],['Almond milk',240,'ml'],['Frozen berries',140,'g'],['Banana',100,'g'],['Chia seeds',12,'g']],['Blend all ingredients until smooth. Add water if needed.']),
B3:r('Beyond Breakfast Wrap','🌯',502,35,[['Beyond breakfast patties',92,'g'],['Tortilla',50,'g'],['Spinach',30,'g'],['Colby Jack',21,'g'],['Berries',100,'g'],['Protein powder',15,'g']],['Cook patties according to the package and wilt the spinach.','Fill the tortilla with patties, spinach, and cheese. Serve berries on the side. Mix the protein powder with water as a side drink.']),
B4:r('Banana PBfit Yogurt Bowl','🍌',401,38,[['Greek yogurt',250,'g'],['PBfit',24,'g'],['Banana',100,'g'],['Chia seeds',8,'g'],['Berries',70,'g']],yogurt),
B5:r('Berry Chia Parfait','🫐',310,25,[['Greek yogurt',220,'g'],['Berries',180,'g'],['Chia seeds',12,'g'],['Banana',50,'g']],yogurt),
L1:r('Ahi + Sweet Potato','🥗',483,50,[['Ahi tuna (raw)',150,'g'],['Sweet potato (cooked)',220,'g'],['Broccoli',150,'g']],bowl),
L2:r('Shrimp Brami Pasta','🍝',444,54,[['Shrimp (raw)',170,'g'],['Brami pasta (dry)',56,'g'],['Spinach',60,'g'],['Stock',120,'ml']],pasta),
L3:r('Tuna Caesar Wrap','🌯',441,39,[['Light tuna',1,'can'],['Tortilla',50,'g'],['Romaine',80,'g'],['Spinach',30,'g'],['Caesar dressing',15,'g'],['Colby Jack',21,'g']],['Drain tuna, wash greens, and combine with the measured dressing.','Layer the tuna, greens, and cheese in the tortilla and roll tightly.']),
L4:r('Cod Rice Bowl','🍚',429,45,[['Cod (raw)',170,'g'],['Ready rice (cooked)',125,'g'],['Spinach',60,'g']],bowl),
L5:r('Crab Brami Pasta','🍝',404,41,[['Blue crab (raw)',140,'g'],['Brami pasta (dry)',56,'g'],['Spinach',60,'g'],['Stock',120,'ml']],pasta),
L6:r('Shrimp Rice Bowl','🍚',469,49,[['Shrimp (raw)',170,'g'],['Ready rice (cooked)',125,'g'],['Broccoli',150,'g'],['Spinach',60,'g']],bowl),
L7:r('Squid Rice Bowl','🍚',443,36,[['Squid (raw)',170,'g'],['Ready rice (cooked)',125,'g'],['Broccoli',100,'g'],['Spinach',60,'g']],bowl),
L8:r('Salmon + Sweet Potato','🍠',488,36,[['Salmon (raw)',140,'g'],['Sweet potato (cooked)',220,'g'],['Broccoli',150,'g']],bowl),
D1:r('Salmon Rice + Broccoli','🍚',530,39,[['Salmon (raw)',140,'g'],['Ready rice (cooked)',125,'g'],['Broccoli',150,'g']],bowl),
D2:r('Cod + Sweet Potato Plate','🍠',473,47,[['Cod (raw)',170,'g'],['Sweet potato (cooked)',220,'g'],['Broccoli',150,'g']],bowl),
D3:r('Octopus Rice Bowl','🍚',469,48,[['Baby octopus (raw)',140,'g'],['Ready rice (cooked)',125,'g'],['Broccoli',100,'g'],['Stock',120,'ml']],['Prepare octopus according to its package until safely cooked and tender.','Heat rice and cook broccoli in stock, then assemble the measured portions.']),
D4:r('Beyond Sausage Bowl','🥘',436,26,[['Beyond Italian sausage',100,'g'],['Sweet potato (cooked)',180,'g']],['Cook sausage according to the package and serve with the cooked sweet potato portion.'],'Ingredient list is cut off in the PDF. Only the visible sausage and sweet potato are included in groceries; recipe and grocery totals are incomplete.'),
D5:r('Ahi Tuna Rice Bowl','🍚',470,48,[['Ahi tuna (raw)',150,'g'],['Ready rice (cooked)',125,'g'],['Broccoli',150,'g']],bowl),
D7:r('Salmon Wrap','🌯',null,null,[],[],'Scheduled in the PDF, but its recipe, quantities, and macros are missing. Add a replacement meal or consult your original plan. Not included in grocery totals.'),
S1:r('Greek Yogurt + Berries','🫐',150,18,[['Greek yogurt',170,'g'],['Berries',100,'g']],yogurt),
S2:r('Protein Shake','🥛',110,25,[['Protein powder',1,'scoop']],['Mix one scoop of your protein powder with water according to its package.'],'Scoop size varies by brand. Grocery totals keep scoops separate from measured grams.'),
S3:r('Greek Yogurt + Banana','🍌',189,18,[['Greek yogurt',170,'g'],['Banana',100,'g']],yogurt),
F1:r('Banana + Peanut Butter','🍌',232,6,[['Banana',100,'g'],['Peanut butter',24,'g']],['Slice banana and serve with the measured peanut butter.']),
F2:r('Yogurt, Peanut Butter + Berries','🫐',245,22,[['Greek yogurt',170,'g'],['Peanut butter',16,'g'],['Berries',100,'g']],yogurt)
};
// Order: breakfast, lunch, dinner, snack 1, snack 2. No invented days 26–30.
export const schedule=[
['B1','L1','D1','S1','S2'],['B2','L2','D2','S3','S1'],['B3','L3','D3','S1','S2'],['B4','L4','D4','S1','S2'],['B1','L5','D2','S3','S1'],['B2','L6','D5','S1','S2'],['B5','L7','D1','S1','S2'],
['B1','L8','D2','S1','S2'],['B3','L2','D7','S1','S2'],['B2','L3','D3','S3','S1'],['B4','L4','D4','S1','S2'],['B1','L5','D1','S2','S1'],['B5','L6','D2','S1','S2'],['B2','L7','D5','S1','S3'],
['B1','L1','D1','S1','S2'],['B2','L2','D2','S3','S1'],['B3','L3','D3','S1','S2'],['B4','L4','D4','S1','S2'],['B1','L5','D2','S3','S1'],['B2','L6','D5','S1','S2'],['B5','L7','D1','S1','S2'],
['B1','L8','D2','S1','S2'],['B3','L2','D7','S1','S2'],['B2','L3','D3','S3','S1'],['B4','L4','D4','S1','S2']
];
