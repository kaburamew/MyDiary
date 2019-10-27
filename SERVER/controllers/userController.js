import usertoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt-nodejs';
import users from '../models/users';

dotenv.config();
class userController {
  static signup(req, res) {
    const {
      firstname, lastname, email, password,
    } = req.body;
    const hashedpass = bcrypt.hashSync(password);
    const newuser = {
      firstname, lastname, email, password: hashedpass,
    };
    const utoken = usertoken.sign({
      firstname, lastname, email,
    }, process.env.secret_key);

    const checkmail = users.find((usr) => usr.email === email);

    if (checkmail) {
      return res.status(403).json({
        status: 403,
        error: 'email already exist',
      });
    }
    users.push(newuser);
    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      token: utoken,
      data: newuser,
    });
  }
}

export default userController;
