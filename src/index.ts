import express from "express";
import helmet from "helmet";
import { initialLog } from "./utils/serverLog";
import * as dotenv from "dotenv";
import { handleError } from "./middleware/handleError";
import { greetingRouter } from "./modules/greeting/greeting.router";
dotenv.config();

export const PORT = Number(process.env.PORT) || 3000;

export const app = express();

app.use(express.json());
app.use(helmet());

app.use('/', greetingRouter);

app.use(handleError);
app.listen(PORT, 'localhost', initialLog);
