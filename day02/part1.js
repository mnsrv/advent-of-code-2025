import fs from 'fs';

// Read the input file
const input = fs.readFileSync('./day02/input.txt', 'utf8');

let sum = 0

function isValid(n) {
    const num = n.toString();
    const length = num.length;
    if (length % 2 === 1) {
        return true;
    }
    const middle = Math.floor(length / 2);
    const left = num.slice(0, middle);
    const right = num.slice(middle);
    return left !== right;
}

input.split(',').forEach(line => {
    let [start, end] = line.split('-').map(Number);
    for (let i = start; i <= end; i++) {
        if (!isValid(i)) {
            sum += i;
        }
    }
});

console.log(sum);
