const express = require('express');
require('dotenv').config();
const app = express();
// require express-session
const session = require('express-session')

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('views', __dirname + '/views');


// configure the session
// this data are shared between browser and server, that'why need to be encrypted
app.use(session({
    secret: 'my website',
    // time in milliseconds (5 min here)
    cookie: {maxAge: 5 * 60 * 1000}
}))

app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const generalRouter = require('./routes/generalRouter');
// const adminRouter = require('./routes/adminRouter');

app.use(generalRouter)
// app.use('/admin', adminRouter)




app.listen(app.get('port'), () => {
    console.log(`Server is runing on Port: ${app.get('port')}`);
} )