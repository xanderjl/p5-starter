import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { ColorValue, Draw, Setup } from 'types/CustomP5'

const MyNewSketch: NextPage = () => {
  const width: number = 2048
  const height: number = 2048
  const dimensions: number[] = [width, height]
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]

  const setup: Setup = p5 => {
    p5.colorMode(p5.HSB)
  }

  const draw: Draw = p5 => {
    p5.noLoop()
    // Set stroke color to white
    p5.stroke(0, 255, 255)
    p5.strokeWeight(6)
  
    // create an array with a length of TWO_PI.
    const circleArray = Array.from({ length: p5.TWO_PI * 10.1 })
  
    // For each point in the array, calculate the cartesian coordinates to draw a point.
    circleArray.forEach((_, i) => {
      const a = i * 0.1
      const r = p5.width / 3
      const x = r * Math.cos(a) + p5.width / 2
      const y = r * Math.sin(a) + p5.height / 2
  
      p5.point(x, y)
    })
  }

  return (
    <SketchWrapper
      setup={setup}
      draw={draw}
      dimensions={dimensions}
      padding={padding}
      background={background}
    />
  )
}

export default MyNewSketch
