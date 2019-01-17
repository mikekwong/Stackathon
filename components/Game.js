import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { Font, Asset, AppLoading } from 'expo'
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from 'react-navigation' // Version can be specified in package.json
import { styles } from './styles'
import HomeScreen from '../App'

import Matter from 'matter-js'
import { GameEngine } from 'react-native-game-engine'

const { width, height } = Dimensions.get('screen')

export default class Game extends Component {
  render () {
    return <div />
  }
}
