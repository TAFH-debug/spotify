import { Router } from 'express';
import UserController from './user-controller';
import UserService from './user-service';
import { authMiddleware } from '../middlewares/auth-middleware';

const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.get('/users', userController.getUsers);
userRouter.get('/users/artists', userController.getArtists);
userRouter.get('/users/:id', userController.getUserById);
userRouter.get('/users/:id/full', userController.getUserByIdFull);
userRouter.put('/users/:id', authMiddleware, userController.updateUser);
userRouter.delete('/users/:id', authMiddleware, userController.deleteUser);

export default userRouter;