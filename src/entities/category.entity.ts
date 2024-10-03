import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity()
export class CategoryEntity extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;
    
    @OneToMany(() => ProductEntity, product => product.category, { cascade: true })
    products: ProductEntity[];
    
    @ManyToOne(() => CategoryEntity, category => category.children, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'parent_category_id'})
    parentCategory: CategoryEntity;

    @OneToMany(() => CategoryEntity, category => category.parentCategory, {cascade: true, onDelete: 'CASCADE'})
    children: CategoryEntity[];
}
