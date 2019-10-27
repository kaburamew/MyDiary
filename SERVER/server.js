import express from 'express';
import dotenv from 'dotenv';
import route from './routes/user.route';

dotenv.config();
const app = express();
app.use(express.json());
app.use(route);
const port = process.env.PORT;
app.listen(port, () => console.log(`server is running on port: ${port}`));

export default app;
