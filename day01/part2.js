import fs from 'fs';

// Read the input file
const input = fs.readFileSync('./day01/input.txt', 'utf8');

let start = 50
let count = 0

function rotate(start, direction, steps) {
    let result = start;
    let zeroCrossings = 0;

    for (let i = 0; i < steps; i++) {
        if (direction === 'L') {
            result--;
            if (result === -1) {
                result = 99;
            }
        } else {
            result++;
            if (result === 100) {
                result = 0;
            }
        }
        if (result === 0) {
            zeroCrossings++;
        }
    }
    
    return { result, zeroCrossings };
}


input.split('\n').forEach(line => {
    let direction = line[0];
    let steps = Number(line.slice(1));
    const { result, zeroCrossings } = rotate(start, direction, steps);
    start = result;
    count += zeroCrossings;
    console.log(direction, steps, start, `crossed zero ${zeroCrossings} times`);
});

console.log("Part 2: ", count)
