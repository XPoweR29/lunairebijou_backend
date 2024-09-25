import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Address } from "../types/address.type";
import { UserEntity } from "./user.entity";

@Entity()
export class AddressEntity extends BaseEntity implements Address {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	street: string;

	@Column()
	unitNumber: string;

	@Column()
	city: string;

	@Column()
	region: string;

	@Column()
	postalCode: string;

	@Column()
	country: string;

	@Column({ default: false })
	is_primary: boolean;

	@ManyToOne(() => UserEntity, (user) => user.addresses)
	@JoinColumn({ name: "user_id" })
	user: UserEntity;
}
