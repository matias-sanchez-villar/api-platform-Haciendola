import { Router } from 'express';
import { postLogin, postNew, postResetPassword } from '../controllers/user.controllers';
import { validationLogin, validationNewUser, validationForgotPassword, validationResetPassword } from '../middleware/validationUser';

const user = Router();

user.post('/login', validationLogin, postLogin);

user.post('/new', validationNewUser, postNew);

user.put('/reset-password', validationResetPassword, postResetPassword);

export default user;
