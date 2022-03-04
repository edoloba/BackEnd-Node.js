/**
 * CREATE AUTHORS SCHEMA, CONNECT TO YOUR/MONGO/DB/BOOKSTORE
 * authors:
 *     1- name: String, [5,50] required
 *     2- email: String, [5,50], required
 *     3- phone: String, [4,12]
 *     4- address: {
 *                  country: String, [2,10] required
 *                  city: String, [2, 10], required
 *                 }
 */
const mongoose = require("mongoose");
require("dotenv").config();
const { Schema } = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.USER_ATLAS}:${process.env.PASSWORD_ATLAS}@cluster0.6fbrz.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB ...");
    }
  }
);

const authorsSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50, minlength: 5 },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 5,
      unique: true,
      validate: [
        (em) => {
          const EmailRegEx =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          return EmailRegEx.test(em);
        },
        "Not a valid Email",
      ],
    },
    phone: { 
      type: String, 
      maxlength: 12, 
      minlength: 4 
    },
    address: {
      country: { 
        type: String, 
        required: true, 
        maxlength: 50, 
        minlength: 2 
      },
      city: { 
        type: String, 
        required: true, 
        maxlength: 50, 
        minlength: 2 
      },
    },
  },
  { collection: "authors" }
);

const authorsModel = mongoose.model("authors", authorsSchema);

/////
/**
 * CREATE BOOKS_SCHEMA CONTAINS THE FOLLOWING:
 *     1- title: String, [max 50], required
 *     2- author: ID for AUTHOR,
 *     3- pages: Number, required,
 *     4- price: Number, required,
 *     5- description: String, required 
 *
       example for one book: {
 *     title: 'ANY',
 *     author: {
 *               name: 'ANY',
 *               email: 'ANY',
 *               address: {
 *                         country: 'ANY',
 *                         city: 'ANY'},
 *               phone: 'ANY'
 *     },
 *     }
 */

const booksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: [50, "Your title is way too long"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "authors",
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    prise: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { collection: "books" }
);

const booksModel = mongoose.model("books", booksSchema);

module.exports = {
  authorsModel,
  booksModel,
};
