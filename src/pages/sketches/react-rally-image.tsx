import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { ColorValue, Draw, Setup } from 'types/CustomP5'

const MyNewSketch: NextPage = () => {
  const width: number = 1200
  const height: number = 600
  const dimensions: number[] = [width, height]
  const padding: number[] = [40]
  const background: ColorValue = '#e9e0f0'

  const seen: { [key: string]: boolean } = {}

  let img: { height: number; width: number } = { height: 0, width: 0 }
  let xoff: number = 0.0

  const colors: any = []

  const setup: Setup = p5 => {
    p5.colorMode(p5.HSB)
    p5.background('#e9e0f0')
    p5.strokeWeight(4)
    p5.background('#2b2135')
    p5.textFont('Vidaloka')

    img = p5.loadImage('/ReactRallyLogo.png', img => {
      for (let y = 0; y < img.height; y += 1) {
        for (let x = 0; x < img.width; x += 1) {
          const c = p5.color(img.get(x, y))
          colors.push(c)
        }
      }
    })

    p5.frameRate(10)
    p5.describe(
      'A message that says React 2023 with Render ATL written with React Rally written in moving dots and 1/2 of a React logo written in dots that appear to fade in. '
    )
    // TODO: There is a floating 👋🏾 emoji that is easing its way across the background behind the text, growing and shrinking.
  }

  function drawSymbols(p5) {
    p5.textSize(12)

    for (let y = 0; y < img.height; y += 15) {
      for (let x = 0; x < img.width; x += 12) {
        const current = colors[x + y * img.width]

        const bright =
          (p5.red(current) + p5.green(current) + p5.blue(current)) / 3
        let mx = p5.map(x, 0, img.height, 0, height)
        let my = p5.map(y, 0, img.width, 0, width)

        if (!seen[bright]) {
          seen[bright] = true
          console.log('seen', seen)
        }

        if (bright >= 106 && x > 600) {
          p5.textSize(p5.map(p5.random(), 0, 1, 10, 25))
          xoff = xoff + 0.01

          p5.text('.', mx, my)
        } else if (bright >= 106) {
          p5.fill('#7c99eb')
          p5.textSize(20 * (x * 0.003))
          p5.text('.', mx, my)
          // reset fill and text size
          p5.textSize(12)
          p5.fill('#c0def1')
        }
      }
    }
  }

  const draw: Draw = p5 => {
    p5.clear()
    p5.background('#2b2135')
    p5.fill('#e9e0f0')
    // drawHandWave()
    drawSymbols(p5)
    //drawSubtitle()
  }

  return (
    <SketchWrapper
      setup={setup}
      draw={draw}
      //dimensions={dimensions}
      padding={padding}
      background={background}
    />
  )
}

export default MyNewSketch
