import { Request, Response } from "express";
import { validateDTO } from "../../utils/validateDTO";
import { AddNewCategoryDTO, AddNewProductDTO, GetByIdDTO, SearchItemDTO, UpdateCategoryDTO, UpdateProductDTO } from "./product.dto";
import { ProductService } from "./product.service";

export class ProductController {
	private productService: ProductService;

	constructor() {
		this.productService = new ProductService();
	}

	async addProduct(req: Request, res: Response): Promise<void> {
		const validData = await validateDTO(AddNewProductDTO, req.body);
		const newProduct = await this.productService.addNewProduct(validData);
		res.json(newProduct);
	}

	async getAllProduct(req: Request, res: Response): Promise<void> {
		res.json(await this.productService.getAllProducts());
	}

	async getProductById(req: Request, res: Response): Promise<void> {
		const { id } = await validateDTO(GetByIdDTO, req.params.id);
		res.json(await this.productService.getProductById(id));
	}

	async searchProduct(req: Request, res: Response): Promise<void> {
		const { query } = await validateDTO(SearchItemDTO, req.query);
		res.json(await this.productService.searchProduct(query));
	}

	async updateProduct(req: Request, res: Response): Promise<void> {
		const validData = await validateDTO(UpdateProductDTO, req.body);
		res.json(await this.productService.updateProduct(req.params.id, validData));
	}

	async deleteProduct(req: Request, res: Response): Promise<void> {
		res.json(await this.productService.deleteProduct(req.params.id));
	}

	// category handling

	async addCategory(req: Request, res: Response): Promise<void> {
		const validData = await validateDTO(AddNewCategoryDTO, req.body);
		const newCategory = await this.productService.addNewCategory(validData);
		res.json(newCategory);
	}

	async getAllCategories(req: Request, res: Response): Promise<void> {
		res.json(await this.productService.getAllCategories());
	}

	async searchCategory(req: Request, res: Response): Promise<void> {
		const { query } = await validateDTO(SearchItemDTO, req.query);
		res.json(await this.productService.searchCategory(query));
	}

	async getCategoryById(req: Request, res: Response): Promise<void> {
		const { id } = await validateDTO(GetByIdDTO, req.params.id);
		res.json(await this.productService.getCategoryById(id));
	}

	async updateCategory(req: Request, res: Response): Promise<void> {
		const validData = await validateDTO(UpdateCategoryDTO, req.body);
		res.json(
			await this.productService.updateCategory(req.params.id, validData)
		);
	}

	async deleteCategory(req: Request, res: Response): Promise<void> {
		res.json(await this.productService.deleteCategory(req.params.id));
	}
}