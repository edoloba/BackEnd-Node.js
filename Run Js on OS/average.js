// function foo(e) {
//     console.log(e)
// }
// foo(4);

console.log(process.argv)
// process.arv ------> [array of all arguments passed on the file]
console.log(process.argv.slice(2))
let args = process.argv.slice(2);

function average() {
    // let argLength = Object.keys(arguments).length
    // console.log(argLength)
    // let valArg = Object.values(arguments);
    // console.log(valArg)
    // let sumArg = 
    // console.log(sumArg)
    // let x = sumArg / argLength;
    // console.log(x)
    
    // let argLength = Object.keys(arguments).length;
    let argumentsLength = args.length;
    let sum = 0
    // Object.keys(arguments).forEach(key => {
    //     // console.log(arguments[key])
    //     sum += arguments[key];
    // })
    args.forEach(arg => {
        sum += Number(arg)
    })
    console.log(sum / argumentsLength)
}

average()

