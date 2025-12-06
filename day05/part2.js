const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const ingredients = []

input.split('\n').forEach((line) => {
  if (line.includes('-')) {
    let [start, end] = line.split('-').map(Number)
    ingredients.push([start, end])
  }
})
ingredients.sort((a, b) => a[0] - b[0])

const reducedIngredients = ingredients.reduce((acc, [start, end]) => {
  if (acc.length === 0) {
    return [[start, end]]
  }
  const prevStart = acc[acc.length - 1][0]
  const prevEnd = acc[acc.length - 1][1]
  if (start <= prevEnd) {
    return [...acc.slice(0, -1), [prevStart, Math.max(end, prevEnd)]]
  }
  return [...acc, [start, end]]
}, [])

const count = reducedIngredients.reduce(
  (acc, [start, end]) => acc + (end - start + 1),
  0,
)

console.log('Part 2: ', count)
