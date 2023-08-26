import jwt from 'jsonwebtoken';
import sendEmail from './sendEmail.js';

export let NEW_SECRET;
const generateToken = (response, user, message, DoSendEmail, expiresIn) => {
  if (DoSendEmail) NEW_SECRET = process.env.SECRET_ACCESS_TOKEN + user.password;
  const accesstoken = jwt.sign(
    {
      userData: {
        id: user._id,
        email: user.email,
      },
    },
    NEW_SECRET,
    {
      expiresIn,
    },
  );
  if (DoSendEmail) sendEmail(user.email);

  response.status(200).json({
    data: {
      accesstoken,
    },
    message,
    success: true,
  });
};

export default generateToken;
