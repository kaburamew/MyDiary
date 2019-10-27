import express from 'express';
import usercontroller from '../controllers/userController';
import validation from '../middleware/uservalidation';

const app = express();
app.post('/api/v1/auth/signup', validation.signupValidation, usercontroller.signup);

export default app;
