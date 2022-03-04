const express = require('express');
require('dotenv').config();
// const { path } = require('express/lib/application');
const path = require('path')

const port = process.env.PORT || 3000;
const app = express();

const index = require('./routes/index');
// const persons = require('./models/persons');

app.set('view engine', 'ejs');

// use request json parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('views', express.static(path.join(__dirname, 'views')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', index);





app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
})