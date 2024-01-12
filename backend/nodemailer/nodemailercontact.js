"use strict";
const nodemailer = require("nodemailer");

const Nodemailercontact = async (email,textmessage) => {
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
    <p>Bonjour houari</p>
    <p>désolé pour le dérangement, un email a été envoyé par un utilisateur depuis votre portfolio :</p>
    <p>${email}</p>
    <p>et le contenu de ce email est:</p>
    <p>${textmessage}</p>
  `;

  const message = {
    from: '"Houari Belsaadi" <stat1401@gmail.com>', // sender address
    to: "contact@houaribelsaadi.dev", 
    subject: "Email depuis votre portfolio", // Subject line
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
module.exports = Nodemailercontact;