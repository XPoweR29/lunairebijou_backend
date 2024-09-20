import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { validateDTO } from "../../utils/validateDTO";
import { UserLoginDto } from "./auth.dto";
import { AuthRequest } from "../../types/auth.type";

export class AuthController {
    private readonly authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        const validaData = await validateDTO(UserLoginDto, req.body);
        const {userData, token} = await this.authService.loginUser(validaData);
        res.cookie('lunairebijou', token, {httpOnly: true}).json({userData, message: "Successfully logged in!"});
    }

    async logoutUser(req: AuthRequest, res: Response): Promise<void> {
        await this.authService.logoutUser(req.user);
        res.json({message: "Successfully logged out."});
    }
}
