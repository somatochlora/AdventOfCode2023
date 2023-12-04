
const fs = require('fs');

let data = fs.readFileSync(process.argv[2], {encoding:'utf8', flag:'r'});

let firstAndLastNumeral = s => {
    let digits = s.match(/\d/g)
    return digits[0] + digits[digits.length - 1]
}

let result = 
    data.split("\r\n")
        .map(firstAndLastNumeral)
        .map(s => parseInt(s))
        .reduce((prev, cur) => prev + cur, 0);

console.log(result)

let key = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

// this is stupid but it works
for (let i = 0; i < 10; i++) {
    data = data.replaceAll(key[i], key[i] + i + key[i]);
}

result = 
    data.split("\r\n")
        .map(firstAndLastNumeral)
        .map(s => parseInt(s))
        .reduce((prev, cur) => prev + cur, 0);

console.log(result)
