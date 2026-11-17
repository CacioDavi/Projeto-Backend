const { DataTypes } = require("sequelize");
const sequelize = require("../config/ConnectionDB");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false,
    }
  },
  {
    tableName: "user",
  }
);

module.exports = User;
