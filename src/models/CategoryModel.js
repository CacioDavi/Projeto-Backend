const { DataTypes } = require("sequelize");
const sequelize = require("../config/ConnectionDB");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
  },
  {
    tableName: "category",
  }
);

module.exports = Category;
