export function nextWeight(weight,reps,target=10,step=5){return reps>=target?Math.round((weight+step)*100)/100:weight;}
export function progression(history,base,step=5){
 const last=history.at(-1);
 if(!last)return {weight:base,action:'Start',reason:'Starting estimate only. Choose a comfortable weight for 3 sets of 8–10 reps.'};
 const round=n=>Math.round(n*100)/100;
 const complete=log=>Array.isArray(log.setReps)&&log.setReps.length===3&&log.setReps.every(Number.isFinite);
 if(!complete(last))return {weight:last.weight,action:'Hold',reason:'Your earlier log only recorded one set. Log all 3 sets before estimating an increase.'};
 const previous=history.at(-2);
 if(last.setReps.some(r=>r<8)&&previous&&complete(previous)&&previous.setReps.some(r=>r<8)&&Math.abs(last.weight-previous.weight)<0.01){
  const reduction=Math.max(step,last.weight*0.05);
  return {weight:round(Math.max(0,last.weight-reduction)),action:'Reduce',reason:'Two consecutive sessions at this weight fell below 8 reps on at least one set. Try a lighter load and rebuild.'};
 }
 if(last.setReps.every(r=>r>=10)&&last.effort==='comfortable')return {weight:round(last.weight+step),action:'Increase',reason:'All 3 sets reached 10 reps with at least 2 reps left. Add your configured increment, then work back toward 3 × 10.'};
 return {weight:last.weight,action:'Hold',reason:last.setReps.every(r=>r>=10)?'You reached the rep target, but the sets felt hard. Repeat this weight until you have at least 2 reps left.':'Keep this weight and build toward 10 reps on each of the 3 sets.'};
}
export function aggregateIngredients(meals,recipes){const result={};for(const meal of meals)for(const [name,amount,unit] of recipes[meal].ingredients){const key=name+'|'+unit;result[key]??={name,amount:0,unit};result[key].amount+=amount;}return Object.values(result);}
export function weekDays(month,week){const [y,m]=month.split('-').map(Number);const last=new Date(y,m,0).getDate();return Array.from({length:Math.min(7,last-week*7)},(_,i)=>`${month}-${String(week*7+i+1).padStart(2,'0')}`);}
