'use strict';
const tokenAuth = require('./middleware/tokenAuth');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.user.login);
  router.post('/register', controller.user.register);
  router.post('/gameList/creatList', tokenAuth, controller.gameList.creatList);
};
