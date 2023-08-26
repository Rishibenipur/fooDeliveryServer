import jwt from 'jsonwebtoken';
import { NEW_SECRET } from '../helperFunction/generateToken.js';
const userAuth = async (request, response, next) => {
  let token;
  const authHeader = request.headers.authorization || request.headers.Authorization;
  token = authHeader.split(' ')[1];
  if (token) {
    jwt.verify(token, NEW_SECRET, (error, decode) => {
      if (error) {
        response.status(400);
        next(new Error('Session Expired'));
      } else {
        request.user = decode.userData;
        next();
      }
    });
  } else {
    response.status(400);
    next(new Error('Invalid credentials'));
  }
};

export default userAuth;
