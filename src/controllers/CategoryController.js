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
            let query = req.query;
            if (Object.keys(query).length == 0) {
                query.limit = -1;
            }
            const categories = await CategoryService.getAllCategories(query);
            
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

    async deleteCategory(req, res) {
        try {
            await CategoryService.deleteCategory(req.params.id);
            res.sendStatus(204);
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

    async updateCategory(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            await CategoryService.updateCategory(id, data)
            res.sendStatus(204);
        } catch (e) {
            if(e instanceof AppError) {
                return res.status(e.statusCode).json({
                    error: e.name,
                    message: e.message
                });
            }
            
            return e;
        }
    }
}

module.exports = new CategoryController();