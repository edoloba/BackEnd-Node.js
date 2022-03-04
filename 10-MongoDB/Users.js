const mongoose = require('mongoose');
const { Schema } = require('mongoose')

// define Schema for user collection. Second Object => define which collection we want to use inside the database
const userSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: Number, 
    phone: Number,
    age: Number
}, {collection: 'users'})

// define a model ----> first argument: NAME OF THE COLLECTION, second argument: NAME OF THE SCHEMA
const Users = mongoose.model('Users', userSchema);



module.exports = Users