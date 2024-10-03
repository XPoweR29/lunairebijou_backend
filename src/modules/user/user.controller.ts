import { AddNewAddressDTO, NewUserDTO, UpdateAddressDTO } from "./user.dto";
import { validateDTO } from "../../utils/validateDTO";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { AuthRequest } from "../../types/auth.type";

export class UserController {
	private userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	async registerNewUser(req: Request, res: Response): Promise<void> {
		const validData = await validateDTO(NewUserDTO, req.body);
		const registeredUser = await this.userService.registerNewUser(validData);
		res.status(201).json(registeredUser);
	}

    async getUserAddresses(req: AuthRequest, res: Response): Promise<void> {
        const addresses = await this.userService.getUserAddresses(req.user);
        res.json(addresses);
    }

	//updateUserData

	//passwordUpadte

	//remindPWD

	async addNewAddress(req: AuthRequest, res: Response): Promise<void> {
        const validData = await validateDTO(AddNewAddressDTO, req.body);
		await this.userService.addNewAdress(req.user, validData);
        res.json({message: `New address added`});
	}

	async updateAddress(req: AuthRequest, res: Response): Promise<void> {
        const validData = await validateDTO(UpdateAddressDTO, req.body);
		await this.userService.updateAddress(req.user.id, req.params.addressId, validData);
        res.json({message: `Address updated successfully`});
	}

    async deleteAddress(req: AuthRequest, res: Response): Promise<void> {
        await this.userService.deleteAddress(req.user.id, req.params.addressId);
        res.json({message: `Address has been removed.`});
    }

	//deleteUser
}
