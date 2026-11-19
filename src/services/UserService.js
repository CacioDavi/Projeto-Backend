
const AppError = require("../config/AppError");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

class UserService {

    async getUserById(id) {

        const user = await User.findByPk(id, {
            attributes: [
                "id",
                "firstname",
                "surname",
                "email"
            ]
        });

        return user;
    }

    async createUser(data) {

        const { firstname, surname, email, password, confirmPassword } = data;

        if (!firstname || !surname || !email || !password || !confirmPassword) {
            throw new AppError("Todos os campos são obrigatórios.");
        }

        if (password !== confirmPassword) {
            throw new AppError("As senhas não coincidem.");
        }

        // Verifica se o e-mail já está cadastrado
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            throw new AppError("Este e-mail já está cadastrado.", 409);
        }

        // Gera o hash da senha
        const passwordHash = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstname,
            surname,
            email,
            password: passwordHash
        });

        
        return {message: "Usuário criado com sucesso!"};
    }

    async updateUser(id, data) {
        const { firstname, surname, email } = data;

        if (!firstname || !surname || !email) {
            throw new AppError("Todos os campos são obrigatórios.");
        }

        // Verifica se o usuário existe
        const user = await User.findByPk(id);

        if (!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        // Verifica se o e-mail já está sendo utilizado por outro usuário
        const emailAlreadyExists = await User.findOne({
            where: {
                email,
                id: { [require("sequelize").Op.ne]: id }
            }
        });

        if (emailAlreadyExists) {
            throw new AppError("Este e-mail é inválido para uso no sistema.");
        }

        
        await user.update({
            firstname,
            surname,
            email
        });
    }

    async deleteUser(id) {
        const user = await User.findByPk(id);

        if (!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        await user.destroy();
    }

}

module.exports = new UserService();
