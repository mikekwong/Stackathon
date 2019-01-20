import React, { Component } from 'react'
import { View } from 'react-native'
import { array, object, string } from 'prop-types'

const RADIUS = 30

export default class Circle extends Component {
  render () {
    const x = this.props.body.position.x - RADIUS / 2
    const y = this.props.body.position.y - RADIUS / 2
    return (
      <View
        style={{
          left: x,
          top: y,
          position: 'absolute',
          borderWidth: 0,
          borderRadius: RADIUS * 2,
          width: RADIUS * 2,
          height: RADIUS * 2,
          backgroundColor: this.props.color || 'blue'
        }}
      />
    )
  }
}

Circle.propTypes = {
  size: array,
  body: object,
  color: string
}
