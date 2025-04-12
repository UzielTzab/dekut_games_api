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
    try {
        const result = yield db_config_1.pool.request().query("SELECT * FROM USERS");
        const users = result.recordset;
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllUsers = getAllUsers;
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email_user, password_user } = req.body;
        const result = yield db_config_1.pool.request()
            .input("email_user", email_user)
            .input("password_user", password_user)
            .query("SELECT * FROM USERS WHERE email_user = @email_user AND password_user = @password_user");
        const userLoged = result.recordset.length > 0 ? result.recordset[0] : null;
        if (!userLoged) {
            res.status(401).json({ message: "Usuario o contraseña incorrectos" });
            throw new Error("Usuario o contraseña incorrectos");
        }
        res.status(200).json({
            message: "Usuario autenticado correctamente",
            userData: userLoged
        });
    }
    catch (error) {
        console.error("Error al autenticar el usuario:", error);
        res.status(500).json({ meessage: "No se pudo autenticar al usuario por un error interno del servidor" });
    }
});
exports.authenticateUser = authenticateUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name_user, email_user, password_user } = req.body;
        if (!name_user || !email_user || !password_user) {
            res.status(400).json({ message: "Los datos están incompletods " });
        }
        yield db_config_1.pool.request()
            .input("name_user", name_user)
            .input("email_user", email_user)
            .input("password_user", password_user)
            .query("INSERT INTO USERS (name_user, email_user, password_user) VALUES (@name_user, @email_user, @password_user)");
        res.status(201).json({
            message: "Usuario creado correctamente", userData: {
                name_user,
                email_user,
                password_user
            }
        });
        console.log("Usuario creado correctamente");
    }
    catch (error) {
        console.error("Error al crear usuario:", error);
    }
});
exports.createUser = createUser;
