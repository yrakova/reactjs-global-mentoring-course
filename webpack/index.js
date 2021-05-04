const clientConfig = process.env.NODE_ENV === 'production'
? require('./webpack.client.prod.js')
: require('./webpack.client.dev.js');

const serverConfig = require('./webpack.server.js');

module.exports = [clientConfig, serverConfig];
  
