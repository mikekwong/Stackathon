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

class GameScreen extends Component {
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Fragment>
          <Text style={styles.blue}>Go To Home Screen</Text>
          <Button
            title='Return to Menu'
            onPress={() => {
              this.props.navigation.dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Home' })]
                })
              )
            }}
          />
          <Image source={require('../assets/images/icon.png')} />
        </Fragment>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Game: {
      screen: GameScreen
    },
    Home: {
      screen: props => <HomeScreen />
    }
  },
  {
    initialRouteName: 'Game'
  }
)

export default createAppContainer(AppNavigator)
