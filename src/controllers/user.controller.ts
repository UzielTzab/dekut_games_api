import { name } from './../../node_modules/@azure/msal-node/src/packageMetadata';
import { Request, Response } from "express";
import { pool } from "../db/db.config";
import User from "../models/user.model";
import { CreateUserDto } from '../dto/create_user.dto';
import { AuthDto } from '../dto/auth.dto';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await pool.request().query("SELECT * FROM USERS");
        const users: User[] = result.recordset;

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}

export const authenticateUser = async (req: Request, res: Response) => {
    try {
        const { email_user, password_user }: AuthDto = req.body;

        const result = await pool.request()
            .input("email_user", email_user)
            .input("password_user", password_user)
            .query("SELECT * FROM USERS WHERE email_user = @email_user AND password_user = @password_user");

        const userLoged: User | null = result.recordset.length > 0 ? result.recordset[0] : null;
        if (!userLoged) {
            res.status(401).json({ message: "Usuario o contraseña incorrectos" });
            throw new Error("Usuario o contraseña incorrectos");
        }

        res.status(200).json({
            message: "Usuario autenticado correctamente",
            userData: userLoged
        });

    } catch (error) {
        console.error("Error al autenticar el usuario:", error);
        res.status(500).json({ meessage: "No se pudo autenticar al usuario por un error interno del servidor" });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name_user, email_user, password_user }: CreateUserDto = req.body;

        if (!name_user || !email_user || !password_user) {
            res.status(400).json({ message: "Los datos están incompletods " });
        }

        await pool.request()
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
        console.log("Usuario creado correctamente")
    } catch (error) {
        console.error("Error al crear usuario:", error);
    }
}

