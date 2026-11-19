const express = require("express");
const router = express.Router();
const limiter = require("../config/RateLimitConfig");
const auth = require("../config/AuthotizeRoutes");
const multer = require("multer");

const UserController = require("../controllers/UserController");


router.use(limiter);

//Endpoint Usuários
router.get("/v1/user/:id", UserController.getUserById);
router.post("/v1/user", UserController.createUser);
router.put("/v1/user/:id", auth.tokenAuthorize, UserController.updateUser);
router.delete("/v1/user/:id",auth.tokenAuthorize,  UserController.deleteUser);

//Endpoint Categoria

//Endepoint Produtos

//Endpoint Imagens Produtos

//Endpoint Opções de produtos

module.exports = router;