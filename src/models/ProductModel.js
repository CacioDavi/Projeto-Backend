const { DataTypes } = require("sequelize");
const sequelize = require("../config/ConnectionDB");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
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
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price_with_discont: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    

  },
  {
    tableName: "product",
  }
);

module.exports = Product;
