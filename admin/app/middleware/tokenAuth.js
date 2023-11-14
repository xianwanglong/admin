'use strict';

const jwt = require('jsonwebtoken');

module.exports = async function(ctx, next) {
  const token = ctx.request.header.authorization;
  if (!token) {
    ctx.status = 401;
    ctx.body = {
      code: 401,
      message: '缺少身份验证',
    };
    return;
  }
  try {
    const { keys } = ctx.app.config;
    const decoded = jwt.verify(token, keys);
    ctx.state.user_id = decoded.modelName.id;
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      code: 401,
      message: '无效身份',
    };
    return;
  }

  await next();
};
