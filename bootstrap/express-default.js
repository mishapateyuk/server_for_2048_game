const bodyParser = require('body-parser');

/**
 * @param {Function} app
 * @param {Function} app.use
 */
module.exports = (app) => {
  app.use(bodyParser.json());
};
