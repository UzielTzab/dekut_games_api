import { Request, Response } from "express";
import { pool } from "../db/db.config";
import User from "../models/user.model";
import { CreateUserDto } from '../dto/create_user.dto';
import { AuthDto } from '../dto/auth.dto';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query("SELECT * FROM USERS");
        const users: User[] = rows as User[];

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const authenticateUser = async (req: Request, res: Response) => {
    try {
        const { email_user, password_user }: AuthDto = req.body;

        const [rows] = await pool.query(
            "SELECT * FROM USERS WHERE email_user = ? AND password_user = ?",
            [email_user, password_user]
        );

        const userResults = rows as User[];
        const userLoged: User | null = userResults.length > 0 ? userResults[0] : null;

        if (!userLoged) {
            res.status(401).json({ message: "Usuario o contraseña incorrectos" });
            return;
        }

        res.status(200).json({
            message: "Usuario autenticado correctamente",
            userData: userLoged
        });

    } catch (error) {
        console.error("Error al autenticar el usuario:", error);
        res.status(500).json({ message: "No se pudo autenticar al usuario por un error interno del servidor" });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name_user, email_user, password_user }: CreateUserDto = req.body;

        if (!name_user || !email_user || !password_user) {
            res.status(400).json({ message: "Los datos están incompletos" });
            return;
        }

        await pool.query(
            "INSERT INTO USERS (name_user, email_user, password_user) VALUES (?, ?, ?)",
            [name_user, email_user, password_user]
        );

        res.status(201).json({
            message: "Usuario creado correctamente",
            userData: {
                name_user,
                email_user,
                password_user
            }
        });
        console.log("Usuario creado correctamente");
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error al crear el usuario" });
    }
}