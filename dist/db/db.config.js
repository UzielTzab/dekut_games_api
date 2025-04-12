"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dbConfig = {
    host: process.env.MYSQL_HOST || 'bmmarktsbxj2c7qhvyit-mysql.services.clever-cloud.com',
    user: process.env.MYSQL_USER || 'uxpmdf4sifxhjm8f',
    password: process.env.MYSQL_PASSWORD || 'VG8qdBqqBu8cs6PL8Ubc',
    database: process.env.MYSQL_DATABASE || 'bmmarktsbxj2c7qhvyit',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
// Crear el pool de conexiones
exports.pool = promise_1.default.createPool(dbConfig);
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.pool.getConnection();
        console.log("Conexión a MySQL establecida correctamente");
    }
    catch (error) {
        console.error("Error al conectar con MySQL:", error);
        throw error;
    }
});
exports.connectToDatabase = connectToDatabase;
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
