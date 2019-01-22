import Box from '../Box'
import Matter from 'matter-js'

const { Engine, World, Bodies, Composite } = Matter

let boxIds = 0

const distance = ([x1, y1], [x2, y2]) =>
  Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)))

const Physics = (state, { touches, time }) => {
  let engine = state['physics'].engine

  Engine.update(engine, time.delta)

  return state
}

let worldBoxes = 0

const CreateBox = (state, { touches, screen }) => {
  let world = state['physics'].world
  let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075)
  let randomWidth = Math.floor(Math.random() * 80 + 20)
  let randomHeight = Math.floor(Math.random() * 80 + 20)

  // for bottom half of screen
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      if (t.event.pageY > screen.height / 2 - 100) {
        let body = Bodies.rectangle(
          t.event.pageX,
          t.event.pageY,
          randomWidth,
          randomHeight,
          { frictionAir: 0.021 }
        )
        World.add(world, [body])
        state[++boxIds] = {
          body: body,
          size: [randomWidth, randomHeight],
          color: boxIds % 2 === 0 ? '#02D5FF' : '#FF0064',
          renderer: Box
        }
      }

      worldBoxes = Object.keys(state)
    })

  return state
}

const MoveBox = (state, { touches }) => {
  let constraint = state['physics'].constraint

  // -- Handle start touch
  let start = touches.find(x => x.type === 'start')

  if (start) {
    let startPos = [start.event.pageX, start.event.pageY]

    let boxId = Object.keys(state).find(key => {
      let body = state[key].body

      return body && distance([body.position.x, body.position.y], startPos) < 25
    })

    if (boxId) {
      constraint.pointA = { x: startPos[0], y: startPos[1] }
      constraint.bodyB = state[boxId].body
      constraint.pointB = { x: 0, y: 0 }
      constraint.angleB = state[boxId].body.angle
    }
  }

  // -- Handle move touch
  let move = touches.find(x => x.type === 'move')

  if (move) {
    constraint.pointA = { x: move.event.pageX, y: move.event.pageY }
  }

  // -- Handle end touch
  let end = touches.find(x => x.type === 'end')

  if (end) {
    constraint.pointA = null
    constraint.bodyB = null
    constraint.pointB = null
  }

  return state
}

const WinCondition = (state, { touches, screen }) => {
  let world = state['physics'].world

  Object.keys(state)
    .filter(
      key =>
        state[key].body && state[key].body.position.y < screen.height / 2 - 100
    )
    .forEach(key => {
      state[key].color = 'black'
    })

  return state
}

let tossed = 0

const GarbageCollection = (state, { touches, screen }) => {
  let world = state['physics'].world

  Object.keys(state)
    .filter(
      key => state[key].body && state[key].body.position.y > screen.height
    )
    .forEach(key => {
      tossed += 1
      Composite.remove(world, state[key].body)
      delete state[key]
    })

  return state
}

export {
  Physics,
  CreateBox,
  MoveBox,
  WinCondition,
  GarbageCollection,
  worldBoxes,
  boxIds,
  tossed
}
