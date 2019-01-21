import React, { Component, Fragment } from 'react'
import { View, Text, Dimensions, AppRegistry } from 'react-native'
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
import Box from './entities/Box'
import Matter from 'matter-js'

const { Engine, World, Bodies, Constraint, Composite } = Matter

const { width, height } = Dimensions.get('screen')

const engine = Engine.create({ enableSleeping: false })
const world = engine.world

const boxSize = Math.trunc(Math.max(width, height) * 0.075)
const square = Bodies.rectangle(60, 400, boxSize, boxSize, {
  frictionAir: 0.021
})
const platform = Bodies.rectangle(60, 500, width / 4, 40, {
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

export default class Level2 extends Component {
  constructor () {
    super()
    this.state = {
      status: '',
      discarded: 0
    }
  }

  componentDidMount () {
    // Events.on(engine, 'afterUpdate', function() { ... });
    this.interval = setInterval(() => this.tick(), 100)
  }

  componentWillUnmount () {
    World.remove(world, [platform])
    clearInterval(this.interval)
    this.setState({
      status: '',
      discarded: 0
    })
    //   World.clear(engine.world)
    //   Engine.clear(engine)
    // World.remove(world, [platform, square, floor, ...boxCount])
  }

  tick (props) {
    if (
      square.position.y < height / 2 &&
      this.state.discarded < 4 &&
      boxCount > 5
    ) {
      this.setState({
        status: 'You Won!',
        score: this.props.score + 1
      })
    } else if (
      square.position.y > height ||
      this.state.discarded > 4 ||
      (this.state.discarded > 4 &&
        square.position.y > height / 2 &&
        boxCount < 5)
    ) {
      this.setState({
        status: 'You Lost!'
      })
      this.componentWillUnmount()
    }
    this.setState(state => ({
      discarded: (state.discarded = tossed)
    }))
    // if (square.position.x > 60 && square.position.y > 300) {
    //   Composite.remove(world, [platform])
    // }
    // if (this.state.discarded === 4) {
    //   this.componentWillUnmount()
    // }
  }

  setModal (visible) {
    this.setState({ modalVisible: visible })
  }

  render () {
    return (
      <Fragment>
        <View style={{ position: 'absolute' }}>
          <Text style={{ fontSize: 20, left: 150, top: 80 }}>
            Max discards allowed: 5
          </Text>
          <Text style={{ fontSize: 20, left: 150, top: 100 }}>
            Discarded: {this.state.discarded}
          </Text>
          <Text style={{ fontSize: 80, left: 35, top: 250 }}>
            {this.state.status}
          </Text>

          {square.position.x > 60 ? null : (
            <Text style={{ fontSize: 15, left: 20, top: 440 }}>
              Stack this box to Win! If you drop it, you lose!
            </Text>
          )}
        </View>
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
              color: '',
              renderer: Box
            },
            square: {
              body: square,
              size: [boxSize, boxSize],
              color: '',
              borderWidth: 20,
              borderColor: '#1BC897',
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

AppRegistry.registerComponent('Level2', () => Level2)
