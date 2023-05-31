import { Response, Router } from 'express';
import { createUser, getUserById, getUsers, deleteUserById, updateUserById } from '../controllers/user.controller';
export const userRouter = Router();

userRouter.post('/create_user', createUser);

userRouter.get('/:id', getUserById);

userRouter.get('/', getUsers);

userRouter.delete('/:id', deleteUserById);

userRouter.patch('/:id', updateUserById);