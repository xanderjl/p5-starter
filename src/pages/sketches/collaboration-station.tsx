import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Draw } from 'types/CustomP5'
import { getDimensions } from 'util/canvasSizes'

const CollaborationStation: NextPage = () => {
  const dimensions: number[] = getDimensions('A4')
  const padding: number[] = [40]
  let margin: number

  const draw: Draw = p5 => {
    // settings for renderSVG
    p5.clear()
    p5.frameRate(1)

    // global draw variables
    margin = p5.width * 0.075
    const xl: number = margin
    const xr: number = p5.width - margin
    const yt: number = margin
    const yb: number = p5.height - margin
    const cx: number = p5.width * 0.5
    const cy: number = p5.height * 0.5

    // draw border
    p5.push()
    p5.noFill()
    p5.rectMode('corners')
    p5.rect(xl, yt, xr, yb)
    p5.pop()

    p5.ellipse(cx, cy, p5.width * 0.33, p5.width * 0.33)
  }

  return (
    <SketchWrapper
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      renderSVG
    />
  )
}

export default CollaborationStation
