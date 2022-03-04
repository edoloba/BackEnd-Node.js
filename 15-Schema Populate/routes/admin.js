
const MongoDB = require('../models/mongo')
const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()



router.get('/addauthor', (req, res)=>{
    res.render('addAuthor')
})

router.post('/addauthor', (req, res)=>{
    // req.body
    // store the author
    const data = req.body;
    // push country and city into address (as in the Schema)
    data.address = {
        country: req.body.country,
        city: req.body.city
    }
    MongoDB.authorsModel.create(data).then(result => {
        res.json({success: 'Author saved!', result: result})
    }).catch(err => {
        res.json({error: err.message})
    })
})


// addBook route
router.get('/addbook', (req, res)=> {
    // getting all authors
    MongoDB.authorsModel.find({}, (error, authors) => {
        if(error) {
            res.json(error)
        } else {
            res.render('addBook', {authors: authors})
        }
    })
})

// add new book
router.post('/addbook', (req, res)=> {
    console.log(req.body);
    MongoDB.booksModel.create({...req.body, author: new mongoose.Types.ObjectId(req.body.author)})
    .then(result => {
       res.json({success: `Book "${req.body.title}" was added with success`, result: result})
    }).catch(error => {
       res.json({error: error.message})
    })
})


module.exports = router