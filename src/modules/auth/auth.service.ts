import { compare } from "bcrypt";
import { UserEntity } from "../../entities/user.entity";
import { UserService } from "../user/user.service";
import { HttpStatus } from "../../types/httpExeptions";
import { ValidationError } from "../../middleware/handleError";
import { User } from "../../types/user.types";
import { JWTPayload } from "../../types/jwt.type";
import {v4 as uuid} from "uuid";
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv";
import { serverLog } from "../../utils/serverLog";
dotenv.config();

export class AuthService {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    };

    private async loginValidation(email: string, password: string): Promise<UserEntity> {
        const user = await this.userService.getUserByEmail(email);

        if(!(await compare(password, user.password))) {
            throw new ValidationError("Invalid password", HttpStatus.UNAUTHORIZED);
        };

        return user;
    }

    private async generateTokenId(): Promise<string> {
        let tokenId: string;
        let userWithTokenId: UserEntity|null = null;

        do {
            tokenId = uuid();
            userWithTokenId = await this.userService.getUserByTokenId(tokenId);
        }

        while(!!userWithTokenId) {
            return tokenId;
        }
    }

    async loginUser(userData: Partial<User>): Promise<{token: string, userData: Partial<UserEntity>}> {
        const {email, password} = userData;
        const authorizedUser = await this.loginValidation(email, password);

        const payload: JWTPayload = {tokenId: await this.generateTokenId()};
        const token = jwt.sign(payload, process.env.SECRET_TOKEN_KEY, {expiresIn: 60*60*24});

        await this.userService.saveTokenId(authorizedUser.id, payload.tokenId);
        serverLog(`User ${authorizedUser.email} has logged in.`);
        return {token, userData: {id: authorizedUser.id, email: authorizedUser.email}}
    }

    async logoutUser(user: UserEntity): Promise<void> {
        user.currentTokenId = null;
        await user.save();
        serverLog(`User ${user.email} has been logged out.`); 
    }

}