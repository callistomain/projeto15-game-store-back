import express, { json } from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import { carts, products, sessions, users } from './database/db.js'; // Test/Debug (TO DELETE) 

// Express
const app = express();
app.use(json());
app.use(cors());
app.use(authRouter);
app.use(userRouter);

// Connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server running at port ' + port);
});