const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const MongoDB = require("../models/mongo");

// getting HomePage(index)
router.get("/", (req, res) => {
  MongoDB.booksModel
    .find()
    .populate("author")
    .then((books) => {
      res.render("index", { books: books });
    })
    .catch((error) => {
      res.render("error", { error: error.message });
    });
});

// book example after populating with authors model
/**
 * title: ANY,
 * author: {
 *          name: ANY,
 *          email: ANY,
 *          address: {
 *                     country: ANY,
 *                     city: ANY
 *                    },
 *          phone: ANY,
            },
    page: ANY,
    price: ANY,
    description: ANY
 * }
 */

// CREATE ROUTE FOR EACH BOOK
router.get("/books/:bookid", (req, res) => {
  console.log(req.params.bookid);
  MongoDB.booksModel
    .findById(req.params.bookid)
    .populate("author")
    .then((book) => {
      res.render("book", { book: book });
    })
    .catch((error) => {
      res.render("error", { error: error.message });
    });
});

// fro the search bar
router.get("/search", (req, res) => {
  // res.json(req.query)
  // search in Book title for something like the title
  console.log(req.query);
  MongoDB.booksModel
    .find({ title: { $regex: req.query.title } })
    .populate("author")
    .then((result) => {
      res.render("search", { books: result });
    })
    .catch((error) => {
      res.render("error", { error: error.message });
    });
});

router.get("/searchajax", (req, res) => {
  MongoDB.booksModel
    .find({ title: { $regex: req.query.title } })
    .populate("author")
    .then((result) => {
      console.log(result);
      res.json({ success: true, books: result });
    })
    .catch((error) => {
      res.render({ success: false, error: error.message });
    });
});

router.get("/books", (req, res) => {
  // find all books by author' (req.query.body)
  MongoDB.booksModel
    .find({ 'author': mongoose.Types.ObjectId(req.query.author) })
    .populate("author")
    .exec((error, books) => {
      if (error) {
        res.render("error", { error: error.message });
      } else {
        res.render("index", { books: books });
      }
    });
});

// getting authors on search
router.post("/getauthors", (req, res) => {
  MongoDB.authorsModel
    .find()
    .then((data) => {
      res.json({ success: true, authors: data });
    })
    .catch((error) => {
      res.json({ success: false, error: error.message });
    });
});

module.exports = router;
