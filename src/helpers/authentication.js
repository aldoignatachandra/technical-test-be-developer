import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';

const expiresToken = 86400 * 1; // 1 day

const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, jwtSecret, { expiresIn: expiresToken });
  return token;
};

const generateRefreshToken = async () => {
  const token = uuidv4();
  const expiry = new Date(Date.now() + this.expiresRefreshToken);
  const salt = await bcrypt.genSalt(10);
  const tokenHash = await bcrypt.hash(token, salt);

  return { hash: tokenHash, expiry };
};

const getToken = (token) => {
  const Authorization = token;
  if (Authorization) {
    return Authorization.replace('Bearer ', '');
  }
  throw new Error('Not authorization');
};

const getUserId = (token) => {
  if (token) {
    const result = jwt.verify(token, jwtSecret);
    return result.userId;
  }
  throw new Error('Not authorization');
};

const comparePassword = async (password, comparePassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, comparePassword, function (err, isMatch) {
      if (err) reject(err);
      resolve(isMatch);
    });
  });
};

export {
  generatePassword,
  generateToken,
  generateRefreshToken,
  getToken,
  getUserId,
  comparePassword,
};
