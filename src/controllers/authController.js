import bcrypt from 'bcrypt';
import { users, sessions } from "../database/db.js";
import { v4 as uuid } from 'uuid';

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

export async function postLogin (req, res) {
  const { email, password } = req.body;
  
  try {
    const user = await users.findOne({email});
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({message: "Algum campo está incorreto."});
    }

    const userSession = await sessions.findOne({userId: user._id});
    if (userSession) {
      return res.status(401)
      .send({message: "Você já está logado, saia para logar novamente."});
    }
    
    const token = uuid();
    await sessions.insertOne({token, userId: user._id});
    delete user.password;
    res.send({...user, token});

  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}