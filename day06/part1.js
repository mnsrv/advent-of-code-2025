const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const lines = input.split('\n')

const operators = lines[lines.length - 1].split(' ').filter(Boolean)
let numbers = operators.map((operator) => {
  if (operator === '+') {
    return 0
  }
  return 1
})

lines.slice(0, -1).forEach((line) => {
  const result = line.split(' ').filter(Boolean).map(Number)
  numbers = numbers.map((number, index) => {
    const operator = operators[index]
    if (operator === '+') {
      return number + result[index]
    }
    return number * result[index]
  })
})

console.log(
  'Part 1: ',
  numbers.reduce((a, b) => a + b, 0),
)
