'use strict';

const { Controller } = require('egg');

class GoodsListController extends Controller {
  async creatList() {
    const { ctx } = this;

    const { picture, goods_name, brand, price, article_number, grounding, new_product, recommend, sort_number, sku_inventory, sales_volume, audit_status } = ctx.query;

    const GoodsList = ctx.model.GoodsList;

    try {
      await GoodsList.create({
        picture,
        goods_name,
        brand,
        price: Number(price),
        article_number,
        grounding: JSON.parse(grounding),
        new_product: JSON.parse(new_product),
        recommend: JSON.parse(recommend),
        sort_number,
        sku_inventory,
        sales_volume,
        audit_status,
      });
      ctx.body = {
        code: 200,
        message: '创建成功',
      };
    } catch (error) {
      // console.log('error', error);
      ctx.status = 500;
      ctx.body = {
        code: -500,
        message: '服务器错误',
      };
    }
  }
}

module.exports = GoodsListController;
