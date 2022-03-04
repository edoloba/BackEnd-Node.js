const mongoose = require('mongoose');
// const { Schema } = require('mongoose');
const Users = require('./Users')

// to CONNECT TO THE DATABASE
mongoose.connect('mongodb://localhost/BookStore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, 
// CALLBACK NOT NECESSARY BECAUSE IT WILL BE RUN IN THE NEXT CODE (mongoose.connection.on())
() => {
    console.log("MongoDb Connected ...");
})

mongoose.connection.on('open', () => {
   console.log('MongoDb Connected ...');
}).on('error', (error) => {
    console.log(error);
})

// // define Schema for user collection. Second Object => define which collection we want to use inside the database
// const userSchema = new Schema({
//     name: String,
//     surname: String,
//     email: String,
//     password: Number, 
//     phone: Number,
//     age: Number
// }, {collection: 'users'})

// // define a model ----> first argument: NAME OF THE COLLECTION, second argument: NAME OF THE SCHEMA
// const Users = mongoose.model('Users', userSchema);


// insert new user, if one value is not the same to an obj already exits
// check if email exists
Users.find({email: "ryan@air.me"}).then(u => {
    if(u.length > 0){
        console.log(`Email exists already`);
    } else {
        Users.create({
            name: 'Ryan',
            surname: "Air", 
            email: "ryan@air.me", 
            password: 34528, 
            phone: 889977, 
            age: 22 }).then(p => {
                console.log(p);
            }).catch(err => {
                console.log(err);
            });
    }
}).catch(err => {
    console.log(err);
})


Users.findOneAndUpdate({email: 'black@paul.com'}, {$set: {email: 'black@alan.com'}}).then(u=> {
    console.log(u);
}).catch(err => {
    console.log(err);
})

// GET ALL DATA FROM USER
Users.find().then(u => {
    console.log(u);
}).catch(err => {
    console.log(err);
})
