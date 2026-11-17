const sequelize = require("../config/ConnectionDB");


const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const ProductCategory = require("../models/ProductCategoryModel");
const OptionsProduct = require("../models/OptionsProductModel");
const ImageProduct = require("../models/ImageProductModel");


const syncTables = async () => {
    await sequelize.sync();
    console.log("Tabelas sincronizadas com sucesso!")
}

const setupAssociations = async () => {

    Product.belongsToMany(Category, {
        through: ProductCategory,
        foreignKey: "product_id",
        otherKey: "category_id",
        as: "categories"
    });

    Category.belongsToMany(Product, {
        through: ProductCategory,
        foreignKey: "category_id",
        otherKey: "product_id",
        as: "products"
    });

    // Product 1:N OptionsProduct
    Product.hasMany(OptionsProduct, {
        foreignKey: "product_id",
        as: "options"
    });

    OptionsProduct.belongsTo(Product, {
        foreignKey: "product_id",
        as: "product"
    });

    // Product 1:N ImageProduct
    Product.hasMany(ImageProduct, {
        foreignKey: "product_id",
        as: "images"
    });

    ImageProduct.belongsTo(Product, {
        foreignKey: "product_id",
        as: "product"
    });


  console.log("Tabelas associadas com sucesso!");
}

const database = {
    syncDB: async () => {
        try {
            await sequelize.authenticate()
            console.log("Inicialização do banco de dados efetuada com sucesso!")
            await setupAssociations();
            await syncTables();
            console.log("Banco inicializado com sucesso");
        } catch (error) {
            console.log(error);
            console.log(`Erro na inicialização do banco de dados: ${error.message}`);
            throw error;
        }
    }
}

module.exports = database