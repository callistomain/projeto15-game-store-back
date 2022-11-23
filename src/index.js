import express, { json } from 'express';
import cors from 'cors';

// Express
const app = express();
app.use(json());
app.use(cors());

// Test/Debug
app.get('/test', async (req, res) => {
  try {
    res.send("Hello World!");
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

// Connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server running at port ' + port);
});