import config from './config';
console.log( JSON.stringify(config, null, 4) );

import server from './server.js';

server.listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');

