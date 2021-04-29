const clientConfig = process.env.NODE_ENV === 'production'
? require('./webpack.prod.js')
: require('./webpack.dev.js');

const serverConfig = require('./webpack.server.js');

module.exports = [clientConfig, serverConfig];
  
