const fs = require('fs');

let data = fs.readFileSync(process.argv[2], {encoding:'utf8', flag:'r'});

let parseRound = s => {
    let counts = s.split(', ')
        .map(s => s.split(' '));
    let red = blue = green = 0;
    for (let count of counts) {
        if (count[1] == 'red') red = parseInt(count[0]);
        else if (count[1] == 'green') green = parseInt(count[0]);
        else if (count[1] == 'blue') blue = parseInt(count [0]);
        else throw new Error("wrong label!");
    }
    return [red, green, blue];
}

let parseGame = s => {
    rounds = s.split("; ");
    return rounds.map(parseRound);
}

let possibleRound = (round, maximums) => {
    for (let j = 0; j < 3; j++) {
        if (round[j] > maximums[j]) return false;
    }
    return true;
}

let possibleGame = (game, maximums) => {
    for (let round of game) {
        if (!possibleRound(round, maximums)) return false
    }
    return true;
}

let gameMinimum = game => {
    let minimums = [0, 0, 0];
    for (let round of game) {
        for (let i = 0; i < 3; i++){
            minimums[i] = Math.max(round[i], minimums[i]);
        }    
    }
    return minimums;
}

let gamePower = game => {
    let minimums = gameMinimum(game);
    return minimums[0] * minimums[1] * minimums[2];
}

let games = data.split('\r\n');
games = games.map(s => s.split(": ")[1])
    .map(parseGame);

let sum = 0;
let powerSum = 0;
let maximums = [12,13,14]
for (let i = 0; i < games.length; i++) {
    if (possibleGame(games[i], maximums)) sum += i + 1;
    powerSum += gamePower(games[i]);
}

console.log(sum);
console.log(powerSum);

