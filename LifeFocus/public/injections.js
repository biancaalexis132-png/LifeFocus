// GLP-1 injection tracker: pure helpers (no DOM) so they can be unit tested.
export const injectionSites=['Abdomen – left','Abdomen – right','Thigh – left','Thigh – right','Upper arm – left','Upper arm – right'];
export const sideEffects=['Nausea','Reduced appetite','Fatigue','Constipation','Diarrhea','Heartburn','Headache','Injection-site reaction'];
export const medications=['Semaglutide (Ozempic)','Semaglutide (Wegovy)','Tirzepatide (Mounjaro)','Tirzepatide (Zepbound)','Compounded semaglutide','Compounded tirzepatide','Liraglutide (Saxenda)'];

const DAY=86400000;
const toTime=d=>new Date(d+'T12:00:00').getTime();
export function addDays(date,days){const d=new Date(toTime(date)+days*DAY);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function daysBetween(a,b){return Math.round((toTime(b)-toTime(a))/DAY);}

/** Injections sorted oldest → newest (by date, then time). */
export function sortInjections(list){return [...list].sort((a,b)=>(a.date+(a.time||'')).localeCompare(b.date+(b.time||'')));}

/** When the next dose is due and how far away it is, relative to `today`. */
export function nextDue(list,interval,today){
 const last=sortInjections(list).at(-1);
 if(!last)return null;
 const due=addDays(last.date,interval),days=daysBetween(today,due);
 return {due,days,status:days<0?'overdue':days===0?'today':'upcoming',last};
}

/** Suggest the site used least recently (never-used sites first, in list order). */
export function suggestSite(list,sites=injectionSites){
 const lastUsed={};
 for(const inj of sortInjections(list))if(sites.includes(inj.site))lastUsed[inj.site]=inj.date+(inj.time||'');
 return [...sites].sort((a,b)=>(lastUsed[a]??'').localeCompare(lastUsed[b]??''))[0];
}

/** Current dose and the date the user started it (for titration tracking). */
export function currentDose(list){
 const sorted=sortInjections(list),last=sorted.at(-1);
 if(!last)return null;
 let since=last.date,count=0;
 for(let i=sorted.length-1;i>=0&&sorted[i].dose===last.dose&&sorted[i].med===last.med;i--){since=sorted[i].date;count++;}
 return {dose:last.dose,med:last.med,since,count};
}

/** Body-weight change since the first injection (uses the check-in on/before it, else the first one after). */
export function weightSinceStart(list,body){
 const first=sortInjections(list)[0];
 const weights=[...body].sort((a,b)=>a.date.localeCompare(b.date));
 if(!first||weights.length<2)return null;
 const before=weights.filter(w=>w.date<=first.date).at(-1),start=before||weights.find(w=>w.date>first.date),latest=weights.at(-1);
 if(!start||start===latest)return null;
 return {start,latest,change:Math.round((latest.weight-start.weight)*10)/10};
}

const csvCell=v=>{const s=String(v??'');return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;};
export function injectionsCSV(list){
 const rows=[['Date','Time','Medication','Dose (mg)','Site','Side effects','Notes']];
 for(const i of sortInjections(list))rows.push([i.date,i.time,i.med,i.dose,i.site,(i.effects||[]).join('; '),i.notes]);
 return rows.map(r=>r.map(csvCell).join(',')).join('\n');
}
