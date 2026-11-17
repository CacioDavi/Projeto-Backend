const { DataTypes } = require("sequelize");
const db = require("../config/ConnectionDB");

const ProductCategory = db.define("ProductCategory", {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "product",
            key: "id"
        }
    },

    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "category",
            key: "id"
        }
    }
});

module.exports = ProductCategory;