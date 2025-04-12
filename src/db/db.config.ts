
import mysql from 'mysql2/promise';
const dbConfig = {
    host: process.env.MYSQL_HOST || 'bmmarktsbxj2c7qhvyit-mysql.services.clever-cloud.com',
    user: process.env.MYSQL_USER || 'uxpmdf4sifxhjm8f',
    password: process.env.MYSQL_PASSWORD || 'VG8qdBqqBu8cs6PL8Ubc',
    database: process.env.MYSQL_DATABASE || 'bmmarktsbxj2c7qhvyit',
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