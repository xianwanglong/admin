'use strict';

const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = app => {
  const { STRING, INTEGER } = Sequelize;
  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(32),
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    avatar: STRING,
    user_type: {
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

  return User;
};
