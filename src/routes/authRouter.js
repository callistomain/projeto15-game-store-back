import { Router } from 'express';
import { postSignup, postLogin } from '../controllers/authController.js';
import { userSchemaValidation } from '../middlewares/userSchemaValidationMiddleware.js';
const router = Router();

router.post('/signup', userSchemaValidation, postSignup);
router.post('/login', postLogin);

export default router;