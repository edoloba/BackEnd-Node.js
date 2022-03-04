const express = require('express');
const path = require('path')
const { append } = require('express/lib/response');
// import express-fileupload npm library
const fileUpload = require('express-fileupload')
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())


// use express-fileupload as a middleware(will check out any request is gonna be send)
app.use(fileUpload({
    limits: {fileSize: 2 * 1024 * 1024},
    // this will def not let upload more than the size mentioned
    abortOnLimit: true
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index')
});
app.post('/savedata', (req, res) => {
    console.log(req.body);
    console.log(req.files);
    // save the file inside public folder
    req.files.userImage.mv(path.join(__dirname, 'public', req.files.userImage.name))
    .then(() => {
        res.json('done')
    }).catch((error) => {
        res.json(error.message)
    })
})



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})