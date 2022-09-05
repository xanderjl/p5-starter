const convertSeed = (seedPhrase: string): number => {
  const bufferArray = Buffer.from(seedPhrase, 'utf-8')
  let value: number = 0

  bufferArray.forEach((_, i) => {
    value = value + bufferArray[i]
  })

  return value
}

export default convertSeed
