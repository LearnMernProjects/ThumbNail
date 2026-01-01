import express from 'express';
import {registerUser, loginUser, logoutUser, verifyUser} from '../controllers/AuthControllers.js'
import protect from '../middleware/auth.js';
const router = express.Router();
const AuthRouter = express.Router();

AuthRouter.post('/register', registerUser);
AuthRouter.post('/login', loginUser);
AuthRouter.get('/verify',protect,  verifyUser);
AuthRouter.post('/logout', protect, logoutUser)

export default AuthRouter;