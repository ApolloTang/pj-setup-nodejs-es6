import http from 'http';

import api from './api'

console.log(api+'sdadf')

export default http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    const a = {a:'object spread is working'};
    const b = {b:'b'};
    const c = {...b, ...a};
    const s = JSON.stringify(c);
    console.log('hello again xx', s)
    res.end('Hello again'+s);
});


