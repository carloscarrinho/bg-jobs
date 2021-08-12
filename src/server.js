import 'dotenv/config';
import express from 'express';

import UserController from './app/controllers/user-controller';

const app = express();
const port = 3333;

app.use(express.json());

app.post('/users', UserController.store);

app.listen(port, () => console.log(`Server running at port ${port}`));