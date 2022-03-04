
const fs = require('fs')
// to make terminal as in\output
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// rl.question('please enter your first name:\n', firstName=>{
//     rl.question('please enter your last name:\n', lastName=>{
//         console.log(`Your fullname is ${firstName} ${lastName}`)
//         process.exit()
//     })
// })
/**
 * 1- let the user enter the following data:
 *      a- first name
 *      b- last name
 *      c- age (18- 100) number
 *      d- grades (0==>100)
 * 2- create an Object with this data
 *      {firstName:"", lastName:"", age:20, grades:56}
 * 3- display the object in Terminal
 * 4- store (append) this object to students.json file
 * 5- display all students records from the file
 * 6- kill the process
 */

 function getEntry(message) {
    return new Promise((resolve, reject) => {
      rl.question(message, data => {
        if(data === 'exit') {
          reject('closed by the user')
        } else {
          resolve(data);
        }
      })
    })
  }


  function save(obj) {
    const jsonText = fs.readFileSync('student.json', 'utf8');
    let arr;
    if(jsonText.trim() === '') {
      arr = [];
    } else {
      arr = JSON.parse(jsonText);
    }
    // add the obj to arr
    arr.push(obj);
    fs.writeFileSync('student.json', JSON.stringify(arr));
    return arr;
  }

  async function ask() {
    try {
      const firstName = await getEntry('enter your first name\n');
      const lastName = await getEntry('enter your last name\n');
      // validate age --do-while loop will let the user repeat to input the right age till it meet our condition without killing the process and let the user tart again from beginning
      let age;
      let ageCounter = 0;
      do {
        if(ageCounter === 5) { //we give a x times to enter the right age, after that we kill the process
          console.log('You entered your age too many times, check your ID please');
          process.exit();
        } 
        age = await getEntry('enter your age\n');
        ageCounter++
      } while 
      (age < 18 || age > 100 || isNaN(age)) 
      
     
      // validate grade --> without do/while loop if the input is wrong it will just kill the process.
      const grade = await getEntry('enter your grade\n');
      if(grade < 0 || grade > 100 || isNaN(grade)) {
          console.log('too many grades');
          process.exit();
      }
      // create an obj with the input from the user
      const obj = {
        firstName,
        lastName,
        age,
        grade
      }
      console.log(obj)
      const allData = save(obj);
      console.log(allData)
      process.exit();
    } catch (error) {
      console.log(error);
      process.exit();
    }
}

ask()