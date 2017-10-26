/* eslint global-require: 'off' */
const express = require('express');
const http = require('http');
const https = require('https');
const config = require('./config/config');
const winston = require('winston');

const app = express();

app.set('domain', config.get('app.host'));
app.set('port', config.get('app.port'));

require('./bootstrap/default-middlewares')(app);
require('./bootstrap/components')(config, app);
require('./bootstrap/error-handlers')(config, winston, app);

if (config.get('app.ssl.enabled')) {
  https.createServer({
    key: config.get('app.ssl.key'),
    cert: config.get('app.ssl.cert')
  }, app).listen(config.get('app.port'));
} else {
  http.createServer(app).listen(config.get('app.port'));
}
