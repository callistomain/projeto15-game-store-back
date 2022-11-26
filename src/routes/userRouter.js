import { Router } from 'express';
import { deleteSession, getCart, getProducts, postCart, postSales } from '../controllers/userController.js';
import { tokenValidation } from '../middlewares/tokenValidationMiddleware.js';
const router = Router();

router.use(tokenValidation);
router.post('/carts', postCart);
router.get('/carts', getCart);
router.get('/products', getProducts);
router.delete('/sessions', deleteSession);
router.post('/sales', postSales);

export default router;