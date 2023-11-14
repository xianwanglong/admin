'use strict';

const Sequelize = require('sequelize');

module.exports = app => {
  const { STRING, INTEGER, DataTypes } = Sequelize;

  const GameList = app.model.define('gameList', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(32),
      allowNull: false,
    },
    age: {
      type: INTEGER,
      allowNull: false,
    },
    sex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[ 0, 1 ]],
      },
    },
    address: {
      type: STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return GameList;
};
