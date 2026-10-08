// LifeFocus sync endpoint. Stores one encrypted blob per sync id in Netlify Blobs.
// The browser encrypts before upload, so this function never sees readable data.
const MAX_BYTES=4_000_000;
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json','cache-control':'no-store'}});

export async function handle(req,store){
 const id=new URL(req.url).searchParams.get('id')||'';
 if(!/^[a-f0-9]{64}$/.test(id))return json({error:'Invalid sync id'},400);
 if(req.method==='GET'){
  const record=await store.get(id,{type:'json'});
  return record?json(record):json({error:'Not found'},404);
 }
 if(req.method==='PUT'){
  const text=await req.text();
  if(text.length>MAX_BYTES)return json({error:'Your data is too large to sync'},413);
  let body;try{body=JSON.parse(text);}catch{return json({error:'Invalid JSON'},400);}
  if(typeof body?.iv!=='string'||typeof body?.data!=='string'||body.iv.length>64)return json({error:'Invalid payload'},400);
  const current=await store.get(id,{type:'json'});
  if(current&&body.base!==current.updatedAt)return json({error:'conflict',updatedAt:current.updatedAt},409);
  const record={iv:body.iv,data:body.data,updatedAt:Date.now()};
  await store.setJSON(id,record);
  return json({updatedAt:record.updatedAt});
 }
 if(req.method==='DELETE'){await store.delete(id);return json({deleted:true});}
 return json({error:'Method not allowed'},405);
}

export default async req=>{
 const {getStore}=await import('@netlify/blobs');
 return handle(req,getStore({name:'lifefocus-sync',consistency:'strong'}));
};
export const config={path:'/api/sync'};
