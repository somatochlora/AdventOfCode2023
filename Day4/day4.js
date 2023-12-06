const fs = require('fs');

let data = fs.readFileSync(process.argv[2], {encoding:'utf8', flag:'r'});
let rows = data.split('\r\n');

let processRow = s => {
    s = s.split(": ")[1];
    let parts = s.split(" | ");
    parts = parts.map(processList)
    return parts;
}

let processList = s => {
    let ls = s.split(" ").filter(s => s.length != 0);
    ls = ls.map(s => parseInt(s));
    return ls;
}

let scoreCard = c => {
    let score = 0;
    let winners = new Set(c[0])
    for (let num of c[1]) {
        if (winners.has(num)) {
            score++;
        }
    }
    return score;
}

let calculateScore = n => {
    if (n == 0) return 0;
    return 2 ** (n - 1)
}

rows = rows.map(processRow);

scores = rows.map(scoreCard);

let sum = scores.reduce((prev, cur) => prev + calculateScore(cur), 0)
console.log(sum);

counts = Array(scores.length).fill(1);
for (let i = 0; i < counts.length; i++) {

    for (let j = i + 1; j < scores[i] + i + 1 && j < counts.length; j++) {
        counts[j] += counts[i]
    }
}
let cardsCount = counts.reduce((prev, cur) => prev + cur, 0);
console.log(cardsCount);


