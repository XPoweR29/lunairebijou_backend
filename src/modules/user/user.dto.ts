import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { User } from "../../types/user.types";

export class NewUserDTO implements Partial<User> {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	surname: string;

	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsNotEmpty()
	phoneNumber: string;
}