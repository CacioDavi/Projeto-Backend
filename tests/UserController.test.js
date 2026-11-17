
const UserController = require("../src/controllers/UserController");
const UserService = require("../src/services/UserService");
const AppError = require("../src/config/AppError");

afterEach(() => {
    jest.restoreAllMocks();
});

describe("UserController", () => {

    // GET USER
    describe("getUserById", () => {

        it("Deve retornar um usuário com status 200", async () => {
            const mockUser = {
                id: 1,
                firstname: "João",
                surname: "Silva",
                email: "joao@email.com"
            };

            jest.spyOn(UserService, "getUserById")
                .mockResolvedValue(mockUser);

            const req = {
                params: { id: "1" }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.getUserById(req, res);

            expect(UserService.getUserById).toHaveBeenCalledWith("1");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it("Deve retornar 404 quando o usuário não existir", async () => {
            jest.spyOn(UserService, "getUserById")
                .mockResolvedValue(null);

            const req = {
                params: { id: "999" }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.getUserById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Usuário não encontrado."
            });
        });

        it("Deve retornar 500 quando ocorrer um erro inesperado", async () => {
            jest.spyOn(UserService, "getUserById")
                .mockRejectedValue(new Error("Erro no banco"));

            jest.spyOn(console, "error").mockImplementation(() => {});

            const req = {
                params: { id: "1" }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.getUserById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Erro interno do servidor."
            });
        });

    });

    // CREATE USER
    describe("createUser", () => {

        it("Deve cadastrar um usuário com status 201", async () => {
            jest.spyOn(UserService, "createUser")
                .mockResolvedValue({
                    message: "Usuário criado com sucesso!"
                });

            const req = {
                body: {
                    firstname: "João",
                    surname: "Silva",
                    email: "joao@email.com",
                    password: "123456",
                    confirmPassword: "123456"
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                json: jest.fn()
            };

            await UserController.createUser(req, res);

            expect(UserService.createUser).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith();
        });

        it("Deve retornar erro de validação", async () => {
            const error = new AppError("Todos os campos são obrigatórios.");

            jest.spyOn(UserService, "createUser")
                .mockRejectedValue(error);

            const req = {
                body: {}
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                send: jest.fn()
            };

            await UserController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(error.statusCode);
            expect(res.json).toHaveBeenCalledWith({
                message: error.message
            });
        });

        it("Deve retornar 409 quando o e-mail já estiver cadastrado", async () => {
            const error = new AppError(
                "Este e-mail já está cadastrado.",
                409
            );

            jest.spyOn(UserService, "createUser")
                .mockRejectedValue(error);

            const req = {
                body: {}
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({
                message: error.message
            });
        });

        it("Deve retornar 500 quando ocorrer um erro inesperado", async () => {
            jest.spyOn(UserService, "createUser")
                .mockRejectedValue(new Error("Erro no banco"));

            jest.spyOn(console, "error").mockImplementation(() => {});

            const req = { body: {} };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Erro interno do servidor."
            });
        });

    });

    // UPDATE USER
    describe("updateUser", () => {

        const updateData = {
            firstname: "Carlos",
            surname: "Souza",
            email: "carlos@email.com"
        };

        it("Deve atualizar um usuário com status 204", async () => {
            jest.spyOn(UserService, "updateUser")
                .mockResolvedValue();

            const req = {
                params: { id: "1" },
                body: updateData
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                json: jest.fn()
            };

            await UserController.updateUser(req, res);

            expect(UserService.updateUser).toHaveBeenCalledWith(
                "1",
                updateData
            );

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalledWith();
        });

        it("Deve retornar 404 quando o usuário não existir", async () => {
            const error = new AppError("Usuário não encontrado.", 404);

            jest.spyOn(UserService, "updateUser")
                .mockRejectedValue(error);

            const req = {
                params: { id: "999" },
                body: updateData
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: error.message
            });
        });

        it("Deve retornar erro quando os dados forem inválidos", async () => {
            const error = new AppError("Todos os campos são obrigatórios.");

            jest.spyOn(UserService, "updateUser")
                .mockRejectedValue(error);

            const req = {
                params: { id: "1" },
                body: {}
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(error.statusCode);
            expect(res.json).toHaveBeenCalledWith({
                message: error.message
            });
        });

        it("Deve retornar 500 quando ocorrer um erro inesperado", async () => {
            jest.spyOn(UserService, "updateUser")
                .mockRejectedValue(new Error("Erro no banco"));

            jest.spyOn(console, "error").mockImplementation(() => {});

            const req = {
                params: { id: "1" },
                body: updateData
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
        });

    });

    // DELETE USER
    describe("deleteUser", () => {

        it("Deve excluir um usuário com status 204", async () => {
            jest.spyOn(UserService, "deleteUser")
                .mockResolvedValue();

            const req = {
                params: { id: "1" }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                json: jest.fn()
            };

            await UserController.deleteUser(req, res);

            expect(UserService.deleteUser).toHaveBeenCalledWith("1");
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalledWith();
        });

        it("Deve retornar 404 quando o usuário não existir", async () => {
            const error = new AppError("Usuário não encontrado.", 404);

            jest.spyOn(UserService, "deleteUser")
                .mockRejectedValue(error);

            const req = {
                params: { id: "999" }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: error.message
            });
        });

        it("Deve retornar 500 quando ocorrer um erro inesperado", async () => {
            jest.spyOn(UserService, "deleteUser")
                .mockRejectedValue(new Error("Erro no banco"));

            jest.spyOn(console, "error").mockImplementation(() => {});

            const req = {
                params: { id: "1" }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await UserController.deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
        });

    });

});
