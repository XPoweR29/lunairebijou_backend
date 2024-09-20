import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../types/user.types";

@Entity()
export class UserEntity extends BaseEntity implements User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({length: 50})
	name: string;

	@Column({length: 50})
	surname: string;

	@Column({unique: true})
	email: string;

	@Column({length: 20})
	phoneNumber: string;

	@Column()
	password: string;

    @CreateDateColumn({type: "timestamp"})
    registratoinDate: Date;

	@Column({nullable: true, default: null, length: 36})
	currentTokenId: string;
}