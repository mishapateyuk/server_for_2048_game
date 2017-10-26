const HttpError = require('standard-http-error');

/**
 * @param {Config} config
 * @param {Console} logger
 * @param {Function} logger.error
 * @param {IncomingMessage} request
 * @param {*} [request.body]
 * @param {object} body
 */
const logToConsole = (config, logger, request, body) => {
  if (config.get('error-log.log-to-console')) {
    logger.error(JSON.stringify({
      method: request.method,
      url: request.url,
      body: request.body || null,
      error: body
    }, null));
  }
};

/**
 * @param {Config} config
 * @param {ServerResponse} response
 * @param {Function} response.json
 * @param {object} body
 * @param {string} [errorName='']
 */
const logToBrowser = (config, response, body, errorName = '') => {
  if (config.get('error-log.log-to-browser-detailed')) {
    return response.json(body);
  }
  return response.json({ error: body.error });
};

/**
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 * @param {Function} next
 */
const handle404 = (request, response, next) => next(new HttpError(404));

/**
 * @param {HttpError|Error|object|*} error
 * @param {boolean} [error.isBoom]
 * @param {*} [error.data]
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 * @param {Function} next
 */
const handleRequestValidationError = (error, request, response, next) => {
  if (error.isBoom) {
    next(new HttpError(400, null, { validationError: error.data }));
  } else {
    next(error);
  }
};

/**
 * @param {Config} config
 * @param {Console} logger
 * @param {object} error
 * @param {string} [error.name]
 * @param {number} [error.status]
 * @param {string} [error.message]
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 * @param {Function} response.status
 * @param {Function} next
 */
const handleHttpError = (config, logger, error, request, response, next) => {
  if (error instanceof HttpError) {
    response.status(error.status);

    logToConsole(config, logger, request, error);
    logToBrowser(config, response, error, error.name);

    response.end();
  } else {
    next(error);
  }
};

/**
 * @param {Config} config
 * @param {Console} logger
 * @param {object} error
 * @param {string} [error.name]
 * @param {string} [error.stack]
 * @param {IncomingMessage} request
 * @param {object} [request.user]
 * @param {ServerResponse} response
 * @param {Function} response.status
 * @param {Function} next
 */
const handleInternalErrors = (config, logger, error, request, response, next) => {
  /* eslint no-unused-vars: 'off' */
  response.status(500);

  const body = {
    error: {
      status: 500,
      message: 'Internal Server Error'
    },
    details: error,
  };

  logToConsole(config, logger, request, body);
  logToBrowser(config, response, body);

  response.end();
};

/**
 * @param {Config} config
 * @param {Console} logger
 * @param {Function} app
 * @param {Function} app.use
 */
module.exports = (config, logger, app) => {
  app.use(handle404);
  app.use(handleRequestValidationError);
  app.use(handleHttpError.bind(null, config, logger));
  app.use(handleInternalErrors.bind(null, config, logger));
};
