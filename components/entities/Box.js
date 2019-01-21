import React, { Component } from 'react'
import { View } from 'react-native'
import { array, object, string, number } from 'prop-types'

export default class Box extends Component {
  render () {
    const width = this.props.size[0]
    const height = this.props.size[1]
    const x = this.props.body.position.x - width / 2
    const y = this.props.body.position.y - height / 2
    const angle = this.props.angle

    return (
      <View
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
          transform: [{ rotate: `${angle}rad` }],
          backgroundColor: this.props.color || 'black'
        }}
      />
    )
  }
}

Box.propTypes = {
  size: array,
  body: object,
  color: string,
  angle: number
}
