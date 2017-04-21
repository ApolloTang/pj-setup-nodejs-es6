import http from 'http'

http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    const a = {a:'a'};
    const b = {b:'b'};
    const c = {...b};
    const s = JSON.stringify(c);
    console.log('hello again', s)
    res.end('Hello again'+s);
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');

