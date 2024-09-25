import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { User } from "../../types/user.types";
import { Address } from "../../types/address.type";

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

export class AddNewAddressDTO implements Partial<Address> {
	@IsString()
	street: string;

	@IsOptional()
	@IsString()
	unitNumber?: string;

	@IsString()
	city: string;

	@IsString()
	region: string;

	@IsString()
	postalCode: string;

	@IsString()
	country: string;
}

export class UpdateAddressDTO implements Partial<Address> {
	@IsString()
	street: string;

	@IsOptional()
	@IsString()
	unitNumber?: string;

	@IsString()
	city: string;

	@IsString()
	region: string;

	@IsString()
	postalCode: string;

	@IsString()
	country: string;

	@IsBoolean()
	@IsOptional()
	is_primary: boolean;

}
