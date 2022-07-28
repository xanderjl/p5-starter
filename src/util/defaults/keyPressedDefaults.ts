import { Color } from 'p5'
import { KeyboardEvent } from 'react'
import { ColorValue, P5 } from 'types/CustomP5'

export interface KeyPressed {
  p5: P5
  event: KeyboardEvent
  os: string
  fileName: string
  seed?: number
  width?: number
  dimensions?: number[]
  background?: ColorValue
  renderSVG?: boolean
}

const keyPressed = ({
  p5,
  event,
  os,
  fileName,
  seed,
  width,
  dimensions,
  background,
  renderSVG,
}: KeyPressed) => {
  if (os === 'mac') {
    if (event.key === 's' && event.metaKey) {
      event.preventDefault()
      seed && p5.randomSeed(seed)
      seed && p5.noiseSeed(seed)
      const ratio =
        ((dimensions && dimensions[0]) ?? width ?? p5.width) / p5.width
      p5.pixelDensity(ratio)
      background && p5.background(background as unknown as Color)
      p5.draw()
      renderSVG ? p5.save(fileName) : p5.saveCanvas(fileName, 'png')
    }
  } else {
    if (event.key === 's' && event.ctrlKey) {
      event.preventDefault()
      seed && p5.randomSeed(seed)
      seed && p5.noiseSeed(seed)
      const ratio =
        ((dimensions && dimensions[0]) ?? width ?? p5.width) / p5.width
      p5.pixelDensity(ratio)
      background && p5.background(background as unknown as Color)
      p5.draw()
      renderSVG ? p5.save(fileName) : p5.saveCanvas(fileName, 'png')
    }
  }
}

export default keyPressed
