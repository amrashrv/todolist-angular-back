const jwt = require("jsonwebtoken");

const tokenExpiration = 172800;
const refreshTokenExpiration = 864000;

module.exports = (user) => {
  if (!user) {
    return undefined;
  }
  const data = {
    email: user.email,
    _id: user._id,
  }


  const token = jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn: `${tokenExpiration}s`});
  const refToken = jwt.sign(data, process.env.REF_TOKEN_SECRET, {expiresIn: `${refreshTokenExpiration}s`});
  return {token, refToken};
}