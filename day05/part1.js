const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

let count = 0

const freshIngredients = []

input.split('\n').forEach((line) => {
  if (line.includes('-')) {
    let [start, end] = line.split('-').map(Number)
    freshIngredients.push([start, end])
  } else if (line.length > 0) {
    const number = Number(line)
    if (freshIngredients.some(([min, max]) => number >= min && number <= max)) {
      count++
    }
  }
})
console.log('Part 1: ', count)
