
const UserService = require("../services/UserService");

class UserController {

    async getUserById(req, res) {

        try {

            const { id } = req.params;

            const user = await UserService.getUserById(id);

            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado."
                });
            }

            return res.status(200).json(user);

        } catch (error) {

            console.error("Erro ao buscar usuário:", error);

            return res.status(500).json({
                message: "Erro interno do servidor."
            });

        }

    }

    async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body);

            return res.status(201).json(user);

        } catch (error) {

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            console.error(error);

            return res.status(500).json({
                message: "Erro interno do servidor."
            });
        }
    }



}

module.exports = new UserController();
