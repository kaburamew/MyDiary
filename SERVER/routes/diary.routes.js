import express from 'express';
import DairyController from '../controllers/diaryController';
import validation from '../middleware/dvalidations'

const app = express();
app.post('/api/v1/auth/entries', validation.contentValidation, DairyController.createEntry);
app.get('/api/v1/auth/entries/:id', DairyController.findEntry);

export default app;
