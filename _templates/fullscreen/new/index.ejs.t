---
to: src/pages/sketches/<%= name %>.tsx
---
import SketchWrapper from 'components/SketchWrapper'
import { NextPage } from 'next'
import { Draw } from 'types/CustomP5'


const <%= h.changeCase.pascal(name) %>: NextPage = () => {

  const draw: Draw = p5 => {}

  return <SketchWrapper draw={draw} />
}

export default <%= h.changeCase.pascal(name) %>
