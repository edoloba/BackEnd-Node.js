const express = require('express');
require('dotenv').config();
const routes = require('./routes/routes');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use('/experiences', routes);

app.get('/home', (req, res) => {
    res.send('<h1>This is the home</h1>');
})
app.get('/about', (req, res) => {
    res.send('<h1>This is the about</h1>');
})

// dynamic way
app.get('/services/:service/:number', (req, res)=> {
    const {service, number} = req.params
    res.send(`<h1>This is ${service} ${number} page</h1>`)
})

app.get('/response', (req, res) => {
    // REDIRECT res.redirect('url')
    // res.redirect('https://wwww.soundcloud.com/edolov')
   
    // SEND JSON FILE res.json(object)
    // const obj = {
    //     prop1: 1,
    //     prop2: 'text',
    //     prop3: true
    // }
    // res.json(obj)
    
    // SEND PATH TO FILE
    res.sendFile(path.join(__dirname, 'README.md'))

    // res.render(view file name) ==> later on 

})

// TASK 3
app.get('/page1', (req, res) => {
    res.redirect('/page2')
})
app.get('/page2', (req, res) => {
    res.redirect('/page1')
})
// solution: "This page isn't working" because TOO MANY REDIRECTION 


app.listen(port, () => {
    console.log(`Running on port: ${port}`);
})