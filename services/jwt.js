require('dotenv').config();
const jwt = require('jsonwebtoken');
const privateKey = process.env.SECRET_JWT;

const generateJwt = async (user) => {
  return await jwt.sign({ user: { id: user._id } }, privateKey);
}
const verifyJwt = async (token) => {
  return await jwt.verify(token, privateKey);
}

const decodeJwt = async (token) => {
  return await jwt.decode(token);
}

module.exports = {
  generateJwt,
  verifyJwt,
  decodeJwt
};
