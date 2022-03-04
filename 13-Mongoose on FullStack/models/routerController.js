// import emailSender
const { validationResult }= require('express-validator');
const { registerUser } = require('./db');
const emailSender = require('./emailSender');

const getHome = (req, res) => {
    res.render('index')
}

const getAbout = (req, res) => {
    res.render('about')
}

const getContact = (req, res) => {
    res.render('contact')
}

const getVideos = (req, res) => {
    res.render('videos')
}

const getRegister = (req, res) => {
    res.render('register')
}
const postRegister = (req, res) => {
    // check if posted data are valid
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({message: errors}) 
    } else {
        console.log(req.body);
        const {fname, lname, username, email, password, bDate} = req.body
        registerUser(fname, lname, username, email, password, bDate).then((result) => {
            console.log(result);
            res.json({message: 'done'})
        }).catch(error => {
            res.json({message: error.number})
            console.log(error);
        })
    }
}

const postContact = (req, res) => {
    console.log(req.body);
    emailSender.sendEmail(req.body).then((info) => {
        console.log(info);
        res.json({result: 'done'})
    }).catch(error => {
        console.log(error);
        res.json({result: 'error'})
    })
}
module.exports = {
    getHome,
    getAbout,
    getContact,
    postContact,
    getVideos,
    getRegister,
    postRegister
}