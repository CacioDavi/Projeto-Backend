const AppError = require("../config/AppError");
const CategoryService = require("../services/CategoryService");

class CategoryController {

    async getCategoryById(req, res) {
        try {
            const category = await CategoryService.getCategoryById(req.params.id)
            res.status(200).json(category)
        } catch(e) {
            if(e instanceof AppError) {
                return res.status(e.statusCode).json({
                    error: e.name,
                    message: e.message
                });
            }
            
            return e;
        }
    }

    async getAllCategories(req, res) {
        try{
            const categories = await CategoryService.getAllCategories(req.query);
            res.status(200).json({data: categories.data, total: categories.total, limit: categories.limit, page: categories.page})
        }catch(e) {
            if(e instanceof AppError) {
                return res.status(e.statusCode).json({
                    error: e.name,
                    message: e.message
                });
            }
            
            return e;
        }
    }

    async createCategory(req, res) {
        try{
            await CategoryService.createCategory(req.body);
            res.sendStatus(201);
        } catch(e) {
            if(e instanceof AppError) {
                return res.status(e.statusCode).json({
                    message: e.message
                })
            }

            console.error(e);
            return res.status(500).json({
                message: "Erro interno do servidor"
            })
        }
    }
}

module.exports = new CategoryController();