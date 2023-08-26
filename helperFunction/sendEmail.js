import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const sendEmail = (to) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.REACT_APP_EMAIL,
      pass: process.env.REACT_APP_EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.REACT_APP_EMAIL,
    to,
    subject: 'Reset password ',
    html: `<h2>This link is valid for 2 min</h2> <br> ${process.env.LINK}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};

export default sendEmail;
