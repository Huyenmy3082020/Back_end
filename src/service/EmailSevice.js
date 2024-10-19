const nodemailer = require("nodemailer");

const dotenv = require("dotenv");

const sendEmailCreateOrer = async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAIN_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: "Hatuan1562004@gmail.com", // sender address
    to: "Hatuan1562004@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
};
module.exports = {
  sendEmailCreateOrer,
};
