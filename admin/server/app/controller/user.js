'use strict';

const { Controller } = require('egg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.query;

    if (!username || !password) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: '缺少用户名或密码',
      };
      return;
    }

    try {
      const User = ctx.model.User;
      const modelName = await User.findOne({ where: { username } });
      if (!modelName) {
        ctx.status = 404;
        ctx.body = {
          code: 404,
          message: '账号不存在',
        };
        return;
      }
      const isPasswordMatch = bcrypt.compareSync(password, modelName.password);
      if (isPasswordMatch) {
        const { keys } = this.config;
        const token = jwt.sign({ modelName }, keys, { expiresIn: '30m' });
        ctx.status = 200;
        ctx.body = {
          code: 200,
          message: '登录成功',
          token,
        };
      } else {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: '登录失败，账号密码不匹配',
        };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        message: '服务器错误',
      };
    }
  }

  async register() {
    const { ctx } = this;
    const { username, password, user_type } = ctx.query;

    if (!username || !password || !user_type) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: '无效数据',
      };
      return;
    }
    if (![ 1, 2, 3 ].includes(parseInt(user_type))) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: '无效数据',
      };
      return;
    }

    try {
      const User = ctx.model.User;
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        ctx.status = 409;
        ctx.body = {
          code: 409,
          message: '用户名重复',
        };
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        username,
        password: hashedPassword,
        user_type,
      });

      ctx.body = {
        code: 200,
        message: '注册成功',
      };
    } catch (error) {
      console.log('error', error);
      ctx.status = 500;
      ctx.body = {
        code: -500,
        message: '服务器错误',
      };
    }
  }
}

module.exports = LoginController;
