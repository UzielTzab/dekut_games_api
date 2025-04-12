
import mysql from 'mysql2/promise';
const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
};

// Crear el pool de conexiones
export const pool = mysql.createPool(dbConfig);

export const connectToDatabase = async () => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.ping();
        console.log("Conexión a MySQL establecida correctamente");
    } catch (error) {
        console.error("Error al conectar con MySQL:", error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

// CONEXIÓN A LA BASE DE DATOS CON SQL SERVER

// import { ConnectionPool } from "mssql";
// import userRouter from "../routes/user.routes";

// const dbConfig =
// {
//     user: "sa",
//     password: "225699Uz",
//     database: "dekut_games",
//     server: "localhost",
//     options:
//     {
//         encrypt: false,
//         trustServerCertificate: true,
//     }
// }

// export const pool = new ConnectionPool(dbConfig);

// export const connectToDatabase = async () => {
//     try {
//         await pool.connect();
//         console.log("Conexión a la base de datos establecida correctamente.");
//     } catch (error) {
//         console.error("Erro al conectar con la base de datos:", error);
//         throw error;
//     }
// }