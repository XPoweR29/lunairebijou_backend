import { CategoryEntity } from './../../entities/category.entity';
import { ProductEntity } from "../../entities/product.entity";
import { ValidationError } from "../../middleware/handleError";
import { HttpStatus } from "../../types/httpExeptions";
import { serverLog } from "../../utils/serverLog";
import { AddNewCategoryDTO, AddNewProductDTO, UpdateCategoryDTO } from "./product.dto";

export class ProductService {
	private async checkIfProductNameAlreadyExists(productName: string) {
		const foundProduct = await ProductEntity.findOne({
			where: { name: productName },
		});
		if (foundProduct)
			throw new ValidationError(
				"Product with this name already exists",
				HttpStatus.CONFLICT
			);
	}

	private async checkIfCategoryExists(categoryName: string) {
		const category = await CategoryEntity.findOne({
			where: { name: categoryName },
		});
		if (category)
			throw new ValidationError(
				"Given category already exists",
				HttpStatus.CONFLICT
			);
	}

	async addNewProduct(productData: AddNewProductDTO): Promise<ProductEntity> {
		await this.checkIfProductNameAlreadyExists(productData.name);
        const category = await this.getCategoryById(productData.categoryId);

		const newProduct = new ProductEntity();
		Object.assign(newProduct, productData);
        newProduct.category = category;
		await newProduct.save();
		serverLog(`Product "${newProduct.name}" has been added`);
		return newProduct;
	}

	async getAllProducts(): Promise<ProductEntity[]> {
		return await ProductEntity.find({relations: ['category']});
	}

	async getProductById(id: string): Promise<ProductEntity> {
		const foundProduct = await ProductEntity.findOne({ where: { id } });
		if (!foundProduct)
			throw new ValidationError(
				`Product with given ID does not exist`,
				HttpStatus.NOT_FOUND
			);
		return foundProduct;
	}

	async searchProduct(query: string): Promise<ProductEntity[]> {
		const foundItems = await ProductEntity.createQueryBuilder("product")
			.where("product.name LIKE :query", { query: `%${query}%` })
			.getMany();

		return foundItems;
	}

	async updateProduct(id: string, data: Partial<ProductEntity>): Promise<ProductEntity> {
		const product = await this.getProductById(id);
		Object.assign(product, data);
		await product.save();
		serverLog(`Product "${product.name}" has been updated`);
		return product;
	}

	async deleteProduct(id: string): Promise<void> {
		const product = await this.getProductById(id);
		await product.remove();
		serverLog(`Product "${product.name}" has been deleted`);
	}

	//category handling

	async addNewCategory(data: AddNewCategoryDTO): Promise<void> {
		await this.checkIfCategoryExists(data.name);
        const category = new CategoryEntity();
        Object.assign(category, data);
        
        if(data.parentCategoryId) {
            const parentCategory = await this.getCategoryById(data.parentCategoryId);
            category.parentCategory = parentCategory;
        }

		await category.save();
		serverLog(`Category "${category.name}" has been added`);
	}

	async getAllCategories(): Promise<CategoryEntity[]> {
		return await CategoryEntity.find();
	}

	async getCategoryById(id: string): Promise<CategoryEntity> {
		const category = await CategoryEntity.findOne({ where: { id }, relations: ['parentCategory'] });
		if (!category)
			throw new ValidationError(
				`Category with given ID does not exist`,
				HttpStatus.NOT_FOUND
			);
		return category;
	}

	async searchCategory(query: string): Promise<CategoryEntity[]> {
		const categories = await CategoryEntity.createQueryBuilder("category")
			.leftJoinAndSelect('category.parentCategory', 'parentCategory')
			.where("category.name LIKE :query", { query: `%${query}%` })
			.getMany();

		return categories;
	}

	async updateCategory(id: string, data: UpdateCategoryDTO): Promise<CategoryEntity> {
		const category = await this.getCategoryById(id);
		const parentCategory = await this.getCategoryById(data.parentCategoryId);
		category.name = data.name;
		category.parentCategory = parentCategory;

		await category.save();
		serverLog(`Product "${category.name}" has been updated`);
		console.log(category.name);
		return category;
	}

    async deleteCategory(id: string): Promise<void> {
		const category = await this.getCategoryById(id);
		await category.remove();
		serverLog(`Category "${category.name}" has been deleted`);
	}
}
