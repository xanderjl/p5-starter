import { Color, RENDERER } from 'p5'
import { ColorValue, P5 } from 'types/CustomP5'

interface Setup {
  p5: P5
  canvasParentRef: Element
  padding?: number[]
  width?: number
  height?: number
  dimensions?: number[]
  renderer?: RENDERER
  background?: ColorValue
  pixelDensity?: number
  seed?: number
  renderSVG?: boolean
}

const setupDefaults = ({
  p5,
  canvasParentRef,
  width,
  height,
  dimensions,
  padding,
  background,
  renderer,
  pixelDensity,
  seed,
  renderSVG,
}: Setup): void => {
  const usedWidth = dimensions ? dimensions[0] : width ? width : p5.windowWidth
  const usedHeight = dimensions
    ? dimensions[1]
    : height
    ? height
    : p5.windowHeight
  const aspectRatio = usedWidth / usedHeight
  const windowRatio = p5.windowWidth / p5.windowHeight
  const paddingWidth = padding && padding.length > 0 ? padding[0] * 2 : 0
  const paddingHeight =
    padding && padding.length === 2
      ? padding[1] * 2
      : padding && padding.length === 1
      ? padding[0] * 2
      : 0
  const maxWidth = Math.round(p5.windowWidth - paddingWidth)
  const maxHeight = Math.round(p5.windowHeight - paddingHeight)

  seed && p5.randomSeed(seed)
  seed && p5.noiseSeed(seed)

  if (usedWidth > p5.windowWidth || usedHeight > p5.windowHeight) {
    if (aspectRatio > windowRatio) {
      const newHeight = Math.round(maxWidth / aspectRatio)
      p5.createCanvas(
        maxWidth,
        newHeight,
        renderSVG ? p5.SVG : renderer
      ).parent(canvasParentRef)
    } else {
      const newWidth = Math.round(maxHeight * aspectRatio)
      p5.createCanvas(
        newWidth,
        maxHeight,
        renderSVG ? p5.SVG : renderer
      ).parent(canvasParentRef)
    }
  } else {
    p5.createCanvas(
      usedWidth,
      usedHeight,
      renderSVG ? p5.SVG : renderer
    ).parent(canvasParentRef)
  }

  pixelDensity && p5.pixelDensity(pixelDensity)
  background && p5.background(background as unknown as Color)
}

export default setupDefaults
