/**
 * in mongoose:
 * 1- connect to MongoDb school database
 * 2- create collection students with fllowing fields:
 *      a- name: String [5, 20] required
 *      b- email: String [12, 50] required email expression
 *      c- matrik_id: String [6], required, first two letters and the rest is numbers, unique ex: RB5692
 *      d- class_id: Number [less than 100] required
 *      e- skills: Array of Strings (not required)
 *      f- address: Object
 *               1- Country = String [2, 20] required
 *               2- City = String [5, 20] required
 *               3- Street = String [5, 20] not required 
 *      g- age = Number, [12,18] required
 */

const mongoose = require('mongoose');
const  { Schema } = require('mongoose');

mongoose.connect('mongodb://localhost:27017/school', (err => {
    if(err) {
        console.log(err);
    } else {
        console.log('Connected to MongoDB ...');
    }
}))

const studentSchema = new Schema({
    name: {
        type: String,
        minlength: [5, 'Name too short'],
        maxlength: [20, 'Name too long'],
        required: true
    },
    email: {
        type: String,
        minlength: [12, 'Email too short'],
        maxlength: [50, 'Email too long'],
        required: true,
        validate: {
            validator: em=>{
              const EmailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/; 
              return EmailRegEx.test(em)? true: false
            },
            message:"Not a valid Email",
    }
    },
    matrik_id: {
        type: String,
        length: [6, 'Matik_id must be 6 character'],
        validate: {
            validator: matrik => {
                const RegEx = (/[a-zA-Z]{2}[0-9]+/);
                return RegEx.test(matrik) 
                
            },
            message: 'matrik_id not valid'
        },
        unique: true,
        required: true
    },
    class_id: {
        type: Number,
        max: 100,
        required: true
    },
    skills:  {
        type: [{// for each item inside
            type: String,
            minlength: 2,
            maxlength: 10
        }], // for the all array
        validate: [
            (arr)=>arr.length<=3,
           `Should be less than 3 items`
        ]
    },
    address: {
        country: {
            type: String,
            minlength: [2, 'Country too short'],
            maxlength: [20, 'Country too long'],
            required: true
        },
        city: {
            type: String,
            minlength: [5, 'City too short'],
            maxlength: [20, 'City too long'],
            required: true
        },
        street: {
            type: String,
            minlength: [5, 'Street too short'],
            maxlength: [20, 'Street too long'],
            required: true
        }
    },
    age: {
        type: Number,
        min: 12,
        max: 18,
        required: true
    }
})

const studentModel = mongoose.model('students', studentSchema);
let student1 = {
    name: 'Edoardo',
    email: 'edoardo@edoardo.edoardo',
    matrik_id: 'EE1234',
    class_id: 44,
    address: {
        country: 'Italy',
        city: 'Jesolo',
        street: 'Via Polipo'
    },
    age: 16
}

studentModel.create(student1, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
})