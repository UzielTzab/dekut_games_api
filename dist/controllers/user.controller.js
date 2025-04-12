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
exports.createUser = exports.authenticateUser = exports.getAllUsers = void 0;
const db_config_1 = require("../db/db.config");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield db_config_1.pool.getConnection();
        const [rows] = yield connection.query("SELECT * FROM USERS");
        const users = rows;
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.getAllUsers = getAllUsers;
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield db_config_1.pool.getConnection();
        const { email_user, password_user } = req.body;
        const [rows] = yield connection.query("SELECT * FROM USERS WHERE email_user = ? AND password_user = ?", [email_user, password_user]);
        const userResults = rows;
        const userLoged = userResults.length > 0 ? userResults[0] : null;
        if (!userLoged) {
            res.status(401).json({ message: "Usuario o contraseña incorrectos" });
            return;
        }
        res.status(200).json({
            message: "Usuario autenticado correctamente",
            userData: userLoged
        });
    }
    catch (error) {
        console.error("Error al autenticar el usuario:", error);
        res.status(500).json({ message: "No se pudo autenticar al usuario por un error interno del servidor" });
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.authenticateUser = authenticateUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield db_config_1.pool.getConnection();
        const { name_user, email_user, password_user } = req.body;
        if (!name_user || !email_user || !password_user) {
            res.status(400).json({ message: "Los datos están incompletos" });
            return;
        }
        yield connection.query("INSERT INTO USERS (name_user, email_user, password_user) VALUES (?, ?, ?)", [name_user, email_user, password_user]);
        res.status(201).json({
            message: "Usuario creado correctamente",
            userData: {
                name_user,
                email_user,
                password_user
            }
        });
        console.log("Usuario creado correctamente");
    }
    catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error al crear el usuario" });
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.createUser = createUser;
