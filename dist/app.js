"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const db_config_1 = require("./db/db.config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3004;
(0, db_config_1.connectToDatabase)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/dekut_games", user_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
