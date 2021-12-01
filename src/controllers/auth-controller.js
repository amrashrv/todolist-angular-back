const User = require('../models/user-model');

class AuthController {
  async register(req, res) {
    try{
      const body = req.body;
      const newUser = await User.create(body)
      res.status(200).send({data: newUser});
    } catch (e) {

    }
  }
  async login(req, res) {
    try {
      const body = req.body;
      const user = await User.findOne({userName: body.userName});
      if(!user){
        res.status(404).send({message: 'no users with such userName'})
      }
      if(user.password !== body.password){
        res.status(402).send({message: 'wrong password'})
      }
      res.status(200).send({data: user});
    } catch (e) {

    }
  }
}
module.exports = new AuthController()