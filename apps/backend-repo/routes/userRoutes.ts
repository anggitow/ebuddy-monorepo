import { Router } from 'express';
import { fetchUserData, updateUserData } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const userRoutes = Router();

// Apply authMiddleware to all routes in this router
userRoutes.use(authMiddleware);

userRoutes.get('/fetch-user-data', fetchUserData);
userRoutes.post('/update-user-data', updateUserData);

export default userRoutes;
