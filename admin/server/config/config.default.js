/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.security = {
    csrf: false,
    // 这里可以配置白名单
    // domainWhiteList: [ 'http://101.132.116.11:4000', 'http://101.132.116.11:3033' ],
  };

  config.keys = appInfo.name + '_1694680669350_1102';
  config.middleware = 'tokenAuth';

  config.sequelize = {
    dialect: 'mysql',
    database: 'forum_admin',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'long206279',
    define: {
      underscored: true,
      freezeTableName: true,
      charset: 'utf8mb4',
    },
  };

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
