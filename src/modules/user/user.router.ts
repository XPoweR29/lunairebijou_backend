import { authGuard } from '../../middleware/authGuard.middleware';
import { UserController } from './user.controller';
import { Router } from "express";

export const userRouter = Router();
const userController = new UserController();

userRouter

.get('/addresses', authGuard, userController.getUserAddresses.bind(userController))
.post('/register', userController.registerNewUser.bind(userController))

.post('/address', authGuard, userController.addNewAddress.bind(userController))
.put('/address/:addressId', authGuard, userController.updateAddress.bind(userController))
.delete('/address/:addressId', authGuard, userController.deleteAddress.bind(userController))


