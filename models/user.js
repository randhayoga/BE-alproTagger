"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.TEXT,
      role: DataTypes.ENUM("admin", "user"),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "user",
      paranoid: true,
      timestamps: true,
    }
  );
  return user;
};
