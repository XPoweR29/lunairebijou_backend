import { authGuard } from '../../middleware/authGuard.middleware';
import { UserController } from './user.controller';
import { Router } from "express";

export const userRouter = Router();
const userController = new UserController();

userRouter

.post('/register', userController.registerNewUser.bind(userController))
.get('/', authGuard, userController.getUserByEmail.bind(userController))

