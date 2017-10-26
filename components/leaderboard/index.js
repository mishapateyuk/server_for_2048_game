const express = require('express');
const HttpError = require('standard-http-error');

const router = () => {
  const expressRouter = express.Router(); // eslint-disable-line new-cap

  /**
   * @swagger
   * @swaggerPath get /leaderboard/get-leaders
   */
  expressRouter.get(
    '/leaderboard/get-leaders/:isError',
    (req, res) => {
      if (req.params.isError === 'true') {
        throw new HttpError(400);
      }
      res.send('HELLO');
    }
  );

  return expressRouter;
};

module.exports = {
  router
};
