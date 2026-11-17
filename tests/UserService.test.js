
const User = require("../src/models/UserModel");
const UserService = require("../src/services/UserService");
const bcrypt = require("bcrypt");

afterEach(() => {
    jest.restoreAllMocks();
});

describe("UserService", () => {

    // GET USER
    describe("getUserById", () => {

        it("Deve retornar um usuário existente", async () => {
            const mockUser = {
                id: 1,
                firstname: "João",
                surname: "Silva",
                email: "joao@email.com"
            };

            const findByPkSpy = jest.spyOn(User, "findByPk")
                .mockResolvedValue(mockUser);

            const result = await UserService.getUserById(1);

            expect(findByPkSpy).toHaveBeenCalledWith(1, {
                attributes: ["id", "firstname", "surname", "email"]
            });

            expect(result).toEqual(mockUser);
        });

        it("Deve retornar null quando o usuário não existir", async () => {
            const findByPkSpy = jest.spyOn(User, "findByPk")
                .mockResolvedValue(null);

            const result = await UserService.getUserById(999);

            expect(findByPkSpy).toHaveBeenCalledWith(999, {
                attributes: ["id", "firstname", "surname", "email"]
            });

            expect(result).toBeNull();
        });

    });

    // CREATE USER
    describe("createUser", () => {

        const userData = {
            firstname: "João",
            surname: "Silva",
            email: "joao@email.com",
            password: "123456",
            confirmPassword: "123456"
        };

        it("Deve cadastrar um usuário com sucesso", async () => {

            const findOneSpy = jest.spyOn(User, "findOne")
                .mockResolvedValue(null);

            const hashSpy = jest.spyOn(bcrypt, "hash")
                .mockResolvedValue("senha_hash");

            const createSpy = jest.spyOn(User, "create")
                .mockResolvedValue({
                    id: 1,
                    ...userData,
                    password: "senha_hash"
                });

            const result = await UserService.createUser(userData);

            expect(findOneSpy).toHaveBeenCalledWith({
                where: { email: userData.email }
            });

            expect(hashSpy).toHaveBeenCalledWith(
                userData.password,
                12
            );

            expect(createSpy).toHaveBeenCalledWith({
                firstname: userData.firstname,
                surname: userData.surname,
                email: userData.email,
                password: "senha_hash"
            });

            expect(result).toEqual({
                message: "Usuário criado com sucesso!"
            });
        });

        it("Deve rejeitar cadastro com campos obrigatórios ausentes", async () => {

            const createSpy = jest.spyOn(User, "create");

            await expect(
                UserService.createUser({
                    firstname: "João"
                })
            ).rejects.toMatchObject({
                message: "Todos os campos são obrigatórios."
            });

            expect(createSpy).not.toHaveBeenCalled();
        });

        it("Deve rejeitar cadastro quando as senhas não coincidirem", async () => {

            const createSpy = jest.spyOn(User, "create");

            await expect(
                UserService.createUser({
                    ...userData,
                    confirmPassword: "654321"
                })
            ).rejects.toMatchObject({
                message: "As senhas não coincidem."
            });

            expect(createSpy).not.toHaveBeenCalled();
        });

        it("Deve rejeitar cadastro com e-mail já existente", async () => {

            const findOneSpy = jest.spyOn(User, "findOne")
                .mockResolvedValue({
                    id: 1,
                    email: userData.email
                });

            const createSpy = jest.spyOn(User, "create");

            const hashSpy = jest.spyOn(bcrypt, "hash");

            await expect(
                UserService.createUser(userData)
            ).rejects.toMatchObject({
                message: "Este e-mail já está cadastrado.",
                statusCode: 409
            });

            expect(findOneSpy).toHaveBeenCalledWith({
                where: { email: userData.email }
            });

            expect(createSpy).not.toHaveBeenCalled();
            expect(hashSpy).not.toHaveBeenCalled();
        });

    });

    // UPDATE USER
    describe("updateUser", () => {

        const updateData = {
            firstname: "Carlos",
            surname: "Souza",
            email: "carlos@email.com"
        };

        it("Deve atualizar um usuário com sucesso", async () => {

            const mockUser = {
                id: 1,
                update: jest.fn().mockResolvedValue(true)
            };

            const findByPkSpy = jest.spyOn(User, "findByPk")
                .mockResolvedValue(mockUser);

            const findOneSpy = jest.spyOn(User, "findOne")
                .mockResolvedValue(null);

            await UserService.updateUser(1, updateData);

            expect(findByPkSpy).toHaveBeenCalledWith(1);

            expect(findOneSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({
                        email: updateData.email
                    })
                })
            );

            expect(mockUser.update).toHaveBeenCalledWith(updateData);
        });

        it("Deve rejeitar atualização com campos obrigatórios ausentes", async () => {

            const findByPkSpy = jest.spyOn(User, "findByPk");

            await expect(
                UserService.updateUser(1, {
                    firstname: "Carlos"
                })
            ).rejects.toMatchObject({
                message: "Todos os campos são obrigatórios."
            });

            expect(findByPkSpy).not.toHaveBeenCalled();
        });

        it("Deve rejeitar atualização de usuário inexistente", async () => {

            const findByPkSpy = jest.spyOn(User, "findByPk")
                .mockResolvedValue(null);

            const findOneSpy = jest.spyOn(User, "findOne");

            await expect(
                UserService.updateUser(999, updateData)
            ).rejects.toMatchObject({
                message: "Usuário não encontrado.",
                statusCode: 404
            });

            expect(findByPkSpy).toHaveBeenCalledWith(999);
            expect(findOneSpy).not.toHaveBeenCalled();
        });

        it("Deve rejeitar atualização quando o e-mail já pertence a outro usuário", async () => {

            const mockUser = {
                id: 1,
                update: jest.fn()
            };

            const findByPkSpy = jest.spyOn(User, "findByPk")
                .mockResolvedValue(mockUser);

            const findOneSpy = jest.spyOn(User, "findOne")
                .mockResolvedValue({
                    id: 2,
                    email: updateData.email
                });

            await expect(
                UserService.updateUser(1, updateData)
            ).rejects.toMatchObject({
                message: "Este e-mail é inválido para uso no sistema."
            });

            expect(findByPkSpy).toHaveBeenCalledWith(1);
            expect(findOneSpy).toHaveBeenCalled();

            expect(mockUser.update).not.toHaveBeenCalled();
        });

    });

    // DELETE USER
    describe("deleteUser", () => {

        it("Deve excluir um usuário com sucesso", async () => {

            const mockUser = {
                id: 1,
                destroy: jest.fn().mockResolvedValue(true)
            };

            const findByPkSpy = jest.spyOn(User, "findByPk")
                .mockResolvedValue(mockUser);

            await UserService.deleteUser(1);

            expect(findByPkSpy).toHaveBeenCalledWith(1);
            expect(mockUser.destroy).toHaveBeenCalled();
        });

        it("Deve rejeitar exclusão de usuário inexistente", async () => {

            const findByPkSpy = jest.spyOn(User, "findByPk")
                .mockResolvedValue(null);

            await expect(
                UserService.deleteUser(999)
            ).rejects.toMatchObject({
                message: "Usuário não encontrado.",
                statusCode: 404
            });

            expect(findByPkSpy).toHaveBeenCalledWith(999);
        });

    });

});
