import { UserEntity } from "../../entities/user.entity";
import { ValidationError } from "../../middleware/handleError";
import { HttpStatus } from "../../types/httpExeptions";
import { NewUserDTO } from "./user.dto";
import { hash } from "bcrypt";
import { promisify } from "util";
import { serverLog } from "../../utils/serverLog";
const hashPwd = promisify(hash);

export class UserService {

    private async checkIfUserExists(userData: Partial<NewUserDTO>): Promise<boolean> {
        const existingUser: UserEntity | null = await UserEntity.findOne({where: {email: userData.email}});
        return !! existingUser;
    }

    private async getUserEntity(id: string): Promise<UserEntity> {
        const entity = await UserEntity.findOne({where: {id}});
        if(!entity) throw new ValidationError("Entity does not exist", HttpStatus.NOT_FOUND);
        return entity;
    }

    async registerNewUser (userData: NewUserDTO): Promise<UserEntity> {
        const alreadyExists = await this.checkIfUserExists(userData);
        if(alreadyExists) {
            throw new ValidationError("User with given email already exists", HttpStatus.CONFLICT);
        };
        
        const newUser = new UserEntity();
        Object.assign(newUser, userData);
        newUser.password = await hashPwd(userData.password, 10);

        await newUser.save();
        serverLog(`New user registered with ID ${newUser.id}`);
        return newUser; //only filtered data!
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        const user = await UserEntity.findOne({where: {email}});
        if(!user) {
            throw new ValidationError(`There is no user with email ${email}`, HttpStatus.NOT_FOUND);
        };

        return user;
    }

    async getUserByTokenId(tokenId: string): Promise<UserEntity|null> {
        return await UserEntity.findOne({where: {currentTokenId: tokenId}});
    }

    async saveTokenId(userId: string, tokenId: string): Promise<void> {
        const user = await this.getUserEntity(userId);
        user.currentTokenId = tokenId;
        await user.save();
    }
}