const express = require('express');
const logger = require('morgan');
const Home = require('./routes/home');
const About = require('./routes/about');
const Products = require('./routes/products');
const path = require('path');



const app = express();



// set variables
app.set('port', process.env.PORT || 3000);

// set engine view
app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
// with path
app.set('views', path.join(__dirname , 'views'))

// use logger
app.use(logger('dev'));

// set public folder
app.use('/public', express.static(path.join(__dirname , 'public')));
app.use('/bootstrap', express.static(path.join(__dirname , 'node_modules/bootstrap')))
app.use('/jquery', express.static(path.join(__dirname , 'node_modules/jquery')))


app.use('/', Home);
app.use('/about', About);
app.use('/products', Products);

// TO SET 404 PAGE
app.get('*', (req, res) => {
  res.render('mainTemplate', {title: 'Not found', content: 'error', error: 'Page Not Found'})
})








app.listen(app.get('port'), () => {
    console.log(`Server is running on ${app.get('port')}.`);
})