import { Router } from "express";
import { ProductController } from "./product.controller";

export const productRouter = Router();
const productController = new ProductController();

productRouter

.post('/', productController.addProduct.bind(productController))
.get('/', productController.getAllProduct.bind(productController))
.get('/search', productController.searchProduct.bind(productController))
.get('/:id', productController.getProductById.bind(productController))
.put('/:id', productController.updateProduct.bind(productController))
.delete('/:id', productController.deleteProduct.bind(productController))

//category handling 
.post('/category', productController.addCategory.bind(productController))
.get('/category', productController.getAllCategories.bind(productController))
.get('/category/search', productController.searchCategory.bind(productController))
.get('/category/:id', productController.getCategoryById.bind(productController))
.put('/category/:id', productController.updateCategory.bind(productController))
.delete('/category/:id', productController.deleteCategory.bind(productController))

