import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";

@Entity()
export class ProductEntity extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column({type: "decimal", precision: 10, scale: 2})
	price: number;
    
	@Column({type: "text", nullable: true})
	description: string;
    
    @Column({type: "int"})
    qty: number;

	@ManyToOne(() => CategoryEntity, category => category.products, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'category_id'})
	category: CategoryEntity;
} 
