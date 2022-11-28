
import { carts, products, sessions,sales, users } from "../database/db.js";
import { ObjectId } from "mongodb";


export async function postCart (req, res) {
  const { token } = req;
  const data = req.body;

  try {
    const {userId} = await sessions.findOne({token});
    const userFound = await carts.findOne({userId});

    if (userFound) await carts.updateOne({userId}, {$set: {data}});
    else await carts.insertOne({userId, data});

    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

export async function getCart (req, res) {
  const { token } = req;

  try {
    const {userId} = await sessions.findOne({token});
    const cart = await carts.findOne({userId});
    if (!cart) return res.send(null);

    const productsTemp = await products.find().toArray();
    const gamesReturn = [];

    cart.data.map((i) => gamesReturn.push(productsTemp[i]));
    let totalValue = 0;

    gamesReturn.map((i) => totalValue += parseFloat(i.price))
    res.send({totalPrice: totalValue, games:gamesReturn, data:cart.data});

  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

export async function getProducts (req, res) {
  try {
    const allProducts = await products.find().toArray();
    res.send(allProducts);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

export async function postSales (req, res){
  const { token } = req;
  const {gamesBoughtIds, buyerInfo} = req.body;
  try{

    const {userId} = await sessions.findOne({token});
    const user = await users.findOne({_id: userId})
    const gamesBought = [];
    for (const id of gamesBoughtIds) {
      const gameFound = await products.findOne({ _id: ObjectId(id) });
      gamesBought.push(gameFound)
    }
    let totalValue = 0;
    gamesBought.map((i)=> totalValue+=parseFloat(i.price))
    const gamesNames = gamesBought.map((i)=>{return i.title})
    sales.insertOne({...req.body,gamesBought:gamesNames, userId, totalPrice:totalValue})
    const promise = {
      name: user.name,
      price:totalValue,
      gamesBought:gamesNames,
      payment:buyerInfo
    }
    res.send(promise).status(200)
  }catch(err){
    console.log(err.message);
    res.sendStatus(500);
  }
}

export async function deleteSession (req, res) {
  const { token } = req;

  try {
    const result = await sessions.deleteOne({token});
    if (result.deletedCount) res.sendStatus(200);
    else res.sendStatus(404);

  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}
