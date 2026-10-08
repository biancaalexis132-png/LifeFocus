import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {handle as syncHandler} from './netlify/functions/sync.mjs';
const root=path.join(import.meta.dirname,'public');
// In-memory stand-in for Netlify Blobs during local development (data resets on restart).
const memory=new Map(),store={get:async k=>memory.has(k)?JSON.parse(memory.get(k)):null,setJSON:async(k,v)=>{memory.set(k,JSON.stringify(v));},delete:async k=>{memory.delete(k);}};
http.createServer(async(req,res)=>{
 try {
  const url=new URL(req.url,'http://localhost'),name=url.pathname;
  if(name==='/api/sync'){
   const chunks=[];for await(const c of req)chunks.push(c);
   const body=['GET','HEAD'].includes(req.method)?undefined:Buffer.concat(chunks);
   const out=await syncHandler(new Request(url,{method:req.method,body}),store);
   res.writeHead(out.status,Object.fromEntries(out.headers));res.end(await out.text());return;
  }
  const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  const data=await readFile(file);
  res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(data);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(process.env.PORT||3000,'0.0.0.0',()=>console.log('LifeFocus listening on port '+(process.env.PORT||3000)));
