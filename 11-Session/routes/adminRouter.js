const express = require('express');
const { adminHome, logOut, logOutBtn } = require('../models/admin');
const router = express.Router();


router.get('/', adminHome);
//  /logout = /admin/logout
router.get('/logout', logOut)
router.post('/logout', logOutBtn)

module.exports = router;