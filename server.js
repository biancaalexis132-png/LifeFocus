import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.join(import.meta.dirname,'public');
http.createServer(async(req,res)=>{
 try {
  const name=new URL(req.url,'http://localhost').pathname;
  const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  const data=await readFile(file);
  res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript'})[path.extname(file)]||'application/octet-stream');res.end(data);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(process.env.PORT||3000,'0.0.0.0',()=>console.log('LifeFocus listening on port '+(process.env.PORT||3000)));
