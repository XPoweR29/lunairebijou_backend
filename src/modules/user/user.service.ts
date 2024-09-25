import { AddressEntity } from './../../entities/address.entity';
import { UserEntity } from "../../entities/user.entity";
import { ValidationError } from "../../middleware/handleError";
import { HttpStatus } from "../../types/httpExeptions";
import { NewUserDTO } from "./user.dto";
import { hash } from "bcrypt";
import { promisify } from "util";
import { serverLog } from "../../utils/serverLog";
import { Address } from "../../types/address.type";
const hashPwd = promisify(hash);

export class UserService {
	private async checkIfUserExists(
		userData: Partial<NewUserDTO>
	): Promise<boolean> {
		const existingUser: UserEntity | null = await UserEntity.findOne({
			where: { email: userData.email },
		});
		return !!existingUser;
	}

	private async getUserEntity(id: string): Promise<UserEntity> {
		const entity = await UserEntity.findOne({ where: { id } });
		if (!entity)
			throw new ValidationError("Entity does not exist", HttpStatus.NOT_FOUND);
		return entity;
	}

	async registerNewUser(userData: NewUserDTO): Promise<Partial<UserEntity>> {
		const alreadyExists = await this.checkIfUserExists(userData);
		if (alreadyExists) {
			throw new ValidationError(
				"User with given email already exists",
				HttpStatus.CONFLICT
			);
		}

		const newUser = new UserEntity();
		Object.assign(newUser, userData);
		newUser.password = await hashPwd(userData.password, 10);

		await newUser.save();
		serverLog(`New user registered with ID ${newUser.id}`);
		return {
			id: newUser.id,
			email: newUser.email,
			registratoinDate: newUser.registratoinDate,
		};
	}

	async getUserByEmail(email: string): Promise<UserEntity> {
		const user = await UserEntity.findOne({ where: { email } });
		if (!user) {
			throw new ValidationError(
				`There is no user with email ${email}`,
				HttpStatus.NOT_FOUND
			);
		}

		return user;
	}

	async getUserAddresses(user: UserEntity): Promise<AddressEntity[]> {
		const found = await UserEntity.findOne({
			where: { id: user.id },
			relations: ["addresses"],
		});
		console.log(found);
		return [];
	}

	async getUserByTokenId(tokenId: string): Promise<UserEntity | null> {
		return await UserEntity.findOne({ where: { currentTokenId: tokenId } });
	}

	async saveTokenId(userId: string, tokenId: string): Promise<void> {
		const user = await this.getUserEntity(userId);
		user.currentTokenId = tokenId;
		await user.save();
	}

	//updateUserData

	//changePwd

	//remindPwd

    async addNewAdress(user: UserEntity, adressData: Partial<AddressEntity>): Promise<AddressEntity> {
        const newAddress = new AddressEntity();
        Object.assign(newAddress, adressData);
        newAddress.user = user;
        
        const currentPrimary = await AddressEntity.findOne({where: {user: {id: user.id}, is_primary: true}})
        if(!currentPrimary) newAddress.is_primary = true;

        await newAddress.save();
        return newAddress;

    };

    async updateAddress(userId: string, addressId: string, addressData: Partial<AddressEntity>): Promise<AddressEntity> {
        const currentPrimary = await AddressEntity.findOne({where: {user: {id: userId}, is_primary: true}})
        const updatedAdress = await AddressEntity.findOne({where: {user: {id: userId}, id: addressId}});
        
        if(!updatedAdress) throw new ValidationError("Given adress does not exist", HttpStatus.NOT_FOUND);
        Object.assign(updatedAdress, addressData);

        if(addressData.is_primary === true && currentPrimary && addressId !== currentPrimary.id) {
            currentPrimary.is_primary = false;
            await currentPrimary.save();
            updatedAdress.is_primary = true;
        };

        await updatedAdress.save();
        return updatedAdress;
    };

    async deleteAddress(userId: string, addressId: string): Promise<void> {
        const foundAddress = await AddressEntity.findOne({where: {user: {id: userId}, id: addressId}});
        if(!foundAddress) throw new ValidationError("Given address does not exist", HttpStatus.NOT_FOUND);
        await foundAddress.remove();
    } 

	//deleteUser
}
