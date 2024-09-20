import { IsEmail, IsNotEmpty } from "class-validator";

export class UserLoginDto {
    @IsEmail({}, {message: "Invalid email format"})
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}