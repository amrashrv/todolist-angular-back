const jwt = require("jsonwebtoken");

const tokenExpiration = 900;
const refreshTokenExpiration = 864000;

module.exports = (user) => {
  const data = {
    email: user.email,
    _id: user._id,
  };
  
  const token = jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn: `${tokenExpiration}s`});
  const refreshToken = jwt.sign(data, process.env.REF_TOKEN_SECRET, {expiresIn: `${refreshTokenExpiration}s`});

  if (!user) {
    return undefined;
  }

  return {token, refreshToken};
};