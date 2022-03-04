const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3000;
const path = require('path')
const app = express();
const os = require('os');

const index = require('./routes');
const performance = require('./routes/performance');


// set view engine
app.set('view engine', 'ejs');
// set views folder
app.use('views', express.static(path.join(__dirname, 'views')));
// set public folder
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/performance', performance);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})