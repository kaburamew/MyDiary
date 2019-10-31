import express from 'express';
import usercontroller from '../controllers/userController';
import validation from '../middleware/uservalidation';

const app = express();
app.post('/api/v1/auth/signup', validation.signupValidation, usercontroller.signup);
app.post('/api/v1/auth/login', usercontroller.login);

export default app;
