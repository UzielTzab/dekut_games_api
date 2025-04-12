"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get("/users", user_controller_1.getAllUsers);
userRouter.post("/users", user_controller_1.createUser);
userRouter.post("/users/login", user_controller_1.authenticateUser);
exports.default = userRouter;
