import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import type { Color, Graphics } from 'p5'
import { ColorValue, Draw, P5, Setup } from 'types/CustomP5'
import convertSeed from 'util/convertSeed'
import createGrain from 'util/createGrain'
import createGrid from 'util/createGrid'

const CollaborationStation: NextPage = () => {
  const dimensions: number[] = [1000, 1000]
  const padding: number[] = [40]
  const background: ColorValue = [0]
  let margin: number
  let grid: number[][]
  const resolution: number = 0.03
  const phrase: string = `reddit was a mistake`
  const seed: number = convertSeed(phrase)
  const nScl: number = 2400
  const nStr: number = 40
  let grain: Graphics

  const initialColor = Math.floor(Math.random() * 16777215)
  // TODO: Create two initial colors and fill the array
  // with those baseline varitions
  const shiftNumber = 50000

  const colorShifts = [
    `#${Math.min(
      initialColor + Math.floor(Math.random() * shiftNumber),
      16777215
    )
      .toString(16)
      .padStart(6, '0')}88`,
    `#${Math.min(
      initialColor + Math.floor(Math.random() * shiftNumber),
      16777215
    )
      .toString(16)
      .padStart(6, '0')}88`,
    `#${Math.min(
      initialColor + Math.floor(Math.random() * shiftNumber),
      16777215
    )
      .toString(16)
      .padStart(6, '0')}88`,
    `#${Math.min(
      initialColor + Math.floor(Math.random() * shiftNumber),
      16777215
    )
      .toString(16)
      .padStart(6, '0')}88`,
    `#${Math.min(
      initialColor + Math.floor(Math.random() * shiftNumber),
      16777215
    )
      .toString(16)
      .padStart(6, '0')}88`,
    `#${Math.min(
      initialColor + Math.floor(Math.random() * shiftNumber),
      16777215
    )
      .toString(16)
      .padStart(6, '0')}88`,
  ]

  const particle = (
    p5: P5,
    xStart: number,
    yStart: number,
    length: number,
    nScl: number,
    nStr: number,
    speed: number,
    borders: [number, number, number, number]
  ) => {
    let x: number = xStart
    let y: number = yStart
    const color: string =
      colorShifts[Math.floor(Math.random() * colorShifts.length)]

    p5.push()
    p5.noStroke()
    p5.fill(color)

    Array.from({ length }, () => {
      const a: number = p5.noise(x / nScl, y / nScl) * nStr
      const d: number = p5.map(
        p5.noise(a),
        0,
        1,
        p5.width * 0.0001,
        p5.width * 0.009
      )
      const inBounds: boolean =
        x > borders[0] && x < borders[1] && y > borders[2] && y < borders[3]

      inBounds && p5.ellipse(x, y, d, d)

      x += Math.cos(a) * speed
      y += Math.sin(a) * speed
    })
    p5.pop()
  }

  const setup: Setup = p5 => {
    grain = createGrain(p5)
    margin = p5.width * 0.075
    const rows: number = (p5.width - margin * 2) * resolution
    const cols: number = (p5.height - margin * 2) * resolution

    grid = createGrid(rows, cols)

    // mutate grid
    grid = grid.map(([u, v]) => {
      const x: number = p5.lerp(margin, p5.width - margin, u)
      const y: number = p5.lerp(margin, p5.height - margin, v)

      return [x, y]
    })
  }

  const draw: Draw = p5 => {
    p5.noLoop()
    p5.background(background)

    // global styles
    p5.noFill()

    // global draw variables
    margin = p5.width * 0.075
    const xl: number = margin
    const xr: number = p5.width - margin
    const yt: number = margin
    const yb: number = p5.height - margin
    const cx: number = p5.width * 0.5
    const cy: number = p5.height * 0.5

    // draw grid points
    grid.forEach(([x, y]) => {
      const length: number = Math.floor(p5.random(10, 20))
      // const speed: number = p5.random(6, 12)
      const speed: number = p5.map(p5.noise(x / nScl, y / nScl), 0, 1, 6, 24)
      particle(p5, x, y, length, nScl, nStr, speed, [xl, xr, yt, yb])
      p5.push()
      p5.stroke('white')
      p5.ellipse(x, y, (1 / x) * 1000 + 0.5, (1 / y) * 1000 + 0.5)
      p5.pop()
    })

    p5.push()
    grid.forEach(([x, y], i) => {
      const strokeWeight: number = p5.map(i, 0, grid.length, 0.1, 2)
      p5.strokeWeight(strokeWeight)
      const stroke: number | number[] =
        p5.random(1) > 0.5
          ? p5.map(i, 0, grid.length, 200, 255)
          : [
              (x / (p5.width - margin)) * 255,
              (y / (p5.height - margin)) * 255,
              125.5,
            ]

      p5.stroke(stroke as unknown as Color)

      p5.ellipse(
        cx,
        cy,
        p5.width * ((1 / x) * 10 + 0.5),
        p5.width * ((1 / y) * 10 + 0.5)
      )
    })
    p5.pop()

    // overlays
    p5.image(grain, 0, 0, p5.width, p5.height)
  }

  return (
    <SketchWrapper
      setup={setup}
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
      seed={seed}
    />
  )
}

export default CollaborationStation
