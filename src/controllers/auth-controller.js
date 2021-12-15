const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const generateTokens = require('../modules/token.module');
const jwt = require('jsonwebtoken')

class AuthController {

  async register(req, res) {
    try {
      const {email, password, userName} = req.body;
      let passwordHash = await bcrypt.hash(password, 8);
      const userEmailExists = await User.exists({email});
      const userNameExists = await User.exists({userName});
      const newUser = await User.create({...req.body, password: passwordHash});
      const {token, refToken} = generateTokens(newUser);
      const data = {
        token,
        refToken,
      };

      if (userEmailExists) {
        return res.status(403).send({message: 'user with such email already exists'});
      }
      if (userNameExists) {
        return res.status(403).send({message: 'user with such name already exists'});
      }

      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({message: `register: ${e}`});
    }
  }

  async login(req, res) {
    try {
      if (req.body) {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const {token, refToken} = generateTokens(user);
        const data = {
          token,
          refToken,
        };

        if (!user) {
          return res.status(404).send({message: 'no users with such email'});
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(400).send({message: 'wrong password'});
        }

        res.status(200).send(data);
      }
    } catch (e) {
      res.status(500).send({message: `login: ${e}`});
    }
  }

  async refreshTokens(req, res) {
    try {
      if (req.body.refToken) {
        const oldToken = req.body.refToken;
        const decoded = jwt.verify(oldToken, process.env.REF_TOKEN_SECRET);
        const id = decoded._id;

        const user = await User.findOne({_id: id}).lean();

        if (!user) {
          return res.status(403).send();
        }
        const {token, refToken} = generateTokens(user);

        res.send({token, refToken});
      }
    } catch (e) {
      return res.status(403).send({message: 'cannot refresh token'});
    }
  }

}

module.exports = new AuthController();