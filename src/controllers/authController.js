import bcrypt from 'bcrypt';
import { users } from "../database/db.js";

export async function postSignup(req, res) {
  const {user} = req;

  try {
    const userFound = await users.findOne({email: user.email});
    if (userFound) {
      return res.status(409).send({message: "Esse email já está cadastrado."});
    }

    const hashPassword = bcrypt.hashSync(user.password, 10);
    await users.insertOne({...user, password: hashPassword});
    res.sendStatus(201);

  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}