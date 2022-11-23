import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

// Client connection
const client = new MongoClient(process.env.MONGO_URI);
try {
  await client.connect();
  console.log('MongoDB connected!');
} catch (err) {
  console.log('err.message');
}

// MongoDB
const db = client.db('gameStore-dev');
export const users = db.collection("users");
 