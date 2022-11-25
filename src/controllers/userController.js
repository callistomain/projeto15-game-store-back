import { carts, products, sessions } from "../database/db.js";

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
    res.send(cart);
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
