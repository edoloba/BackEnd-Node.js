const express = require('express')
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
require('dotenv').config();


const port = process.env.PORT || 3000 
const app = express();


// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BookStore', (err => {
    if(err) {
        console.log(err);
    } else {
        console.log('Connected to MongoDB ...');
    }
}))

// create a Schema for user collection
const usersSchema = new Schema({
    name: {
        type: String, 
        required: true,
        minlength: [3, `Name required 3 at lest`],
        maxlength: [50, "Name must be less than 50 characters"]
    },
    email: {
        type: String, 
        required: true,
        minlength: [10, `Email  required 10 at lest`],
        maxlength: [50, "Email must be less than 50 characters"],
         // costum validator for email syntax
      validate: {
        validator: em=>{
          const EmailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/; 
          return EmailRegEx.test(em)? true: false
        },
        message:"Not a valid Email",
    }
    },
    password: {
        type: String, 
        required: true,
        minlength: [8, `Password  required 10 at lest`],
        maxlength: [20, "Password must be less than 50 characters"]
    },
    age: {
        type: Number, 
        required: true,
        min: [18, `You are too young, buddy!`],
        // custom validator even numbers only
        validate: {
            validator: n=>{
                if(n%2 === 0){
                    return true
                }else{
                    return false
                }
            },
            message: 'Age must be even only!'
        }
    },
    active: {
        type: Boolean, 
        required: false
    },
    address: {
        /*
            object, Required
                country: string, min:5, max:20, required, 
                city: string, min:5, max:20, required,
                zipCode: number, 5 digits, required

        */
        country : {
            type: String,
            minlength: [3, `Don't know any country with 3 letters`],
            maxlength: [20, 'Where do you live?'],
            required: true
        },
        city: {
            type: String,
            minlength: [2, `Don't know any city with 2 letters`],
            maxlength: [20, 'Where do you live?'],
            required: true
        },
        zipCode: {
            type: Number,
            required: true,
            validate: {
                validator: zipcode => {
                   return zipcode >= 10000 && zipcode <= 99999
                }, 
                message: 'ZipCode must be 5 digits'
            }
        }
    }
}, {collection: 'users'})

// create model for users
const usersModel = mongoose.model('users', usersSchema);
// insert one user
// let user1 = {
//     name: 'Tom',
//     email: 'tom@tom.com',
//     password: '12345678',
//     age: 42,
//     address: {
//         country: 'Brasil',
//         city: 'Rio de Janeiro',
//         zipCode: 44902
//     },
//     active: true
// }
// usersModel.create(user1, (error, data) => {
//     if(error){
//         console.log(error);
//     } else {
//         console.log(data);
//     }
// })
// looking for some data
// usersModel.find({name: "Tom"}).then(result=>{
//     console.log(result)
// }).catch(error=>{
//     console.log(error)
// });

// update: name, email, zipCode for one document
usersModel.updateOne({email: "tom@tom.com"}, {
    $set: {name: "Edited_Name", email: "@zzz@zzz.zzz", "address.zipCode": 19001}
},{
    runValidators: true
}, (error, result)=>{
    if(error){
        console.log(error.message)
    }else{
        console.log(result)
    }
})



app.listen(port, () => {
    console.log(`Server on port: ${port}`);
})
