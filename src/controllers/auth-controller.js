const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const generateTokens = require("../modules/token.module");
const jwt = require("jsonwebtoken");

class AuthController {

  async register(req, res) {
    try {
      if (req.body) {
        const {email, password, userName} = req.body;
        const userEmailExists = await User.exists({email});
        const userNameExists = await User.exists({userName});

        if (userEmailExists) {
          return res.status(409).send({message: "user with such email already exists"});
        }
        if (userNameExists) {
          return res.status(409).send({message: "user with such name already exists"});
        }

        let passwordHash = await bcrypt.hash(password, 8);
        const newUser = await User.create({...req.body, password: passwordHash});
        const {token, refreshToken} = generateTokens(newUser);
        const data = {
          token,
          refreshToken,
        };

        res.status(200).send(data);
      } else {
        res.status(400).send({message: "no data provided"});
      }
    } catch (e) {
      res.status(500).send({message: `register: ${e}`});
    }
  }

  async login(req, res) {
    try {
      if (req.body) {
        const {email, password} = req.body;
        const user = await User.findOne({email}).lean();

        if (!user) {
          return res.status(404).send({message: "no users with such email"});
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(400).send({message: "wrong password"});
        }

        const {token, refreshToken} = generateTokens(user);
        const data = {
          token,
          refreshToken,
        };
        res.status(200).send(data);
      } else {
        res.status(400).send({message: "no data provided"});
      }
    } catch (e) {
      res.status(500).send({message: `login: ${e}`});
    }
  }

  async refreshTokens(req, res) {
    try {
        const oldToken = req.body.refreshToken;
        const decoded = jwt.verify(oldToken, process.env.REF_TOKEN_SECRET);
        const _id = decoded._id;

        const user = await User.findOne({_id}).lean();

        if (!user) {
          return res.status(404).send("user cannot be recognized");
        }
        const {token, refreshToken} = generateTokens(user);

        res.send({token, refreshToken});
    } catch (e) {
      return res.status(403).send({message: "cannot refresh token"});
    }
  }

}

module.exports = new AuthController();