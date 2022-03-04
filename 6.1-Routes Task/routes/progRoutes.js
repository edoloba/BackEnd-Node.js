const express = require('express');
require('dotenv').config();
const progRoutes = express.Router();

progRoutes.get('/', (req, res) => {
    res.send('<h1>Programming languages are here</h1>')
})
progRoutes.get('/js', (req, res) => {
    res.send('<h1>JavaScript</h1>')
})
progRoutes.get('/csharp', (req, res) => {
    res.send('<h1>C sharp</h1>')
})
progRoutes.get('/cplus', (req, res) => {
    res.send('<h1>C ++</h1>')
})
progRoutes.get('/python', (req, res) => {
    res.send('<h1>Python</h1>')
})

module.exports = progRoutes;