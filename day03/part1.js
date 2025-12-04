const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

let sum = 0

input.split('\n').forEach((line) => {
  const firstNum = Math.max(...line.slice(0, -1).split('').map(Number))
  const firstNumIndex = line.indexOf(firstNum.toString())
  const secondNum = Math.max(
    ...line
      .slice(firstNumIndex + 1)
      .split('')
      .map(Number),
  )
  sum += firstNum * 10 + secondNum
})

console.log('Part 1: ', sum)
