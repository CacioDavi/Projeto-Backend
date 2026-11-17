
require("dotenv").config();

const app = require("./app.js");
const db = require("./config/SyncDB.js");

const port = process.env.PORT || 3000;

async function startServer() {
    try {
        await db.syncDB();

        app.listen(port, () => {
            console.log(`Servidor rodando na porta: ${port}`);
        });

    } catch (error) {
        console.error("Erro ao inicializar a aplicação:", error);
        process.exit(1);
    }
}

startServer();
