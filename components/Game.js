import React, { Component, Fragment } from 'react'
import { Text, Dimensions, AppRegistry, StyleSheet } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import {
  Physics,
  CreateBox,
  MoveBox,
  WinCondition,
  GarbageCollection,
  boxCount,
  tossed
} from './Systems'
import Box from './Box'
import Matter from 'matter-js'

const { Engine, World, Bodies, Constraint } = Matter

const { width, height } = Dimensions.get('screen')

const engine = Engine.create({ enableSleeping: false })
const world = engine.world

const boxSize = Math.trunc(Math.max(width, height) * 0.075)
const square = Bodies.rectangle(80, 100, boxSize, boxSize, {
  frictionAir: 0.021
})
const platform = Bodies.rectangle(80, 200, width / 4, 40, {
  isStatic: true
})
const floorWidth = width / 6
const floorHeight = boxSize * 3
const floor = Bodies.rectangle(
  width / 2,
  height - boxSize / 2,
  floorWidth,
  floorHeight,
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

World.add(world, [platform, square, floor])
World.addConstraint(world, constraint)

export default class Game extends Component {
  constructor () {
    super()
    this.state = {
      win: '',
      discarded: 0
    }
  }

  componentDidMount () {
    // Events.on(engine, 'afterUpdate', function() { ... });
    this.interval = setInterval(() => this.tick(), 100)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    // World.clear(engine.world)
    // Engine.clear(engine)
  }

  tick (props) {
    if (
      square.position.y < height / 2 &&
      this.state.discarded < 4 &&
      boxCount > 5
    ) {
      this.setState({
        win: 'you win',
        score: this.props.score + 1
      })
    } else {
      this.setState({
        win: 'you lose'
      })
    }
    this.setState(state => ({
      discarded: (state.discarded = tossed)
    }))
    // if (this.state.discarded === 4) {
    //   this.componentWillUnmount()
    // }
  }

  render () {
    return (
      <Fragment>
        <Text style={{ fontSize: 20, left: 150, top: 80 }}>
          {this.state.win} Discarded: {this.state.discarded}
        </Text>
        <GameEngine
          // style={styles.container}
          systems={[
            Physics,
            CreateBox,
            MoveBox,
            WinCondition,
            GarbageCollection
          ]}
          entities={{
            physics: { engine: engine, world: world, constraint: constraint },
            platform: {
              body: platform,
              size: [width / 4, 40],
              color: '#C6C6C6',
              renderer: Box
            },
            square: {
              body: square,
              size: [boxSize, boxSize],
              color: 'blue',
              renderer: Box
            },
            floor: {
              body: floor,
              size: [floorWidth, floorHeight],
              color: '#000',
              renderer: Box
            }
          }}
        />
      </Fragment>
    )
  }
}

AppRegistry.registerComponent('Game', () => Game)
