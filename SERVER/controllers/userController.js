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
      return res.status(401).json({
        status: 401,
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

  static login(req, res){
    const { email, password } = req.body;
    const checkmail = users.find(usr => usr.email === email);
    const utoken = usertoken.sign({
      email,
    }, process.env.secret_key);
    if(!checkmail){
      return res.status(401).json({
        status: 401,
        error: 'user does not exist',
      });
    }
    const checkPassword = bcrypt.compareSync( password, checkmail.password);
    if(!checkPassword){
      return res.status(401).json({
        status: 401,
        error: 'email or password is incorrect',
      });
    } 
    return res.status(200).json({
      status: 200,
      message: 'user successfully logged in',
      token: utoken,
    });
  }
}

export default userController;
