const express = require("express");
const router = express.Router();
const limiter = require("../config/RateLimitConfig");
const auth = require("../config/AuthotizeRoutes");
const multer = require("multer");

const UserController = require("../controllers/UserController");
const CategoryController = require("../controllers/CategoryController");


router.use(limiter);

//Endpoint Usuários
router.get("/v1/user/:id", UserController.getUserById);
router.post("/v1/user", UserController.createUser);
router.put("/v1/user/:id", auth.tokenAuthorize, UserController.updateUser);
router.delete("/v1/user/:id",auth.tokenAuthorize,  UserController.deleteUser);

//Endpoint Categoria
router.post("/v1/category", CategoryController.createCategory);
router.get("/v1/category/search", CategoryController.getAllCategories);
router.get("/v1/category/:id", CategoryController.getCategoryById);
router.put("/v1/category/:id", CategoryController.updateCategory);
router.delete("/v1/category/:id", CategoryController.deleteCategory);

//Endepoint Produtos

//Endpoint Imagens Produtos

//Endpoint Opções de produtos

module.exports = router;