// Paste-friendly, strictly local import of daily actual nutrition summaries.
// Format: YYYY-MM-DD | calories | protein | carbs | fat | fiber (optional) | sugar (optional)
// Values may include labels/units, e.g. "870 kcal" or "76.5 g protein".
export function parseDailyNutritionLine(input){
 const line=String(input??'').trim();
 if(!line)throw new Error('Paste a daily summary first.');
 const values=line.split(/[|,]/).map(s=>s.trim());
 if(values.length<5||values.length>7)throw new Error('Use: date | calories | protein | carbs | fat | fiber (optional) | sugar (optional).');
 const date=values.shift();
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||new Date(date+'T12:00:00Z').toISOString().slice(0,10)!==date)throw new Error('Start with a valid YYYY-MM-DD date.');
 const labels=['calories','protein','carbs','fat','fiber','sugar'];
 const limits=[20000,1000,2000,1000,300,500];
 const totals={};
 for(let i=0;i<values.length;i++){
  const label=labels[i],clean=values[i].toLowerCase().replace(/\b(kcal|calories?|grams?|gram|g|protein|carbohydrates?|carbs?|fat|fiber|fibre|sugars?|total|estimated|approx)\b/gi,'').trim();
  if(clean===''&&i>=4)continue;
  if(!/^(?:\d+\.?\d*|\.\d+)$/.test(clean))throw new Error('Invalid '+label+' value. Use a nonnegative number.');
  const n=Number(clean);
  if(!Number.isFinite(n)||n<0||n>limits[i])throw new Error('Invalid '+label+' value.');
  totals[label]=Math.round(n*10)/10;
 }
 return {date,totals};
}
