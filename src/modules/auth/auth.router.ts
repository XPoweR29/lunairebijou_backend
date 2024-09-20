import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authGuard } from "../../middleware/authGuard.middleware";

export const authRouter = Router();
const authController = new AuthController();

authRouter

.post('/login', authController.loginUser.bind(authController))
.post('/logout', authGuard, authController.logoutUser.bind(authController))