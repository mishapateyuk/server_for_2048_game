/* eslint global-require: 'off' */

/**
 * @typedef {IncomingMessage} ExpressRequest
 * @property {User|object} user
 * @property {object} [query]
 * @property {object} [params]
 * @property {object} [body]
 * @property {object} session
 * @property {string} session.sessionCacheKey
 * @property {Function} isUnauthenticated
 * @property {Function} isAuthenticated
 */

/**
 * @typedef {ServerResponse} ExpressResponse
 * @property {Function} status
 * @property {Function} json
 * @property {Function} send
 */

/**
 * @typedef {Function(*)} ExpressNext
 */

/**
 * @param {Config} config
 * @param {Function} app
 * @param {Function} app.get
 * @param {Function} app.use
 */
module.exports = (config, app) => {
  app.use('/api', require('../components/leaderboard').router());
};
