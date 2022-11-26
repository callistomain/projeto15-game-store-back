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

// Test/Debug (TO DELETE) ==============================================
app.get('/users', async (req, res) => {
  try {
    const allUsers = await users.find().toArray();
    res.send(allUsers);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

app.get('/ses', async (req, res) => {
  try {
    const allSessions = await sessions.find().toArray();
    res.send(allSessions);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

app.delete('/ses', async (req, res) => {
  try {
    await sessions.deleteMany({});
    const allSessions = await sessions.find().toArray();
    res.send(allSessions);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

app.post('/products', async (req, res) => {
  const data = req.body; // {title, image, price}
  try {
    await products.insertOne(data);
    const allProducts = await products.find().toArray();
    res.send(allProducts);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

app.delete('/cart', async (req, res) => {
  try {
    await carts.deleteMany({});
    const allCarts = await carts.find().toArray();
    res.send(allCarts);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});
// =====================================================================

app.use(userRouter);

// Connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server running at port ' + port);
});