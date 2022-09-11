import SketchWrapper from 'components/SketchWrapper'
import UI, { UIValue } from 'components/UI'
import { NextPage } from 'next'
import { useState } from 'react'
import { Draw, P5 } from 'types/CustomP5'
import { getDimensions } from 'util/canvasSizes'
import createGrid from 'util/createGrid'
// /hello wolrd
const CollaborationStation: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  let margin: number
  const [nScl, setNScl] = useState<number>(1000)
  const [nStr, setNStr] = useState<number>(40)
  const values: UIValue[] = [
    {
      label: 'Noise Scale',
      value: nScl,
      setValue: setNScl,
      max: 7000,
    },
    {
      label: 'Noise Strength',
      value: nStr,
      setValue: setNStr,
      max: 1000,
    },
  ]

  const particle = (
    p5: P5,
    xStart: number,
    yStart: number,
    length: number,
    nScl: number,
    nStr: number,
    speed: number
  ) => {
    let x: number = xStart
    let y: number = yStart

    p5.push()
    p5.noFill()
    p5.stroke('red')

    p5.beginShape()
    Array.from({ length }, () => {
      const a: number = p5.noise(x / nScl, y / nScl) * nStr

      p5.curveVertex(x, y)
      x += Math.cos(a) * speed
      y += Math.sin(a) * speed
    })
    p5.endShape()
    p5.pop()
  }

  const draw: Draw = p5 => {
    // settings for renderSVG
    p5.noLoop()
    // p5.clear()
    // p5.frameRate(1)

    // global draw variables
    margin = p5.width * 0.075
    const xl: number = margin
    const xr: number = p5.width - margin
    const yt: number = margin
    const yb: number = p5.height - margin
    const cx: number = p5.width * 0.5
    const cy: number = p5.height * 0.5
    const resolution: number = 0.05
    const rows: number = (p5.width - margin * 2) * resolution
    const cols: number = (p5.height - margin * 2) * resolution
    let grid: number[][] = createGrid(rows, cols)

    // // draw border
    // p5.push()
    // p5.noFill()
    // p5.rectMode('corners')
    // p5.rect(xl, yt, xr, yb)
    // p5.pop()

    // mutate grid
    grid = grid.map(([u, v]) => {
      const x: number = p5.lerp(margin, p5.width - margin, u)
      const y: number = p5.lerp(margin, p5.height - margin, v)

      return [x, y]
    })

    // draw grid points
    grid.forEach(([x, y]) => {
      particle(p5, x, y, 20, nScl, nStr, 20)
      // p5.point(x, y)
    })
    grid.forEach(([x, y]) => {
      p5.noFill()
      p5.ellipse(
        cx,
        cy,
        p5.width * ((1 / x) * 10 + 0.5),
        p5.width * ((1 / y) * 10 + 0.5)
      )
    })
    grid.forEach(([x, y]) => {
      p5.noFill()
      p5.ellipse(x, y, (1 / x) * 1000 + 0.5, (1 / y) * 1000 + 0.5)
    })
  }

  return (
    <>
      <UI values={values} />
      <SketchWrapper
        draw={draw}
        dimensions={dimensions}
        padding={padding}
        // renderSVG
      />
    </>
  )
}

export default CollaborationStation
