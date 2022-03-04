// THIS ROUTS WILL BE USE FOR NOT AUTHENTICATION ROUTES (page where we don´t need to be log in to view them)

const express = require('express');

const router = express.Router();

const {logIn, logInPost} = require('../models/general');
const adminRouter = require('./adminRouter')

router.get('/', logIn);
router.get('/login', logIn);
router.post('/login', logInPost)

router.use('/admin', adminRouter)

module.exports = router