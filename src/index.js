import config from './config';
console.log( JSON.stringify(config, null, 4) );

import server from './server.js';
server.listen(config.PORT);

console.log('listening on http://localhost:' + config.PORT);



