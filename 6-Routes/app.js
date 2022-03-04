const express = require('express');
require('dotenv').config();
const app = express();

// import servicesRouter
const servicesRouter = require('./routes/serviceRouter')

const port = process.env.PORT || 3000;

// middleware (app.use) should be before any routes!!!
// any route will start with /service should be forwarded to servicesRouter
app.use('/services', servicesRouter);

app.get('/', (req, res) => {
    res.send('hello');
})


// app.get('/services', (req, res) => {
//     res.send('this is services page')
// })
// app.get('/services/service1', (req, res) => {
//     res.send('this is service1 page')
// })
// app.get('/services/service2', (req, res) => {
//     res.send('this is service2 page')
// })
// app.get('/services/service3', (req, res) => {
//     res.send('this is service3 page')
// })



app.listen(port, ()=> {
    console.log(`Listening on port: ${port}`);
})