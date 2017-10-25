/* eslint global-require: 'off' */

/**
 * @param {Config} config
 * @param {Function} app
 * @param {Function} app.get
 * @param {Function} app.use
 */
module.exports = (config, app) => {
  app.use('/api', require('../components/leaderboard').router());
};
