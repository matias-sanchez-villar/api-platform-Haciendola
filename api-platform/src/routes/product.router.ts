import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { getAllProducts, getProductById, createProduct,  updateProduct, deleteProduct } from '../controllers/product.controllers';
import { validatorProduct, validatorProductId } from '../middleware/validatorProduct';

const product = Router();

product.get('/all', authenticateToken, getAllProducts);

product.get('/:id', authenticateToken, getProductById);

product.post('/', authenticateToken, validatorProduct, createProduct);

product.put('/', authenticateToken, validatorProductId, updateProduct);

product.delete('/:id', authenticateToken, deleteProduct);

export default product;
