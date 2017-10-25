const express = require('express');

const router = () => {
  const expressRouter = express.Router(); // eslint-disable-line new-cap

  /**
   * @swagger
   * @swaggerPath get /leaderboard/get-leaders
   */
  expressRouter.get(
    '/leaderboard/get-leaders',
    (req, res) => res.send('HELLO')
  );

  return expressRouter;
};

module.exports = {
  router
};
