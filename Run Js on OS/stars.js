// this file accept 3 arguments
// 1. the charact (* x etc)
// 2. number(rows)
// 3. number(columns)

let args = process.argv.slice(2);

let ch = args[0];
let rows = args[1];
let columns = args[2];

/**
 * 
 * @param {*} character 
 * @param {*} rows 
 * @param {*} columns 
 */
function createStars(character = 'x', rows = 2, columns = 2) {
     let str = '';
     for(let j = 0; j < rows; j++) {
         for(let i = 0; i < columns; i++){
             str += character;
         }
         str += '\n' //new line start
     }
     console.log(str)
}
createStars(ch, rows, columns)