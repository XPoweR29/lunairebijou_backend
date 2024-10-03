import { Request } from "express";
import { UserEntity } from "../entities/user.entity";

export interface AuthRequest extends Request {
    user: UserEntity;
}

export enum UserRole {
    USER = "user",
    ADMIN = "admin",
}