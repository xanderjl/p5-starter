export type PaperSize = 'A0' | 'A1' | 'A2' | 'A3' | 'A4'

export interface PaperSizes {
  [key: string]: number[]
}

// Sizes are for 96 DPI
const paperSizes: PaperSizes = {
  A0: [3179, 4494],

  A1: [2245, 3179],

  A2: [1587, 2245],

  A3: [1123, 1587],

  A4: [794, 1123],
}

export const getDimensions = (paperSize: PaperSize) => paperSizes[paperSize]
