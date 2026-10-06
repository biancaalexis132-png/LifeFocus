export function nextWeight(weight,reps,target=10,step=5){return reps>=target?Math.round((weight+step)*100)/100:weight;}
export function progression(history,base,step=5,{sets=3,minReps=8,maxReps=10}={}){
 const last=history.at(-1);
 if(!last)return {weight:base,action:'Start',reason:`Starting estimate only. Choose a comfortable weight for ${sets} sets of ${minReps}–${maxReps} reps.`};
 const round=n=>Math.round(n*100)/100;
 const complete=log=>Array.isArray(log.setReps)&&log.setReps.length===sets&&log.setReps.every(Number.isFinite);
 if(!complete(last))return {weight:last.weight,action:'Hold',reason:`Your earlier log uses a different set count. Log all ${sets} sets before estimating an increase.`};
 const previous=history.at(-2);
 if(last.setReps.some(r=>r<minReps)&&previous&&complete(previous)&&previous.setReps.some(r=>r<minReps)&&Math.abs(last.weight-previous.weight)<0.01){
  const reduction=Math.max(step,last.weight*0.05);
  return {weight:round(Math.max(0,last.weight-reduction)),action:'Reduce',reason:`Two consecutive sessions at this weight fell below ${minReps} reps on at least one set. Try a lighter load and rebuild.`};
 }
 if(last.setReps.every(r=>r>=maxReps)&&last.effort==='comfortable')return {weight:round(last.weight+step),action:'Increase',reason:`All ${sets} sets reached ${maxReps} reps with at least 2 reps left. Add your configured increment, then work back toward ${sets} × ${maxReps}.`};
 return {weight:last.weight,action:'Hold',reason:last.setReps.every(r=>r>=maxReps)?'You reached the rep target, but the sets felt hard. Repeat this weight until you have at least 2 reps left.':`Keep this weight and build toward ${maxReps} reps on each of the ${sets} sets.`};
}
export function aggregateIngredients(meals,recipes){const result={};for(const meal of meals)for(const [name,amount,unit] of recipes[meal].ingredients){const key=name+'|'+unit;result[key]??={name,amount:0,unit};result[key].amount+=amount;}return Object.values(result);}
export function weekDays(month,week){const [y,m]=month.split('-').map(Number);const last=new Date(y,m,0).getDate();return Array.from({length:Math.min(7,last-week*7)},(_,i)=>`${month}-${String(week*7+i+1).padStart(2,'0')}`);}
