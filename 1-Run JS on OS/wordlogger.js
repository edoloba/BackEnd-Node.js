// this file accepts 3 args:
// 1.the word
// 2.iteration/counter
// 3. speed(in ms)

// hint setInterval
let args = process.argv.slice(2)

let word = args[0];
let count = 0;

const repeat = setInterval(() => {
    console.log(args[0])
   count ++;
   if(count === Number(args[1])){
       process.exit(0)//Kill he process in node.js (KILL THE WHOLE PROGRAMME)
    //    clearInterval(repeat)
   }
}, Number(args[2]))

