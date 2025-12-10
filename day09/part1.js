const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

function getArea(x, y, x2, y2) {
  return (Math.abs(x - x2) + 1) * (Math.abs(y - y2) + 1)
}

let coordinates = []

let maxArea = 0

input.split('\n').forEach((line) => {
  const [x, y] = line.split(',').map(Number)
  coordinates.forEach((coordinate) => {
    const area = getArea(x, y, coordinate[0], coordinate[1])
    if (area > maxArea) {
      maxArea = area
    }
  })
  coordinates.push([x, y])
})

console.log('Part 1: ', maxArea)
