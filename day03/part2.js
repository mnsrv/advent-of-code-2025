const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

let sum = 0

input.split('\n').forEach((line) => {
  const digits = 12

  let number = 0
  let startIndex = 0
  let endIndex = line.length - digits + 1
  for (let i = 0; i < digits; i++) {
    const list = line.slice(startIndex, endIndex)
    const n = Math.max(...list.split('').map(Number))
    const nIndex = list.indexOf(n.toString())
    startIndex = startIndex + nIndex + 1
    endIndex = endIndex + 1
    number = number * 10 + n
  }
  sum += number
})

console.log('Part 2: ', sum)
