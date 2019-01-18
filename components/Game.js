import React, { Component } from 'react'
import { Dimensions, AppRegistry, StyleSheet, StatusBar } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { styles } from './stylesheet/styles'
import Box from './entities/Renderers'
import Matter from 'matter-js'

const { width, height } = Dimensions.get('screen')
// make box size at fraction of maximum screen size // trunc removes fractions
const boxSize = Math.trunc(Math.max(width, height) * 0.075)
const initialBox = Matter.Bodies.rectangle(
  width / 2,
  height / 2,
  boxSize, // width
  boxSize // height
)

// call matter api
const floor = Matter.Bodies.rectangle(
  width / 2,
  height - boxSize / 2,
  width,
  boxSize,
  { isStatic: true }
)

// This creates a new Physics engine, it's a controller that manages updating the simulation of the world
const engine = Matter.Engine.create({ enableSleeping: false })
// this will create a world that will contain all simulated bodies and constraints
const world = engine.world

// Now add our box and floor to the world, taking in two params: a world, and an array of Matter.Bodies
Matter.World.add(world, [initialBox, floor])

// Add systems to our game engine that will update our engine and game state, otherwise nothing will move. Systems will be an array of functions, that will be called on every game tick. (see systems in class)
// Physics function
const Physics = (entities, { time }) => {
  let engine = entities['physics'].engine
  Matter.Engine.update(engine, time.delta)
  return entities
}

// functionality to create boxes
let boxIds = 0
// This gets called in systems
const CreateBox = (entities, { touches, screen }) => {
  let world = entities['physics'].world
  let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075)
  // for each action made which is a touch
  // in that area generate a new rectangle in the world
  // alternate the color of the boxes generated
  touches
    .filter(t => t.type === 'press')
    .map(t => {
      let body = Matter.Bodies.rectangle(
        t.event.pageX,
        t.event.pageY,
        boxSize,
        boxSize,
        { frictionAir: 0.011, restitution: 0.8 } // restitution enables friction bounce
      )
      Matter.World.add(world, [body])
      // details of boxes generated ++ allows boxes to increment
      entities[++boxIds] = {
        body: body,
        size: [boxSize, boxSize],
        color: boxIds % 2 == 0 ? 'pink' : '#B8E986',
        renderer: Box
      }
    })
  return entities
}

export default class Game extends Component {
  render () {
    return (
      <GameEngine
        style={styles.container}
        systems={[Physics, CreateBox]}
        entities={{
          // add our engine and world to our list of entities in the GameEngine component
          physics: {
            engine: engine,
            world: world
          },
          initialBox: {
            body: initialBox,
            size: [boxSize, boxSize],
            color: 'red',
            renderer: Box
          },
          floor: {
            body: floor,
            size: [width, boxSize],
            color: 'green',
            renderer: Box
          }
        }}
      />
    )
  }
}

AppRegistry.registerComponent('Game', () => Game)
