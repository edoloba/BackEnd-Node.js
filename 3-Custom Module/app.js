// import module from other file
 
// destructuring 

const {toLocal, getCurrentDate} = require('./models/date');
console.log(getCurrentDate());
console.log(toLocal());

// with new object

// const date = require('./model.date');
// console.log(date.getCurrentDate());
// console.log(date.toLocal());

const {email, emailPass, sqlUser} = require('./models/config');
const {hash} = require('./models/passwordManager')
console.log(email);
hash('12345678').then(hashedPass => {
    console.log(hashedPass);
}).catch(error => {
    console.log(error)
}) 