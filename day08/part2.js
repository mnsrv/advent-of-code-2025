const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

function euclideanDistance(x, y, z, x2, y2, z2) {
  return Math.abs(
    Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2) + (z - z2) * (z - z2)),
  )
}

let coords = []
let distances = {}

input.split('\n').forEach((line, lineIndex) => {
  const [x, y, z] = line.split(',').map(Number)
  coords.push([lineIndex, x, y, z])

  for (let i = 0; i < coords.length; i++) {
    if (i === lineIndex) continue

    const [iIndex, iX, iY, iZ] = coords[i]
    const distance = euclideanDistance(x, y, z, iX, iY, iZ)
    distances[`${lineIndex}-${iIndex}`] = distance
  }
})

const sortedDistances = Object.entries(distances).sort((a, b) => a[1] - b[1])

let connections = {}
let i = 0
let answer = 0

while (true) {
  const [key] = sortedDistances[i]
  const [a, b] = key.split('-').map(Number)
  connections[a] = [...(connections[a] || []), b]
  connections[b] = [...(connections[b] || []), a]
  i++

  let queue = [0]
  const checkedJunctions = new Set()

  while (true) {
    let junctionIndex = queue.shift()

    if (typeof junctionIndex === 'undefined') {
      break
    }

    checkedJunctions.add(junctionIndex)

    if (typeof connections[junctionIndex] === 'undefined') {
      continue
    }

    connections[junctionIndex].forEach((k) => {
      if (checkedJunctions.has(k)) return

      checkedJunctions.add(k)
      queue.push(k)
      junctionIndex++
    })
  }
  if (checkedJunctions.size === coords.length) {
    console.log(coords[a][1], coords[b][1])
    answer = coords[a][1] * coords[b][1]
    break
  }
}

console.log('Part 2: ', answer)
