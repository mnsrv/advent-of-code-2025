import fs from 'fs';

// Read the input file
const input = fs.readFileSync('./day01/input.txt', 'utf8');

let start = 50
let count = 0

function rotate(start, direction, steps) {
    let result;
    if (direction === 'L') {
        result = (start - steps) % 100;
    } else {
        result = (start + steps) % 100;
    }
    // Ensure result is always 0-99 even for negative values
    return (result + 100) % 100;
}


input.split('\n').forEach(line => {
    let direction = line[0];
    let steps = Number(line.slice(1));
    start = rotate(start, direction, steps);
    console.log(direction, steps, start);
    if (start === 0) {
        count++;
    }
});

console.log("Part 1: ", count)
