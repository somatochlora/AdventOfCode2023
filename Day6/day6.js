const fs = require('fs');

let data = fs.readFileSync(process.argv[2], {encoding:'utf8', flag:'r'});
let lines = data.split('\r\n');
lines = lines.map(s => {
    let vals = s.split(" ");
    vals = vals.map(v => parseInt(v));
    return vals;
})
let raceLengths = lines[0];
let records = lines[1];

const quadraticSolver = (a, b, c) => {
    let results = []
    let root = Math.sqrt(b**2 - 4*a*c);
    if (root < 0) return results;
    results.push((-b + root) / (2*a));
    results.push((-b - root) / (2*a))
    return results;
}

const getBounds = (raceLength, record) => {
    let intersections = quadraticSolver(-1, raceLength, -record);
    if (intersections.length == 0) return false;
    return [Math.ceil(intersections[0]), Math.floor(intersections[1])];
}

const countPossibilities = (raceLength, record) => {
    let bounds = getBounds(raceLength, record);
    if (!bounds) return 0;
    if (raceLength * bounds[0] - bounds[0] ** 2 == record) bounds[0] += 1;
    if (raceLength * bounds[1] - bounds[1] ** 2 == record) bounds[1] -= 1;
    return bounds[1] - bounds[0] + 1;
}

let possibilities = [];
for (let i = 0; i < raceLengths.length; i++) {
    possibilities.push(countPossibilities(raceLengths[i], records[i]));
}

console.log(possibilities);
console.log(possibilities.reduce((prev, cur) => prev * cur, 1));