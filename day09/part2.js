const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

function getArea(x1, y1, x2, y2) {
  return (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1)
}

// Based upon https://kishimotostudios.com/articles/aabb_collision/
function isIntersecting(x1, y1, x2, y2, edges = []) {
  const minX = Math.min(x1, x2)
  const maxX = Math.max(x1, x2)
  const minY = Math.min(y1, y2)
  const maxY = Math.max(y1, y2)

  return edges.some((edge) => {
    const edgeMinX = Math.min(edge.x1, edge.x2)
    const edgeMaxX = Math.max(edge.x1, edge.x2)
    const edgeMinY = Math.min(edge.y1, edge.y2)
    const edgeMaxY = Math.max(edge.y1, edge.y2)

    return (
      minX < edgeMaxX && maxX > edgeMinX && minY < edgeMaxY && maxY > edgeMinY
    )
  })
}

let coordinates = []
let areas = []
let edges = []

const lines = input.split('\n')

lines.forEach((line, lineIndex) => {
  const [x1, y1] = line.split(',').map(Number)
  const nextPointIndex = lines.length > lineIndex + 1 ? lineIndex + 1 : 0
  const [x2, y2] = lines[nextPointIndex].split(',').map(Number)
  edges.push({ x1, y1, x2, y2 })

  coordinates.forEach((coordinate) => {
    const area = getArea(x1, y1, coordinate[0], coordinate[1])
    areas.push({ area, x1, y1, x2: coordinate[0], y2: coordinate[1] })
  })
  coordinates.push([x1, y1])
})

areas.sort((a, b) => b.area - a.area)

const maxArea =
  areas.find(
    (area) => !isIntersecting(area.x1, area.y1, area.x2, area.y2, edges),
  )?.area || 0

console.log('Part 2: ', maxArea)
