const createGrid = (rows: number, cols: number = rows) => {
  const points: number[][] = []

  Array.from({ length: rows }, (_, u) =>
    Array.from({ length: cols }, (_, v) => {
      const x = u / (rows - 1)
      const y = v / (cols - 1)
      points.push([x, y])
    })
  )

  return points
}

export default createGrid
