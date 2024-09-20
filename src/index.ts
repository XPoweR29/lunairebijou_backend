import express from "express";
import "express-async-errors"
import helmet from "helmet";
import { initialLog } from "./utils/serverLog";
import * as dotenv from "dotenv";
import { handleError } from "./middleware/handleError";
import { databaseInit } from "./middleware/databaseInit.middleware";
import { userRouter } from "./modules/user/user.router";
import { initializeDatabase } from "./db/data-source";
import { authRouter } from "./modules/auth/auth.router";
import cookieParser from "cookie-parser";
dotenv.config();

export const PORT = Number(process.env.PORT) || 3000;

initializeDatabase(); //Use middleware instead of this on vercel cold start!
export const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
// app.use(databaseInit); 

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.use(handleError);
app.listen(PORT, 'localhost', initialLog);