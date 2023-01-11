const mail = require('nodemailer');
const mailConfig = require('../config/mailConfig');

const transporter = mail.createTransport(mailConfig.mailConfig);

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

let mailContent = {
  from: 'no-replay@pc-acad.com',
  to: 'a.georgiev@pc-acad.com',
  subject: 'Message from the website',
  html: '<p>No content sent</p>',
};

exports.sendMail = message => {
  console.log('Enters the send message function', message);
  if (message) {
    mailContent.html = `
    <h1>You have a new message from the website</h1>
    <hr>
    <h2>Name: ${message.name}</h2>
    <p>E-mail: ${message.email}</p>
    <hr>
    <p>Message: ${message.message}</p>
    <p>Like: ${message.like == 'on' ? 'Yes' : 'No'}</p>`;
  }

  transporter
    .sendMail(mailContent)
    .then(info => console.log(info))
    .catch(err => {
      console.log('There is an error: ', err);
    });
};
