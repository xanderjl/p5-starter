import type { Color } from 'p5'
import { ColorValue, P5 } from 'types/CustomP5'

const linearGradient = (
  p5: P5,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  c1: ColorValue,
  c2: ColorValue
) => {
  let ctx = p5.drawingContext as CanvasRenderingContext2D
  let gradient = ctx.createLinearGradient(x1, y1, x2, y2)
  gradient.addColorStop(0, p5.color(c1 as unknown as Color).toString())
  gradient.addColorStop(1, p5.color(c2 as unknown as Color).toString())

  ctx.fillStyle = gradient
}

export default linearGradient
