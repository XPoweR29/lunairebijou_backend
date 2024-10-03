import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ProductEntity } from "../../entities/product.entity";
import { CategoryEntity } from "../../entities/category.entity";

export class AddNewProductDTO implements Partial<ProductEntity> {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsNumber()
	price: number;

	@IsNumber()
	qty: number;

    @IsUUID()
	categoryId: string;
}

export class UpdateProductDTO implements Partial<AddNewProductDTO> {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsNumber({allowInfinity: false, allowNaN: false}, {message: `Price must be a valid number`})
	price?: number;

	@IsOptional()
	@IsNumber({allowInfinity: false, allowNaN: false}, {message: `Quanity must be a valid number`})
	qty?: number;

	@IsOptional()
	@IsUUID()
	categoryId?: string;
}

export class AddNewCategoryDTO implements Partial<CategoryEntity> {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    parentCategoryId?: string;
}

export class UpdateCategoryDTO implements Partial<AddNewCategoryDTO> {
	@IsString()
	@IsOptional()
	name?: string;

	@IsString()
	@IsOptional()
	parentCategoryId?: string;
}

export class GetByIdDTO {
	@IsUUID()
    id: string;
}

export class SearchItemDTO {
	@IsString()
    query: string;
}
