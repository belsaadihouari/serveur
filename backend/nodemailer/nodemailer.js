"use strict";
const nodemailer = require("nodemailer");

const Nodemailer = async (emaildestinataire,generateConfirmationLink) => {
  const transporter = nodemailer.createTransport({
    
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "stat1401@gmail.com",
      pass: "tllktkinfyrxfiso",
    },
 
  });
  const emailBody = `
    <p>Dear user,</p>
    <p>Thank you for registering on my portfolio. To complete your registration, please click on the link below to confirm your email address:</p>
    <p><a href="${generateConfirmationLink}">Confirm email address</a></p>
    <p>If you did not attempt to register on my portfolio, please ignore this email.</p>
    <p>Best regards,<br>The team at houaribelsaadi.dev</p>
  `;

  const message = {
    from: '"Houari Belsaadi" <stat1401@gmail.com>', // sender address
    to: emaildestinataire, 
    subject: "In reference to your registration", // Subject line
    html: emailBody,
  };
  await transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent:" + info.response);
    }
  });
};
module.exports = Nodemailer;