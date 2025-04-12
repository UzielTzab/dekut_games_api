import { Router } from "express";
import { authenticateUser, createUser, getAllUsers } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.post("/users", createUser);
userRouter.post("/users/login", authenticateUser);

export default userRouter;