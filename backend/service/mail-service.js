const nodemailer = require("nodemailer");

class MailService {
 constructor() {
  this.transporter = nodemailer.createTransport({
   host: process.env.SMTP_HOST,
   port: process.env.SMTP_PORT,
   secure: true,
   auth: {
    user: "kanstantsin.yakimovich@mail.ru",
    pass: "DFgmy7xkQVwqj3psdyJd",
   },
  });
 }

 async sendActivationMail(to, link) {
  await this.transporter.sendMail({
   from: "kanstantsin.yakimovich@mail.ru",
   to,
   subject: "Account activation for " + process.env.API_URL,
   text: "",
   html: `
   <div>
   <h1>follow the link to activate your account</h1>
   <a href="${link}">${link}</a>
   </div>
    `,
  });
 }
}

module.exports = new MailService();
