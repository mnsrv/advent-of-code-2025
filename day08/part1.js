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

const CONNECTIONS_COUNT = 1000

let connections = {}

for (let i = 0; i < CONNECTIONS_COUNT; i++) {
  const [key] = sortedDistances[i]
  const [a, b] = key.split('-').map(Number)
  connections[a] = [...(connections[a] || []), b]
  connections[b] = [...(connections[b] || []), a]
}

const checkedJunctions = new Set()
let queue = [0]

let connectedKeys = Object.keys(connections)

let circuits = []
let circuitIndex = 0

while (true) {
  let i = queue.shift()

  if (typeof i === 'undefined') {
    circuitIndex++
    i = connectedKeys.shift()
    if (typeof i === 'undefined') {
      break
    }
  }

  circuits[circuitIndex] = [...(circuits[circuitIndex] || []), Number(i)]

  connections[i].forEach((key) => {
    if (checkedJunctions.has(key)) return

    checkedJunctions.add(key)
    queue.push(key)
    i++
  })

  connectedKeys = connectedKeys.filter((key) => key !== i)
}

circuits = circuits.map((circuit) => new Set(circuit).size)
circuits = circuits.sort((a, b) => b - a)

console.log('Part 1: ', circuits[0] * circuits[1] * circuits[2])
