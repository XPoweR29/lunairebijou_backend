import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../types/user.types";
import { AddressEntity } from "./address.entity";
import { UserRole } from "../types/auth.type";

@Entity()
export class UserEntity extends BaseEntity implements User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({type: 'enum', enum: UserRole, default: UserRole.USER})
	userRole: UserRole

	@Column({ length: 50 })
	name: string;

	@Column({ length: 50 })
	surname: string;

	@Column({ unique: true })
	email: string;

	@Column({ length: 20 })
	phoneNumber: string;

	@Column()
	password: string;

	@CreateDateColumn({ type: "timestamp" })
	registratoinDate: Date;

	@Column({ nullable: true, default: null, length: 36 })
	currentTokenId: string;

	@OneToMany(() => AddressEntity, (addresses) => addresses.user, {
		cascade: true,
	})
	addresses: AddressEntity[];
}
