import {Router} from 'express';
import * as UserController from '~/api/controllers/UserController';

export const userRoutes = Router();

userRoutes.get('/',UserController.getuser);
userRoutes.put('/moverandom',UserController.updateUser);
