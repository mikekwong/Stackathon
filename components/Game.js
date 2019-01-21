import React, { Component, Fragment } from 'react'
import { Text, Dimensions, AppRegistry, StyleSheet } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { Physics, CreateBox, MoveBox, garbageCollection } from './Systems'
import Box from './Box'
import Matter from 'matter-js'

export default class Game extends Component {
  constructor () {
    super()
    this.state = {
      currentCount: 0,
      intervalId: 0
    }
  }
  // const minWidth = 50
  // // make box size at fraction of maximum screen size // trunc removes fractions
  // const boxSize = Math.trunc(Math.max(width, height) * 0.075)
  // const circleSize = 30

  // const Physics = (entities, { time }) => {
  //   let engine = entities['physics'].engine
  //   Engine.update(engine, time.delta)
  //   return entities
  // }

  // const circle1 = circle(200, 120, circleSize)
  // const circle2 = circle(200, 290, circleSize)
  // const circle3 = circle(200, 460, circleSize)

  // const newBox = rect(
  //   width / 2,
  //   height / 2,
  //   boxSize, // width
  //   boxSize // height
  // )

  // const floor = rect(width / 2, 910, width, boxSize, true, 0)
  // const leftWall = rect(-40, 0, minWidth, height * 2, true)
  // const rightWall = rect(440, 50, minWidth, height * 2, true)

  // const floor1 = rect(
  //   width / 2 - 50,
  //   180,
  //   width / 1.5,
  //   20,
  //   true,
  //   Math.PI * 0.06,
  //   0.001
  // )
  // const floor2 = rect(
  //   width / 2 - 50,
  //   350,
  //   width / 1.5,
  //   20,
  //   true,
  //   Math.PI * 0.06,
  //   0.0005
  // )
  // const floor3 = rect(
  //   width / 2 - 50,
  //   520,
  //   width / 1.5,
  //   20,
  //   true,
  //   Math.PI * 0.06,
  //   0
  // )

  // // This creates a new Physics engine, it's a controller that manages updating the simulation of the world
  // const engine = Engine.create()

  // // this will create a world that will contain all simulated bodies and constraints
  // const world = engine.world

  // // Now add our box and floor to the world, taking in two params: a world, and an array of Matter.Bodies
  // World.add(world, [
  //   circle1,
  //   circle2,
  //   circle3,
  //   newBox,
  //   floor,
  //   floor1,
  //   floor2,
  //   floor3,
  //   leftWall,
  //   rightWall
  // ])

  render () {
    const {
      Engine,
      World,
      Bodies,
      Body,
      Events,
      Composite,
      Constraint
    } = Matter

    const { width, height } = Dimensions.get('screen')
    const boxSize = Math.trunc(Math.max(width, height) * 0.075)

    const engine = Engine.create({ enableSleeping: false })
    const world = engine.world
    const body = Bodies.rectangle(width / 2, -1000, boxSize, boxSize, {
      frictionAir: 0.021
    })
    // const line = Bodies.rectangle(100, 600, width, 1, { isStatic: true })
    const floor = Bodies.rectangle(
      width / 2,
      height - boxSize / 2,
      width / 2,
      boxSize,
      { isStatic: true }
    )
    const constraint = Constraint.create({
      label: 'Drag Constraint',
      pointA: { x: 0, y: 0 },
      pointB: { x: 0, y: 0 },
      length: 0.01,
      stiffness: 0.1,
      angularStiffness: 1
    })

    World.add(world, [body, floor])
    World.addConstraint(world, constraint)

    return (
      <Fragment>
        <Text style={{ fontSize: 20, left: 190, top: 80 }}>Timer</Text>
        <GameEngine
          // style={styles.container}
          systems={[Physics, CreateBox, MoveBox, garbageCollection]}
          entities={{
            physics: { engine: engine, world: world, constraint: constraint },
            // line: {
            //   body: line,
            //   size: [width, 1],
            //   color: 'red',
            //   renderer: Box
            // },
            box: {
              body: body,
              size: [
                Math.floor(Math.random() * 40),
                Math.floor(Math.random() * 40)
              ],
              color: 'black',
              renderer: Box
            },
            floor: {
              body: floor,
              size: [width / 2, boxSize],
              color: '#00D5FF',
              renderer: Box
            }
          }}
        />
      </Fragment>
    )
  }
}

AppRegistry.registerComponent('Game', () => Game)
