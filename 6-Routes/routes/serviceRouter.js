const express = require('express');


const servicesRouter = express.Router();

// root(/) will be /services => exchange empty routes(/) with /services route
servicesRouter.get('/', (req, res) => {
    res.send('this is services page');
})

servicesRouter.get('/service1', (req, res) => {
    res.send('this is service1 page')
})
servicesRouter.get('/service2', (req, res) => {
    res.send('this is service2 page')
})
servicesRouter.get('/service3', (req, res) => {
    res.send('this is service3 page')
})

module.exports = servicesRouter;