import fs from 'fs';

// Read the input file
const input = fs.readFileSync('./day02/input.txt', 'utf8');

let sum = 0

function isValidByDiv(n, div) {
    const num = n.toString();
    const length = num.length;
    if (length % div === 1) {
        return true;
    }
    const size = length / div;
    const first = num.slice(0, size);
    for (let i = 1; i < div; i++) {
        const current = num.slice(i * size, (i + 1) * size);
        if (current !== first) {
            return true;
        }
    }
    return false;
}

function isValid(n) {
    const num = n.toString();
    const length = num.length
    for (let i = 2; i <= length; i++) {
        if (!isValidByDiv(n, i)) {
            return false;
        }
    }
    return true;
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
