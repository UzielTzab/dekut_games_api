import { ConnectionPool } from "mssql";
import userRouter from "../routes/user.routes";

const dbConfig =
{
    user: "sa",
    password: "225699Uz",
    database: "dekut_games",
    server: "localhost",
    options:
    {
        encrypt: false,
        trustServerCertificate: true,
    }
}

export const pool = new ConnectionPool(dbConfig);

export const connectToDatabase = async () => {
    try {
        await pool.connect();
        console.log("Conexión a la base de datos establecida correctamente.");
    } catch (error) {
        console.error("Erro al conectar con la base de datos:", error);
        throw error;
    }
}