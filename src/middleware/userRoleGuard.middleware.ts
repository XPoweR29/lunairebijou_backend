import { NextFunction, Response } from "express";
import { AuthRequest, UserRole } from "../types/auth.type";
import { ValidationError } from "./handleError";
import { HttpStatus } from "../types/httpExeptions";

export function userRoleGuard(allowedRoles: UserRole[]) {
    return function(req: AuthRequest, res: Response, next: NextFunction) {
        if(!req.user || !allowedRoles.includes(req.user.userRole)) {
            throw new ValidationError('Access denied. Insufficient permissions.', HttpStatus.FORBIDDEN);
        };
        next();
    }
}