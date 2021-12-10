const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const generateTokens = require('../modules/token.module');
const jwt = require('jsonwebtoken')

class AuthController {

  async register(req, res) {
    try{
      const body = req.body;
      let passwordHash = await bcrypt.hash(body.password, 8);

      const userExists = await User.exists({email: body.email});
      const newUser = await User.create({...body, password: passwordHash});
      const { token, refToken } = generateTokens(newUser);
      const data = {
        token,
        refToken,
      };
      if (userExists) res.status(400).send({message: 'user already exists'});
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({message: `register: ${e}`});
    }
  }

  async login(req, res) {
    try {
      const body = req.body;
      const user = await User.findOne({email: body.email});

      if(!user) res.status(404).send({message: 'no users with such email'});
      const {token, refToken} = generateTokens(user);
      const data = {
        token,
        refToken,
      };
      if (!bcrypt.compareSync(body.password, user.password)) res.status(400).send({message: 'wrong password'});

      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({message: `login: ${e}`});
    }
  }
  async refreshTokens(req, res) {
    try {
      console.log(req.body);
      const oldToken = req.body.refToken;
      const decoded = jwt.verify(oldToken, process.env.REF_TOKEN_SECRET);
      const id = decoded._id;
      const user = await User.findOne({_id: id}).lean();

      if (!user) {
        res.status(403).send();
      }

      const {token, refToken} = generateTokens(user);

      return res.send({token, refToken});
    } catch (e) {
      console.log(e);
      res.status(500).send({message: 'cannot refresh token'});
    }
  }

}
module.exports = new AuthController();