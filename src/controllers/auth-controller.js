const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const generateTokens = require('../modules/token.module');

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
        user: newUser
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
        user
      };
      if (!bcrypt.compareSync(body.password, user.password)) res.status(400).send({message: 'wrong password'});

      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({message: `login: ${e}`});
    }
  }

}
module.exports = new AuthController();