
const AppError = require("../config/AppError");
const User = require("../models/UserModel");


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

}

module.exports = new UserService();
