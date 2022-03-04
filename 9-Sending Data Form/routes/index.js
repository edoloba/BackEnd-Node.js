const express = require('express'); 
const router = express.Router();
const Persons = require('../models/person')

// const persons = [{
//     id: 0,
//     name: 'Ahmad', 
//     age: 30
// }, {
//     id: 1,
//     name: 'Rami', 
//     age: 38
// },{
//     id: 2,
//     name: 'Paul', 
//     age: 27
// }]

router.get('/', (req, res) => {
    res.send(req.url)
})
router.get('/persons', (req, res) => {
    Persons.getAllPersons()
    .then(persons => {
       res.render('index', {data: persons})
    })
    .catch(error => {
       res.json(error);
    })
})

router.get('/persons/:id', (req, res) => {
    let id = req.params.id;
    // let person = persons.find(elem => elem.id == id);
    // res.render('person', {person: person});
    Persons.getPersonById(id)
    .then(person => {
       res.render('person', {person: person});
    })
    .catch(error => {
        res.json(error)
    })
})

router.get('/add', (req, res) => {
    res.render('add')
})

router.post('/add', (req, res)=> {
    Persons.addPerson(req.body).then(()=> {
        res.redirect('/persons')
    }).catch(error => {
        res.json(error);
    })
    // console.log(req.body);
})

// router.get('/about', (req, res) => {
//     res.send(req.url)
// })

// router.get('/about/:id', (req, res) =>{
//     // res.send(req.url);
//     // it ill display whatever we write in the url DIRECTLY after /about/
//     res.send(req.params['id']); 
// })




module.exports = router