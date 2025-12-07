const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

let count = 0

input.split('\n').reduce((prev, line) => {
  let nextLine = line.split('')

  for (let i = 0; i < prev.length; i++) {
    if (prev[i] === 'S') {
      nextLine[i] = '|'
    }
    if (prev[i] === '|') {
      if (line[i] === '^') {
        nextLine[i - 1] = '|'
        nextLine[i + 1] = '|'
        count++
      } else {
        nextLine[i] = '|'
      }
    }
  }
  return nextLine.join('')
})

console.log('Part 1: ', count)
