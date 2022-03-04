require('dotenv').config()
const Mongo = require('./models/mongo');
/**
 * USING express
 * 1- create a user interface to add author using: post request, fetch/ajax in front-end
 *      post: admin/addauthor
 *      a- addAuthor.ejs >>> views
 *      c- get: admin/addauthor >> render addAuthor
 *      b- router for /admin >>> admin.js in routes folder
 */
const express = require('express')
const adminRout = require('./routes/admin');
const indexRout = require('./routes/index');
const bookRout = require('./routes/index');
const { process_params } = require('express/lib/router');
const app = express()

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.use('view', express.static(__dirname+"/views"))
// for parsing url and body for request
app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use(express.static(__dirname + '/public'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery'))


app.use('/', indexRout)
app.use('/admin', adminRout)
app.use('/book', bookRout)


app.listen(app.get('port'), ()=>console.log(`Server is running on port: ${app.get('port')}`))