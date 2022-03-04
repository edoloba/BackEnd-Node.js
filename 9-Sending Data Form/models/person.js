const fs = require('fs');
const path = require('path');

const getAllPersons = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../data/persons.json'), (error, data) => {
            if(error){
                reject(error) 
            } else {
                resolve(JSON.parse(data.toString()))
            }
        })
    })
}

const getPersonById = id => {
    return new Promise((resolve, reject) => {
        getAllPersons()
        .then(data => {
            let person = data.find(d => d.id ==id)
            resolve(person)
        }).catch(error => {
            reject (error)
        })
    })
}

const addPerson = person => {
    return new Promise((resolve, reject) => {
        getAllPersons()
        .then(data=> {
            data[data.length - 1]?person.id = data[data.length - 1].id + 1: person.id=0;
            
            let arr = data;
            // console.log(fd);
            arr.push(person);
            fs.writeFile(path.join(__dirname, '../data/persons.json'), JSON.stringify(data), err => {
                if(err){
                    reject(err)
                } else {
                    resolve(person)
                }
            })
        }).catch(error => reject(error))
    })
}

module.exports = {getAllPersons, getPersonById, addPerson};