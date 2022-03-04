const express = require('express');
const progRoutes = require('./progRoutes');
const routes = express.Router();

routes.use('/programming-languages', progRoutes);

routes.get('/', (req, res) => {
    res.send('<h1>My experiences page</h1>')
})
routes.get('/frontend', (req, res) => {
    res.send(`<h1>This is the frontend page</h1>`)
});
routes.get('/backend', (req, res) => {
    res.send('<h1>This is the backend page</h1>');
});
// routes.get('/programming-languages', (req, res) => {
//     res.send('<h1>Programming languages are here</h1>');
// })


module.exports = routes