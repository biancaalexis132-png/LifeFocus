// Daily nutrition, streaks, weekly check-ins and milestones: pure helpers (no DOM).
import {addDays,daysBetween,sortInjections} from './injections.js';

/** Grams of protein from recipe codes (recipes with unknown macros count as 0). */
export function sumProtein(codes,recipes){return codes.reduce((n,c)=>n+(Number(recipes[c]?.protein)||0),0);}

/** Monday of the week containing `date`. */
export function weekStart(date){const day=new Date(date+'T12:00:00').getDay();return addDays(date,-((day+6)%7));}
export function weekDates(start){return Array.from({length:7},(_,i)=>addDays(start,i));}

/** Consecutive days ending today (or yesterday, if today isn't done yet) where hit(date) is true. */
export function dayStreak(hit,today,limit=3650){
 let d=hit(today)?today:addDays(today,-1),n=0;
 while(n<limit&&hit(d)){n++;d=addDays(d,-1);}
 return n;
}
/** Longest run of consecutive dates in a set of YYYY-MM-DD strings. */
export function longestStreak(dates){
 const sorted=[...new Set(dates)].sort();let best=0,run=0,prev=null;
 for(const d of sorted){run=prev&&daysBetween(prev,d)===1?run+1:1;best=Math.max(best,run);prev=d;}
 return best;
}
/** Consecutive weeks (Mon–Sun) ending this week, or last week if this one isn't done yet. */
export function weekStreak(hit,today,limit=520){
 let w=weekStart(today);if(!hit(w))w=addDays(w,-7);let n=0;
 while(n<limit&&hit(w)){n++;w=addDays(w,-7);}
 return n;
}
/** Injections in a row taken within interval + grace days of the previous one (0 if currently overdue past grace). */
export function onTimeStreak(injections,interval,today,grace=1){
 const list=sortInjections(injections);if(!list.length)return 0;
 if(daysBetween(list.at(-1).date,today)>interval+grace)return 0;
 let n=1;for(let i=list.length-1;i>0;i--){if(daysBetween(list[i-1].date,list[i].date)<=interval+grace)n++;else break;}
 return n;
}
/** Largest drop from the first check-in to any later check-in (never decreases, so badges stay earned). */
export function bestLoss(body){
 const sorted=[...body].sort((a,b)=>a.date.localeCompare(b.date));if(sorted.length<2)return 0;
 return Math.max(0,Math.round((sorted[0].weight-Math.min(...sorted.slice(1).map(b=>b.weight)))*10)/10);
}

/** Milestone badges. `c` holds counts computed by the app. */
export function milestones(c){
 const u=c.unit||'lb',list=[
  ['first-workout','↗','First workout logged','Every routine starts with one session.',c.workoutDays>=1],
  ['workouts-10','↗','10 workouts','Ten training days logged.',c.workoutDays>=10],
  ['workouts-25','↗','25 workouts','A real habit is forming.',c.workoutDays>=25],
  ['workouts-50','↗','50 workouts','Fifty days of showing up.',c.workoutDays>=50],
  ['workouts-100','↗','100 workouts','Triple digits. Incredible.',c.workoutDays>=100],
  ['first-injection','✚','First injection logged','Your GLP-1 journey has begun.',c.injections>=1],
  ['injections-4','✚','One month of doses','4 injections logged.',c.injections>=4],
  ['injections-12','✚','Three months of doses','12 injections logged.',c.injections>=12],
  ['injections-26','✚','Six months of doses','26 injections logged.',c.injections>=26],
  ['injections-52','✚','One year of doses','52 injections logged.',c.injections>=52],
  ...[5,10,15,20,25,30,40,50,75,100].map(n=>[`loss-${n}`,'⌁',`${n} ${u} down`,`Down ${n} ${u} from your first check-in.`,c.loss>=n]),
  ['protein-7','◷','7-day protein streak','Hit your protein goal 7 days in a row.',c.bestProteinStreak>=7],
  ['protein-30','◷','30-day protein streak','A month of hitting your protein goal.',c.bestProteinStreak>=30],
  ['water-7','💧','7-day hydration streak','Hit your water goal 7 days in a row.',c.bestWaterStreak>=7],
  ['water-30','💧','30-day hydration streak','A month of hitting your water goal.',c.bestWaterStreak>=30],
  ['meals-50','◷','50 meals eaten','Fifty planned meals and snacks checked off.',c.mealsEaten>=50],
  ['first-totals','🔥','First daily totals','You logged your calories and macros.',c.totalsDays>=1],
  ['totals-30','🔥','30 days of totals','A month of tracking calories and macros.',c.totalsDays>=30],
  ['calories-7','🔥','7 days in range','Within your calorie goal 7 days in a row.',c.bestCalStreak>=7],
  ['first-checkin','♡','First weekly check-in','You took time to reflect on your week.',c.reflections>=1],
  ['checkins-4','♡','4 weekly check-ins','A month of reflecting on your progress.',c.reflections>=4],
 ];
 return list.map(([id,icon,title,detail,earned])=>({id,icon,title,detail,earned:Boolean(earned)}));
}
