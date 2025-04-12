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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.pool = void 0;
const mssql_1 = require("mssql");
const dbConfig = {
    user: "sa",
    password: "225699Uz",
    database: "dekut_games",
    server: "localhost",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};
exports.pool = new mssql_1.ConnectionPool(dbConfig);
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.pool.connect();
        console.log("Conexión a la base de datos establecida correctamente.");
    }
    catch (error) {
        console.error("Erro al conectar con la base de datos:", error);
        throw error;
    }
});
exports.connectToDatabase = connectToDatabase;
