const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const allowed=new Set(['/index.html','/app.js','/optics.js']);
const port=Number(process.argv[2]||8790);
http.createServer((req,res)=>{const p=req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0];if(!allowed.has(p)){res.writeHead(404);return res.end('Not found');}fs.readFile(path.join(__dirname,p),(e,b)=>{res.writeHead(e?404:200,{'Content-Type':p.endsWith('.js')?'text/javascript; charset=utf-8':'text/html; charset=utf-8'});res.end(e?'Not found':b);});}).listen(port,'127.0.0.1',()=>console.log(`http://127.0.0.1:${port}`));
