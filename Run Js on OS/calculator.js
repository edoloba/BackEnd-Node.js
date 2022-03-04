//accept 3 arguments:
// 1. number
// 2. operator (+, -, x, etc)
// 3. number 

// output should be the result

let args = process.argv.slice(2);
let firstNumber = Number(args[0]);
let secondNumber = Number(args[2]);
let operator = args[1];

console.log(eval(`${firstNumber}${operator}${secondNumber}`))