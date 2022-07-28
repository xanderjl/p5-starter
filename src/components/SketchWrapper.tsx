import { Box } from '@chakra-ui/react'
import useGetOs from 'hooks/useGetOs'
import dynamic from 'next/dynamic'
import { RENDERER } from 'p5'
import { ComponentClass, FC } from 'react'
import { SketchProps } from 'react-p5'
import {
  ColorValue,
  KeyPressed,
  MouseClicked,
  P5,
  Setup,
  WindowResized,
} from 'types/CustomP5'
import {
  keyPressedDefaults,
  setupDefaults,
  windowResizedDefaults,
} from 'util/defaults'

export interface SketchWrapperProps
  extends Omit<SketchProps, 'keyPressed' | 'mouseClicked' | 'setup'> {
  setup?: Setup
  keyPressed?: KeyPressed
  mouseClicked?: MouseClicked
  windowResized?: WindowResized
  suffix?: string | number
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

const Sketch = dynamic<SketchWrapperProps>(
  () =>
    import('react-p5').then(mod => {
      require('p5.js-svg')

      return mod.default
    }) as Promise<ComponentClass<SketchWrapperProps, any>>,
  {
    ssr: false,
  }
)

const SketchWrapper: FC<SketchWrapperProps> = ({
  setup,
  windowResized,
  keyPressed,
  suffix,
  padding,
  width,
  height,
  dimensions,
  renderer,
  background,
  pixelDensity,
  seed,
  renderSVG,
  ...rest
}) => {
  const os = useGetOs()

  const defaultSetup: Setup = (p5, canvasParentRef) => {
    setupDefaults({
      p5,
      canvasParentRef,
      width,
      height,
      dimensions,
      background,
      padding,
      renderer,
      renderSVG,
      seed,
      pixelDensity,
    })
    setup && setup(p5, canvasParentRef)
  }

  const defaultWindowResized = (p5: P5) => {
    windowResizedDefaults({
      p5,
      width,
      height,
      dimensions,
      padding,
      background,
      seed,
    })
    windowResized && windowResized(p5)
  }
  const date = new Date().toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const fileName = date + (suffix ? `-${suffix}` : '')

  const defaultKeyPressed: KeyPressed = (p5, event) => {
    keyPressedDefaults({
      p5,
      event,
      os,
      fileName,
      seed,
      width,
      dimensions,
      background,
      renderSVG,
    })
    keyPressed && keyPressed(p5, event)
  }
  return (
    <Box
      css={{
        '&:first-of-type': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          minHeight: '100vh',
        },
        '.p5Canvas': {
          boxShadow: '1px 3px 6px -1px rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <Sketch
        setup={defaultSetup}
        windowResized={defaultWindowResized}
        keyPressed={defaultKeyPressed}
        {...rest}
      />
    </Box>
  )
}

export default SketchWrapper
