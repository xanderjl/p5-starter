import type P5Types from 'p5'
import { KeyboardEvent, MouseEvent } from 'react'

export type P5Function = (p5: P5) => void

export type ColorValue = string | number | number[]

export type Setup = (p5: P5, canvasParentRef: Element) => void

export type KeyPressed = (p5: P5, e: KeyboardEvent) => void

export type WindowResized = P5Function

export type Draw = P5Function

export type MouseClicked = (p5: P5, e: MouseEvent) => void

export interface WeightedColor {
  weight: number
  value: ColorValue
}

export interface P5 extends P5Types {
  constructor: { [key: string]: any }
  SVG?: any
}
