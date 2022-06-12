const express = require('express');
const { engine } = require('express-handlebars');
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

app.get('/', (req, res) => {
    res.render('webpage')
})

app.post('/', (req, res) => {
     console.log(req.body);
})

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is started ............................................................');
})