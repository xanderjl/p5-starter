## What Is This Project?

This project is an attempt to be an accessible, low barrier to entry sketchbook for generative art. The styling is minimal, and the rest of the opinionated pieces _should_ be largely abstracted away.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Create a New Sketch

This project leverages the power of [hygen](https://www.hygen.io/) to do all of the tedious heavy lifting for you. There are two templates to get you started.

### Fullscreen:

```zsh
yarn new:sketch:fullscreen <sketch_name>

# eg
yarn new:sketch:fullscreen mandelbrot-set
```

### Square:

```zsh
yarn new:sketch:square <sketch_name>

# eg
yarn new:sketch:square archimedean-spiral
```

Either of these commands will drop a new `<sketch_name>.tsx` file into `./src/pages/sketches` for you.

The flow would look something like

```zsh
yarn new:sketch:square my-new-sketch
```

```ts
// ./src/pages/sketches/my-new-sketch.tsx
import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { ColorValue, Draw } from 'types/CustomP5'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]

const draw: Draw = p5 => {}

const MyNewSketch: NextPage = () => (
  <SketchWrapper
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default MyNewSketch
```

You can navigate to this sketch by either finding it in the list of sketches on the landing page at `http://localhost:3000` or you could navigate to `http://localhost:3000/sketches/my-new-sketch`

## How Do I Work With p5 in This Environment?

You can treat any of your sketch pages as if you were writing a p5 sketch in [instance mode](https://www.youtube.com/watch?v=Su792jEauZg). 

### Setup

Let's assume you wanted to change the default colorMode of this sketch with a setup function. What might that look like?

```tsx
import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { ColorValue, Draw, Setup } from 'types/CustomP5'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
const background: ColorValue = [255, 253, 252]

const setup: Setup = p5 => {
  p5.colorMode(p5.HSB)
}

const draw: Draw = p5 => {}

const MyNewSketch: NextPage = () => (
  <SketchWrapper
    setup={setup}
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default MyNewSketch
```

We define a `setup` arrow function and perform whatever logic we'd like. We then need to pass that function to the `setup` prop in the `<SketchWrapper />` component. There is _a lot_ going on under the hood of the `<SketchWrapper />` that offers you some strong defaults. Maintaining the ratio of your sketch as you resize the window, being able to save sketches with `cmd + s` or `ctrl + s` depening on your OS, etc. **This functionality won't be overwritten by passing in new props**. You'd need to specifically override what these utility functions are doing. To get a feel for what's going on there, you can take a look in `./src/util/defaults`.

Note how there's a custom `Setup` type that offers a nice DX through intellisense. Most common p5 functions have their own custom type definition, but in the event you need to add your own, there's also a `P5Function` type that you're able to extend to suit your needs.

### Draw

Let's draw a circle of points in our new sketch.

```tsx
import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { ColorValue, Draw, Setup } from 'types/CustomP5'

const width: number = 2048
const height: number = 2048
const dimensions: number[] = [width, height]
const padding: number[] = [40]
// Change background color to black (in HSB).
const background: ColorValue = [0, 0, 0]

const setup: Setup = p5 => {
  p5.colorMode(p5.HSB)
}

const draw: Draw = p5 => {
  p5.noLoop()
  // Set stroke color to white
  p5.stroke(0, 0, 255)
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

const MyNewSketch: NextPage = () => (
  <SketchWrapper
    setup={setup}
    draw={draw}
    dimensions={dimensions}
    padding={padding}
    background={background}
  />
)

export default MyNewSketch
```

I've done my best to add comment to show what's going on in the draw function, but the important takeaways are this: We are creating an array with the length of `TWO_PI` to two decimal places (mutliplied by `10.1` to account for a weird rounding error). Within that array, we are using the index of a `forEach()` loop to generate our angle. We create an arbitrary radius based on the canvas' size, and then convert those polar coordinates to cartesian by using `Math.cos()` and `Math.sin()`. Then all we have to do is plot a point with those `x` and `y` values to give us our circle of dots!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [react-p5](https://github.com/Gherciu/react-p5)
- [p5js Documentation](https://p5js.org/reference/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
