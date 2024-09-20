import { NewUserDTO } from './user.dto';
import { validateDTO } from "../../utils/validateDTO";
import { UserService } from "./user.service";
import { Request, Response } from 'express';
import { AuthRequest } from '../../types/auth.type';
import { UserEntity } from '../../entities/user.entity';

export class UserController {
    private userService: UserService

    constructor() {this.userService = new UserService();}

    async registerNewUser(req: Request, res: Response): Promise<void> {
            const validData = await validateDTO(NewUserDTO, req.body);
            const registeredUser = await this.userService.registerNewUser(validData);
            res.status(201).json(registeredUser);
    }

    async getUserByEmail(req: AuthRequest, res: Response): Promise<UserEntity> {
        return this.userService.getUserByEmail(req.user.email);
    }
}