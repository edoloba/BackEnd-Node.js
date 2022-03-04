const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    let obj = {
        name: 'Edo',
        age: 32,
        married: false,
        skills: ['HTML', 'CSS', 'JavaScript'],
        address: {
            country: 'Germany',
            street: 'Sonnenallee',
            city: 'Berlin',
            zip: 12047
        }
    }
    res.render('content/index', obj)
})








module.exports = router