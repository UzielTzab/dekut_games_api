import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/user.routes';
import { connectToDatabase } from './db/db.config';

const app = express();

const PORT = process.env.PORT || 3004;

connectToDatabase();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/dekut_games", userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
