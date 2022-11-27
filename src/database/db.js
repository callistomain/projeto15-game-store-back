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
export const sessions = db.collection("sessions");
export const products = db.collection("products");
export const carts = db.collection("carts");
export const sales = db.collection("sales");

try {
  await products.updateOne(
    {
      title : 'Batman'
    }, 
     {
      $setOnInsert: {title: 'Batman', price: "49,99", image: 'https://image.api.playstation.com/cdn/UP1018/NPUB50285_00/xZLTc6NTmqH4wZfLYPguWBjcDcolo63Y.png'}
     },
     {upsert: true}
  );
  await products.updateOne(
    {
      title : 'Cyberpunk 77'
    }, 
     {
      $setOnInsert: {title: 'Cyberpunk 77', price: "99,99", image: "https://i0.wp.com/uploads.freegogpcgames.com/image/Cyberpunk-2077.jpg?fit=678%2C381&ssl=1"}
     },
     {upsert: true}
  );
  await products.updateOne(
    {
      title : 'GTA V'
    }, 
     {
      $setOnInsert: {title: 'GTA V', price: "54,99", image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/capsule_616x353.jpg?t=1667343890'}
     },
     {upsert: true}
  );
  await products.updateOne(
    {
      title : 'Stellaris'
    }, 
     {
      $setOnInsert: {title: 'Stellaris', price: "62,99", image: 'https://cdn.akamai.steamstatic.com/steam/apps/281990/capsule_616x353.jpg?t=1667494023'}
     },
     {upsert: true}
  );
  await products.updateOne(
    {
      title : 'Squad'
    }, 
     {
      $setOnInsert: {title: 'Squad', price: "73,99", image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/393380/capsule_616x353.jpg?t=1668019306'}
     },
     {upsert: true}
  );
  await products.updateOne(
    {
      title : 'Mortal Kombat'
    }, 
     {
      $setOnInsert: {title: 'Mortal Kombat', price: "57,99", image: 'https://assets-prd.ignimgs.com/2022/10/18/mortal-1666104362965.jpg'}
     },
     {upsert: true}
  );
  await products.updateOne(
    {
      title : 'Minecraft'
    }, 
     {
      $setOnInsert: {title: 'Minecraft', price: "39,99", image: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png'}
     },
     {upsert: true}
  )
} catch(r){
  
}