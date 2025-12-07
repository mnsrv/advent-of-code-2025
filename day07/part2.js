const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

let beams = []

input.split('\n').reduce((prev, line) => {
  let nextLine = line.split('')
  let newBeams = new Array(nextLine.length).fill(0)

  for (let i = 0; i < prev.length; i++) {
    if (prev[i] === 'S') {
      nextLine[i] = '|'
      newBeams[i] = 1
    }
    if (prev[i] === '|') {
      if (line[i] === '^') {
        nextLine[i - 1] = '|'
        nextLine[i + 1] = '|'
        newBeams[i - 1] += beams[i]
        newBeams[i + 1] += beams[i]
      } else {
        nextLine[i] = '|'
        newBeams[i] += beams[i]
      }
    }
  }
  beams = newBeams
  return nextLine.join('')
})

console.log(
  'Part 2: ',
  beams.reduce((a, b) => a + b, 0),
)
