import validator from 'validator';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail.js';

import generateToken from '../helperFunction/generateToken.js';

//user sign-up

export const userSignUp = async (request, response, next) => {
  const { email, phone, password, cPassword } = request.body;
  if (!email || !phone || !password || !cPassword) {
    response.status(400);
    return next(new Error('All fields are necessary '));
  }
  if (!validator.isEmail(email)) {
    response.status(401);
    return next(new Error('Invalid email !'));
  }
  if (!validator.isMobilePhone(phone)) {
    response.status(401);
    return next(new Error('Invalid phone number !'));
  }
  const user = await User.findOne({ email });
  if (user) {
    response.status(401);
    return next(new Error('Email already registered'));
  }
  if (password !== cPassword) {
    response.status(401);
    return next(new Error('Password not matched!'));
  } else {
    bcrypt.hash(password, 10, async (error, hash) => {
      if (error) {
        response.status(401);
        next(new Error('Internal Error'));
      } else {
        const userData = new User({
          email,
          phone,
          password: hash,
          cPassword: hash,
        });

        try {
          await userData.save();
          generateToken(response, userData, 'Sign in done successull', false, '1d');
        } catch (error) {
          response.status(400);
          next(new Error(error._message));
        }
      }
    });
  }
};

//user login

export const userLogin = async (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400);
    return next(new Error('All fields are necessary '));
  }
  if (!validator.isEmail(email)) {
    response.status(401);
    return next(new Error('Invalid email !'));
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accesstoken = jwt.sign(
      {
        userData: {
          id: user._id,
          email: user.email,
        },
      },
      process.env.SECRET_ACCESS_TOKEN,
      {
        expiresIn: '1d',
      },
    );
    response.status(200).json({
      data: {
        accesstoken,
      },
      message: 'Login successfull',
      success: true,
    });
  } else {
    response.status(401);
    next(new Error('Invalid email or password'));
  }
};

//reset-password

export const resetPassword = async (request, response, next) => {
  const { email } = request.body;

  const user = await User.findOne({ email });
  if (user) {
    generateToken(response, user, 'A Link has been sent to your mail', true, '2m');
  } else {
    response.status(400);
    next(new Error('Invalid Email !'));
  }
};

//Generate new password

export const newPassword = async (request, response, next) => {
  const { password, cPassword } = request.body;
  if (password != cPassword) {
    response.status(401);
    next(new Error('Password mismatched'));
  }
  bcrypt.hash(password, 10, async (error, hash) => {
    if (error) {
      response.status(401);
      next(new Error('Internal Error'));
    } else {
      await User.findByIdAndUpdate(request.user.id, { password: hash }, { new: true });
      response.status(200).json({
        data: null,
        message: 'Password changed successfully',
        success: true,
      });
    }
  });
};
