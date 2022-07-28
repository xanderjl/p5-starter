import type { Vector } from 'p5'

import { P5 } from './CustomP5'

export class Mover {
  p5: P5
  location: Vector
  velocity: Vector

  constructor(p5: P5, location: Vector, velocity: Vector) {
    this.p5 = p5
    this.location = location
    this.velocity = velocity
  }

  update = () => {
    this.location.add(this.velocity)
  }

  display = () => {
    this.p5.stroke(0)
    this.p5.fill(175)
    this.p5.ellipse(this.location.x, this.location.y, 16, 16)
  }

  checkEdges = () => {
    if (this.location.x > this.p5.width) {
      this.location.x = 0
    } else if (this.location.x < 0) {
      this.location.x = this.p5.width
    }

    if (this.location.y > this.p5.height) {
      this.location.y = 0
    } else if (this.location.y < 0) {
      this.location.y = this.p5.height
    }
  }
}

export class Mover2 {
  p5: P5
  location: Vector
  velocity: Vector
  acceleration: Vector
  topSpeed: number

  constructor(
    p5: P5,
    location: Vector,
    velocity: Vector,
    acceleration: Vector
  ) {
    this.p5 = p5
    this.location = location
    this.velocity = velocity
    this.acceleration = acceleration
    this.topSpeed = 10
  }

  update = () => {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.topSpeed)
    this.location.add(this.velocity)
  }

  display = () => {
    this.p5.stroke(0)
    this.p5.fill(175)
    this.p5.ellipse(this.location.x, this.location.y, 16, 16)
  }

  checkEdges = () => {
    if (this.location.x > this.p5.width) {
      this.location.x = 0
    } else if (this.location.x < 0) {
      this.location.x = this.p5.width
    }

    if (this.location.y > this.p5.height) {
      this.location.y = 0
    } else if (this.location.y < 0) {
      this.location.y = this.p5.height
    }
  }
}

export class Mover3 {
  p5: P5
  location: Vector
  velocity: Vector
  acceleration: Vector
  topSpeed: number

  constructor(
    p5: P5,
    location: Vector,
    velocity: Vector,
    acceleration: Vector
  ) {
    this.p5 = p5
    this.location = location
    this.velocity = velocity
    this.acceleration = acceleration
    this.topSpeed = 10
  }

  update = () => {
    const mouse = this.p5.createVector(this.p5.mouseX, this.p5.mouseY)
    const dir = this.p5.constructor.Vector.sub(mouse, this.location)

    dir.normalize()
    dir.mult(0.5)

    this.acceleration = dir

    this.velocity.add(this.acceleration)
    this.velocity.limit(this.topSpeed)
    this.location.add(this.velocity)
  }

  display = () => {
    this.p5.stroke(0)
    this.p5.fill(175)
    this.p5.ellipse(this.location.x, this.location.y, 16, 16)
  }

  checkEdges = () => {
    if (this.location.x > this.p5.width) {
      this.location.x = 0
    } else if (this.location.x < 0) {
      this.location.x = this.p5.width
    }

    if (this.location.y > this.p5.height) {
      this.location.y = 0
    } else if (this.location.y < 0) {
      this.location.y = this.p5.height
    }
  }
}
export class Mover4 {
  p5: P5
  location: Vector
  velocity: Vector
  acceleration: Vector
  topSpeed: number

  constructor(p5: P5, location: Vector, velocity: Vector) {
    this.p5 = p5
    this.location = location
    this.velocity = velocity
    this.acceleration = new p5.constructor.Vector()
    this.topSpeed = 4
  }

  update = () => {
    const mouse = this.p5.createVector(this.p5.mouseX, this.p5.mouseY)
    const dir = this.p5.constructor.Vector.sub(mouse, this.location)

    dir.normalize()
    dir.mult(0.2)

    this.acceleration = dir

    this.velocity.add(this.acceleration)
    this.velocity.limit(this.topSpeed)
    this.location.add(this.velocity)
  }

  display = () => {
    this.p5.stroke(0)
    this.p5.fill(175)
    this.p5.ellipse(this.location.x, this.location.y, 16, 16)
  }

  checkEdges = () => {
    if (this.location.x > this.p5.width) {
      this.location.x = 0
    } else if (this.location.x < 0) {
      this.location.x = this.p5.width
    }

    if (this.location.y > this.p5.height) {
      this.location.y = 0
    } else if (this.location.y < 0) {
      this.location.y = this.p5.height
    }
  }
}
