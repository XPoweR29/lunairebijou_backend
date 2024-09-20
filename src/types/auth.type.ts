import { Request } from "express";
import { UserEntity } from "../entities/user.entity";

export interface AuthRequest extends Request {
    user: UserEntity;
}