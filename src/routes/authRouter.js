import { Router } from 'express';
import { postSignup } from '../controllers/authController.js';
import { userSchemaValidation } from '../middlewares/userSchemaValidationMiddleware.js';
const router = Router();

router.post('/signup', userSchemaValidation, postSignup);

export default router;