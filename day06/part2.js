const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const lines = input.split('\n')

const operators = lines[lines.length - 1].split(' ').filter(Boolean)
const lengths = lines[lines.length - 1].split(' ').reduce((acc, l) => {
  if (l === '') {
    return [...acc.slice(0, -1), acc[acc.length - 1] + 1]
  } else {
    return [...acc, 1]
  }
}, [])

const worksheet = lines.slice(0, -1).reduce((acc, line) => {
  let result = []
  let temp = ''
  let currIndex = 0
  let skipIndex = -1
  for (let i = 0; i < line.length; i++) {
    if (skipIndex === i) {
      continue
    }
    temp += line[i]

    if (temp.length === lengths[currIndex]) {
      result.push(temp)
      temp = ''
      currIndex++
      skipIndex = i + 1
    }
  }
  const col = result.map((r) => {
    return r.split('')
  })
  if (acc.length === 0) {
    return col
  }
  return acc.map((c, i) => {
    return c.map((n, j) => {
      return n + col[i][j]
    })
  })
}, [])

const answer = operators.map((operator, index) => {
  const numbers = worksheet[index].map(Number)

  if (operator === '+') {
    return numbers.reduce((a, b) => a + b, 0)
  }
  return numbers.reduce((a, b) => a * b, 1)
})

console.log(
  'Part 2: ',
  answer.reduce((a, b) => a + b, 0),
)
