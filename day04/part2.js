const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

let sum = 0
let toBeRemoved = []
let go = true

const grid = input.split('\n').map((row) => row.split(''))

function isRollOfPaper(i, j) {
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length) {
    return false
  }
  return grid[i][j] === '@'
}

function getAdjacentCells(i, j) {
  return [
    // top left
    [i - 1, j - 1],
    // top
    [i - 1, j],
    // top right
    [i - 1, j + 1],
    // left
    [i, j - 1],
    // right
    [i, j + 1],
    // bottom left
    [i + 1, j - 1],
    // bottom
    [i + 1, j],
    // bottom right
    [i + 1, j + 1],
  ]
}

while (go) {
  input.split('\n').forEach((line, index) => {
    for (let j = 0; j < line.length; j++) {
      if (!isRollOfPaper(index, j)) {
        continue
      }
      let count = 0
      const adjacentCells = getAdjacentCells(index, j)
      adjacentCells.forEach((cell) => {
        if (isRollOfPaper(cell[0], cell[1])) {
          count++
        }
      })
      if (count < 4) {
        toBeRemoved.push([index, j])
      }
    }
  })
  if (toBeRemoved.length === 0) {
    go = false
    break
  }
  toBeRemoved.forEach((cell) => {
    grid[cell[0]][cell[1]] = '.'
  })
  sum += toBeRemoved.length

  toBeRemoved = []
}

console.log('Part 2: ', sum)
