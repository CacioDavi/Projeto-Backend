const AppError = require("../config/AppError");
const Category = require("../models/CategoryModel");
const Bool = require("../utils/Bool");

class CategoryService {
    async getCategoryById(id) {
        const category = await Category.findByPk(id, {
            attributes: [
                "id", "name", "slug", "use_in_menu"
            ]
        });
        if(category == null) 
            throw new AppError("Nenhuma categoria encontrada", 404);
        return category;
    }

    async getAllCategories({limit=-1, page = 1, fields, use_in_menu}) {

        if(isNaN(limit) || isNaN(page)) {
            throw new AppError("As queries 'Limit' e 'Page' devem ser números inteiros", 400);
        }
        if(!Bool.isBool(use_in_menu) && use_in_menu !== undefined) {
            throw new AppError("'use_in_menu' deve ser preenchido com valores booleanos", 400);
        }
        
        const options = {
            order: [['id', 'ASC']],
            where: {
                ...(use_in_menu !== undefined && {use_in_menu: Bool.parseBool(use_in_menu)})
            }
        }
        
        const cols = fields ? fields.split(",").map(field => field.trim()).filter(Boolean) : undefined;
        if(cols?.length) 
            options.attributes = cols;

        if(parseInt(limit) !== -1) {
            options.limit = parseInt(limit);
            options.offset = (page - 1) * limit;
        }
        
        const {count, rows} = await Category.findAndCountAll(options);

        const Response = {
            data: rows,
            total: count,
            limit: parseInt(limit),
            page: parseInt(page),
        };
        
        return Response;
    }

    async createCategory({name, slug, use_in_menu}) {
        if(!name || !slug || use_in_menu == null)
            throw new AppError("Todos os campos são obrigatórios.");
        
        const existingCategory = await Category.findOne({
            where: {name}
        })
        if(existingCategory)
            throw new AppError("Esta categoria já está cadastrada.", 409);
        
        return await Category.create({name, slug, use_in_menu})
    }

    async updateCategory(id, { name, slug, use_in_menu }) {
        if(isNaN(parseInt(id)))
            throw new AppError("Você precisa passar um ID válido", 400)
        if(!(name + "") || !(slug + "") || !Bool.isBool(use_in_menu))
            throw new AppError("Todos os campos são necessários", 400);

        const category = await Category.findByPk(id);
        await category.update({
            name,
            slug,
            use_in_menu
        })
    }

    async deleteCategory(id) {
        const category = await Category.findByPk(id);

        if(category == null) 
            throw new AppError("Nenhuma categoria encontrada", 404);
        
        return await category.destroy();
    }
}

module.exports = new CategoryService();