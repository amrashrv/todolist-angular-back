const jwt = require("jsonwebtoken");

class Middleware {
  async checkJwt(req, res, next) {
    try {
      let token = req.header("Authorization") || "";

      if (token.indexOf("Bearer ") !== -1) {
        req.user = jwt.verify(token.replace("Bearer ", ""), process.env.TOKEN_SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).send({message: "unauthorized"});
          }
          req.userId = decoded._id;

          res.locals.userId = decoded._id;
          next();
        });
      }
    } catch (e) {
      res.status(500).send({message: `checkJwt: ${e}`});
    }
  }

}

module.exports = new Middleware();