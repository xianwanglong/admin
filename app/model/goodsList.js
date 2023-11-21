'use strict';

const Sequelize = require('sequelize');

module.exports = app => {
  const { STRING, INTEGER, DECIMAL, BOOLEAN, DataTypes } = Sequelize;
  const GoodsList = app.model.define('goodsList', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    picture: {
      type: STRING,
      allowNull: false,
    },
    goods_name: {
      type: STRING,
      allowNull: false,
    },
    brand: {
      type: STRING,
      allowNull: false,
    },
    price: {
      type: DECIMAL(10, 2),
      allowNull: false,
    },
    article_number: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [ 11 ],
      },
    },
    grounding: {
      type: BOOLEAN,
      allowNull: false,
    },
    new_product: {
      type: BOOLEAN,
      allowNull: false,
    },
    recommend: {
      type: BOOLEAN,
      allowNull: false,
    },
    sort_number: {
      type: STRING,
      allowNull: false,
    },
    sku_inventory: {
      type: STRING,
      allowNull: false,
    },
    sales_volume: {
      type: STRING,
      allowNull: false,
    },
    audit_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[ 1, 2, 3 ]],
      },
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return GoodsList;
};
