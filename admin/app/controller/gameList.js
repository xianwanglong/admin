'use strict';

const { Controller } = require('egg');

class GameListController extends Controller {
  async creatList() {
    const { ctx } = this;
    const { name, age, sex, address } = ctx.query;
    console.log('hh', name, age, sex, address);
    ctx.status = 200;
    ctx.body = {
      code: 200,
    };
  }
}

module.exports = GameListController;
