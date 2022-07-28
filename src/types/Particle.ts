import type { Vector } from 'p5'

import { P5 } from './CustomP5'

export class Particle {
  p5: P5
  pos: Vector
  vel: Vector
  acc: Vector
  maxSpeed: number
  prevPos: Vector

  constructor(p5: P5, vector: Vector) {
    this.p5 = p5
    this.pos = p5.createVector(
      p5.random(p5.windowWidth),
      p5.random(p5.windowHeight)
    )
    // @ts-ignore
    this.vel = vector.random2D()
    this.acc = this.p5.createVector(0, 0)
    this.maxSpeed = 3.5
    this.prevPos = this.pos.copy()
  }

  follow = (force: Vector) => {
    this.useTheForce(force)
  }

  update = () => {
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  useTheForce = (force: Vector) => {
    this.acc.add(force)
  }
  // visualization of drawn lines
  show = () => {
    const r = this.p5.random(60, 140)
    const b = this.p5.random(0, 140)
    this.p5.stroke(r, 0, b, 5)
    this.p5.strokeWeight(2)
    this.p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
    this.updatePrev()
  }

  updatePrev = () => {
    this.prevPos.x = this.pos.x
    this.prevPos.y = this.pos.y
  }

  edges = () => {
    if (this.pos.x > this.p5.width) {
      this.pos.x = 0
      this.updatePrev()
    }
    if (this.pos.x < 0) {
      this.pos.x = this.p5.width
      this.updatePrev()
    }
    if (this.pos.y > this.p5.height) {
      this.pos.y = 0
      this.updatePrev()
    }
    if (this.pos.y < 0) {
      this.pos.y = this.p5.height
      this.updatePrev()
    }
  }
}
