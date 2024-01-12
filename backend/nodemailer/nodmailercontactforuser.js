"use strict";
const nodemailer = require("nodemailer");

const Nodmailercontactforuser = async (emaildestinataire) => {
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
    <p>Dear user, ${emaildestinataire}</p>
    <p>A heartfelt thank you for taking the time to contact me through my portfolio. I've received your message, and I appreciate your interest.</p>
    <p>I want to assure you that I take your inquiry seriously. My team and I are currently reviewing your message and will do our best to provide you with a detailed response as soon as possible.</p>
    <p>If you have any additional questions or if your request requires an immediate response, please feel free to contact me directly at contact@houaribelsaadi.dev</p>
    <p>Thank you again for your interest and your patience as we process your request.</p>
    <p>Best regards,<br>The team at houaribelsaadi.dev</p>
  `;

  const message = {
    from: '"Houari Belsaadi" <stat1401@gmail.com>', // sender address
    to: emaildestinataire, 
    subject: "Receipt Confirmation: Your Contact Message is Under Review", // Subject line
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
module.exports = Nodmailercontactforuser;