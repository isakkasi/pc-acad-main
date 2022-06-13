const express = require('express');
const { engine } = require('express-handlebars');
const mail = require('nodemailer')
// const main = require('./views/layouts/index')

const app = express();

// set up the handlebars
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// set up the static files
app.use('/static', express.static('public'));

//Middleware for reading the body of the POST requests
app.use(express.urlencoded({ extended: false }));

//Configure mail
let mailConfig ={
    host: 'pc-acad.com',
    port: 465,
    secure: true,
    auth: {
        user: 'no-replay@pc-acad.com',
        pass: 'noreplaypc-acad'
    }
}
const transporter = mail.createTransport(mailConfig)

let mailContent = {
    from: 'no-replay@pc-acad.com',
    to: 'a.georgiev@plane-care.com',
    subject: 'Test',
    text: 'Hello',
}

app.get('/', (req, res) => {
    res.render('webpage')
})

app.post('/', (req, res) => {
    console.log('Something');
     console.log(req.body);
     transporter.sendMail(mailContent)
     .then((info) => console.log(info))
     .catch(err => {console.log(err)})
})

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is started ............................................................');
})