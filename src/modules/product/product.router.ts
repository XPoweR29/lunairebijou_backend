import { Router } from "express";
import { ProductController } from "./product.controller";
import { userRoleGuard } from "../../middleware/userRoleGuard.middleware";
import { UserRole } from "../../types/auth.type";
import { authGuard } from "../../middleware/authGuard.middleware";

export const productRouter = Router();
const productController = new ProductController();

productRouter

.post('/', authGuard, userRoleGuard([UserRole.ADMIN]), productController.addProduct.bind(productController))
.get('/', productController.getAllProduct.bind(productController))
.get('/search', productController.searchProduct.bind(productController))
.get('/:id', productController.getProductById.bind(productController))
.put('/:id', authGuard, userRoleGuard([UserRole.ADMIN]), productController.updateProduct.bind(productController))
.delete('/:id', authGuard, userRoleGuard([UserRole.ADMIN]), productController.deleteProduct.bind(productController))

//category handling 
.post('/category', authGuard, userRoleGuard([UserRole.ADMIN]), productController.addCategory.bind(productController))
.get('/category', productController.getAllCategories.bind(productController))
.get('/category/search', productController.searchCategory.bind(productController))
.get('/category/:id', productController.getCategoryById.bind(productController))
.put('/category/:id', authGuard, userRoleGuard([UserRole.ADMIN]), productController.updateCategory.bind(productController))
.delete('/category/:id', authGuard, userRoleGuard([UserRole.ADMIN]), productController.deleteCategory.bind(productController))

