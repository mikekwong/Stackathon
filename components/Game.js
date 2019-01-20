import React, { Component } from 'react'
import { Dimensions, AppRegistry, StyleSheet, StatusBar } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { styles } from './stylesheet/styles'
import Box from './entities/Box'
import Circle from './entities/Circle'
import { circle, rect, PopulateCircles } from './Utils'

import Matter from 'matter-js'

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

const circle1 = circle(200, 120, circleSize)
const circle2 = circle(200, 290, circleSize)
const circle3 = circle(200, 460, circleSize)

const newBox = rect(
  width / 2,
  height / 2,
  boxSize, // width
  boxSize // height
)

const floor = rect(width / 2, 910, width, boxSize, true, 0)
const leftWall = rect(-40, 0, minWidth, height * 2, true)
const rightWall = rect(440, 50, minWidth, height * 2, true)

const floor1 = rect(
  width / 2 - 50,
  180,
  width / 1.5,
  20,
  true,
  Math.PI * 0.06,
  0.001
)
const floor2 = rect(
  width / 2 - 50,
  350,
  width / 1.5,
  20,
  true,
  Math.PI * 0.06,
  0.0005
)
const floor3 = rect(
  width / 2 - 50,
  520,
  width / 1.5,
  20,
  true,
  Math.PI * 0.06,
  0
)

// This creates a new Physics engine, it's a controller that manages updating the simulation of the world
const engine = Engine.create()

// this will create a world that will contain all simulated bodies and constraints
const world = engine.world

// Now add our box and floor to the world, taking in two params: a world, and an array of Matter.Bodies
World.add(world, [
  circle1,
  circle2,
  circle3,
  newBox,
  floor,
  floor1,
  floor2,
  floor3,
  leftWall,
  rightWall
])

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
          circle1: {
            body: circle1,
            size: [circleSize * 2, circleSize * 2],
            color: '#FF5733',
            renderer: Circle
          },
          circle2: {
            body: circle2,
            size: [circleSize * 2, circleSize * 2],
            color: '#FF5733',
            renderer: Circle
          },
          circle3: {
            body: circle3,
            size: [circleSize * 2, circleSize * 2],
            color: '#FF5733',
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
            angle: 0,
            renderer: Box
          },
          floor1: {
            body: floor1,
            size: [width / 1.5, 40],
            color: '#33DDFF',
            angle: Math.PI * 0.06,
            renderer: Box
          },
          floor2: {
            body: floor2,
            size: [width / 1.5, 40],
            color: '#33DDFF',
            angle: Math.PI * 0.06,
            renderer: Box
          },
          floor3: {
            body: floor3,
            size: [width / 1.5, 40],
            color: '#33DDFF',
            angle: Math.PI * 0.06,
            renderer: Box
          },
          leftWall: {
            body: leftWall,
            size: [minWidth, height * 2],
            color: 'green',
            angle: 0,
            renderer: Box
          },
          rightWall: {
            body: rightWall,
            size: [minWidth, height * 2],
            color: 'green',
            angle: 0,
            renderer: Box
          }
        }}
      />
    )
  }
}

AppRegistry.registerComponent('Game', () => Game)
