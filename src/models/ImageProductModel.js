const { DataTypes } = require("sequelize");
const sequelize = require("../config/ConnectionDB");

const ImageProduct = sequelize.define(
  "ImageProduct",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "imageProduct",
  }
);

module.exports = ImageProduct;
