import React, { Component } from 'react'
import { Dimensions, AppRegistry, StyleSheet, StatusBar } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { styles } from './stylesheet/styles'
import Box from './entities/Box'
import Circle from './entities/Circle'
import { circle, rect, PopulateCircles } from './Utils'

import Matter from 'matter-js'
// import MatterAttractors from 'matter-attractors'

// // Continue to apply forces on bodies
// Matter.use(MatterAttractors)

const { Engine, World, Bodies, Body, Events, Composite } = Matter

const { width, height } = Dimensions.get('screen')
const minWidth = 50
// make box size at fraction of maximum screen size // trunc removes fractions
const boxSize = Math.trunc(Math.max(width, height) * 0.075)
const circleSize = 30

const Physics = (entities, { time }) => {
  let engine = entities['physics'].engine
  Engine.update(engine, time.delta)
  return entities
}

const newCircle = circle(200, 100, circleSize)

const newBox = rect(
  width / 2,
  height / 2,
  boxSize, // width
  boxSize // height
)

const floor = rect(width / 2, 910, width, boxSize, true)
const leftWall = rect(-40, 0, minWidth, height * 2, true)
const rightWall = rect(440, 50, minWidth, height * 2, true)

// This creates a new Physics engine, it's a controller that manages updating the simulation of the world
const engine = Engine.create()

// this will create a world that will contain all simulated bodies and constraints
const world = engine.world

// Now add our box and floor to the world, taking in two params: a world, and an array of Matter.Bodies
World.add(world, [newCircle, newBox, floor, leftWall, rightWall])

export default class Game extends Component {
  render () {
    return (
      <GameEngine
        style={styles.container}
        systems={[Physics]}
        entities={{
          // add our engine and world to our list of entities in the GameEngine component
          physics: {
            engine: engine,
            world: world
          },
          newCircle: {
            body: newCircle,
            size: [circleSize, circleSize],
            color: 'red',
            renderer: Circle
          },
          newBox: {
            body: newBox,
            size: [boxSize, boxSize],
            color: 'red',
            renderer: Box
          },
          floor: {
            body: floor,
            size: [width, boxSize],
            color: 'green',
            renderer: Box
          },
          leftWall: {
            body: leftWall,
            size: [minWidth, height * 2],
            color: 'green',
            renderer: Box
          },
          rightWall: {
            body: rightWall,
            size: [minWidth, height * 2],
            color: 'green',
            renderer: Box
          }
        }}
      />
    )
  }
}

AppRegistry.registerComponent('Game', () => Game)
