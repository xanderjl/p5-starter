import fs from 'fs/promises'
import path from 'path'

const getSketches = async () => {
  const sketchesDir = path.join(process.cwd(), '/src/pages/sketches')
  const fileArray = await fs.readdir(sketchesDir)
  const sketches = fileArray.map(file => {
    return path.parse(file).name.split('.')[0]
  })

  return sketches
}

export default getSketches
