const fs = require('fs');

let data = fs.readFileSync(process.argv[2], {encoding:'utf8', flag:'r'});
let rows = data.split('\r\n');

let processRow = row => {
    row = row + ".1";
    let nums = [];
    let num = 0;
    let pos = -1;
    let startPos = -1;
    let rx = /\d/g;
    while (((match = rx.exec(row)) != null)) {
        if (startPos == -1) startPos = match.index; 
        if (match.index > pos + 1) {
            if (pos != -1) { 
                nums.push({
                    val: num,
                    start: startPos,
                    end: pos,
                })
            };
            pos = match.index;
            startPos = pos;
            num = parseInt(match[0]);
        } else {
            num = num * 10 + parseInt(match[0]);
            pos = match.index;
        }
    }
    return nums;
}

let checkBox = (map, top, left, right) => {
    let rx = /[\*\#\$\=\%\+\&\/\-\@]/
    for (let row = top; row <= top + 2; row++) {
        if (row < 0 || row >= map.length) continue;
        for (let col = left; col <= right; col++) {
            if (col < 0 || col >= map[0].length) continue;
            if (rx.test(map[row][col])) return true;
        }
    }
    return false;
}

let checkGear = (map, top, left, right) => {
    let rx = /\*/
    let gears = [];
    for (let row = top; row <= top + 2; row++) {
        if (row < 0 || row >= map.length) continue;
        for (let col = left; col <= right; col++) {
            if (col < 0 || col >= map[0].length) continue;
            if (rx.test(map[row][col])) gears.push([row,col]);
        }
    }
    return gears;
}

numbers = rows.map(processRow);

let gearMap = new Map()
let sum = 0;
for (let row = 0; row < rows.length; row++) {
    for (let num of numbers[row]) {
        if (checkBox(rows, row - 1, num.start - 1, num.end + 1)) {
            sum += num.val;
        }
        let gears = checkGear(rows, row - 1, num.start - 1, num.end + 1);
        gears.forEach(gear => {
            let key = gear[0] + "_" + gear[1]
            if (gearMap.has(key)) {
                gearMap.set(key, gearMap.get(key).concat([num.val]))
            } else {
                gearMap.set(key, [num.val])
            }
        });
    }
}

let gearSum = 0;
gearMap.forEach(ls => {
    if (ls.length == 2) gearSum += (ls[0] * ls[1])
})

console.log(sum);
console.log(gearSum);
