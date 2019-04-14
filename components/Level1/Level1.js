import React, { Component, Fragment } from 'react'
import { View, Text, Dimensions, AppRegistry } from 'react-native'
import { Icon } from 'react-native-elements'
import { GameEngine } from 'react-native-game-engine'
import {
  Physics,
  CreateBox,
  MoveBox,
  WinCondition,
  GarbageCollection,
  boxIds,
  worldBoxes,
  tossed,
} from './Systems1'
import Box from '../entities/Box'
import Matter from 'matter-js'

const { Engine, World, Bodies, Constraint, Composite } = Matter

const { width, height } = Dimensions.get('screen')

const engine = Engine.create({ enableSleeping: false })
const world = engine.world

const boxSize = Math.trunc(Math.max(width, height) * 0.075)
const square = Bodies.rectangle(60, 400, boxSize, boxSize, {
  frictionAir: 0.021,
})
const platform = Bodies.rectangle(60, 500, width / 4, 40, {
  isStatic: true,
})
const floorWidth = width / 3
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
  angularStiffness: 1,
})

World.add(world, [platform, square, floor])
World.addConstraint(world, constraint)

export default class Level1 extends Component {
  constructor() {
    super()
    this.state = {
      status: '',
      discarded: 0,
    }
  }

  componentDidMount() {
    // Events.on(engine, 'afterUpdate', function() { ... });
    this.interval = setInterval(() => this.tick(), 100)
  }

  componentWillUnmount() {
    // World.remove(world, [platform])
    clearInterval(this.interval)
    this.setState({
      status: '',
      discarded: 0,
    })
    // World.clear(engine.world)
    // Engine.clear(engine)
    // World.remove(world, [platform, square, floor, ...worldBoxes])
  }

  tick(props) {
    // lives keeps track if you go beyond 0 tosses left to trigger loss
    let lives = 3 - tossed
    let stackCheck = boxIds - tossed
    if (square.position.y < 200 && lives && stackCheck > 7) {
      if (this.state.status !== 'You Lost!') {
        this.setState({
          status: 'You Won!',
          score: this.props.score + 1,
        })
        // this.componentWillUnmount()
      }
    } else if (
      square.position.y > height ||
      !lives ||
      (!lives && square.position.y > height / 2 && stackCheck < 5)
    ) {
      if (this.state.status !== 'You Won!') {
        this.setState({
          status: 'You Lost!',
        })
        // this.componentWillUnmount()
      }
    }
    if (lives >= 0) {
      this.setState(state => ({
        discarded: (state.discarded = lives),
      }))
    }
    // platform removed
    if (square.position.x > 60 && square.position.y > 400) {
      Composite.remove(world, [platform])
    }
    // if (lives === 0) {
    //   this.componentWillUnmount()
    // }
  }

  setModal(visible) {
    this.setState({ modalVisible: visible })
  }

  render() {
    return (
      <Fragment>
        <View
          style={{
            position: 'absolute',
            height: 1000,
            width: 500,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: 'gray',
              left: 320,
              top: 60,
            }}
          >
            {this.state.discarded}
          </Text>
          <View style={{ position: ' absolute', top: 32, left: 50 }}>
            <Icon name="heart" type="font-awesome" color="#f50" />
          </View>
          {boxIds > 0 && (
            <Text
              style={{
                fontSize: 90,
                left: 160,
                top: 120,
                color: 'rgba(0, 0, 0, .2)',
              }}
            >
              {boxIds}
            </Text>
          )}

          <Text
            style={{ position: 'absolute', fontSize: 80, left: 35, top: 290 }}
          >
            {this.state.status}
          </Text>

          {boxIds ? null : (
            <Text
              style={{
                position: 'absolute',
                fontSize: 15,
                left: 110,
                top: 430,
              }}
            >
              Stack this box to Win!{'\n'}If you drop it, you lose!
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
            GarbageCollection,
          ]}
          entities={{
            physics: { engine: engine, world: world, constraint: constraint },
            platform: {
              body: platform,
              size: [width / 4, 40],
              color: '',
              renderer: Box,
            },
            square: {
              body: square,
              size: [boxSize, boxSize],
              color: '',
              borderWidth: 15,
              borderColor: '#5941FF',
              renderer: Box,
            },
            floor: {
              body: floor,
              size: [floorWidth, floorHeight],
              color: '#000',
              renderer: Box,
            },
          }}
        />
      </Fragment>
    )
  }
}

AppRegistry.registerComponent('Level1', () => Level1)
