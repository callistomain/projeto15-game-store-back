import express, { json } from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import { users } from './database/db.js'; // Test/Debug (TO DELETE) 

// Express
const app = express();
app.use(json());
app.use(cors());
app.use(authRouter);

// Test/Debug (TO DELETE) ==============================================
app.get('/test', async (req, res) => {
  try {
    res.send("Hello World!");
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

app.get('/users', async (req, res) => {
  try {
    const allUsers = await users.find().toArray();
    res.send(allUsers);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});
// =====================================================================

// Connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server running at port ' + port);
});