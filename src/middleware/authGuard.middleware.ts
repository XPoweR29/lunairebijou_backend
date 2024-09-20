import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/auth.type";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { promisify } from "util";
import { HttpStatus } from "../types/httpExeptions";
import { ValidationError } from "./handleError";
import { UserService } from "../modules/user/user.service";

dotenv.config();
const verifyToken = promisify(jwt.verify).bind(jwt);

export const authGuard = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.lunairebijou;
    if(!token) {
        throw new ValidationError(`No authentication token provided`, HttpStatus.UNAUTHORIZED);
    };

    try {
        const payloadData = await verifyToken(token, process.env.SECRET_TOKEN_KEY);
        const user = await (new UserService).getUserByTokenId(payloadData.tokenId);
        if(!user) throw new ValidationError("User not fround or token expired", HttpStatus.NOT_FOUND);
        req.user = user;
        next();
    } catch (err) {
        next(new ValidationError("Authentication failed", HttpStatus.UNAUTHORIZED));
    }
}