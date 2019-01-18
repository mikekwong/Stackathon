import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import { Font, Asset, AppLoading } from 'expo'
import { Button } from 'react-native-elements'
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from 'react-navigation' // Version can be specified in package.json
// import GameScreen from './components/Game'
import { styles } from './components/styles'
import Game from './components/Game'

class HomeScreen extends Component {
  constructor () {
    super()
    this.state = {
      fontLoaded: false,
      isReady: false
    }
  }

  async componentDidMount () {
    // load fonts after initial render
    await Font.loadAsync({
      Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  render () {
    // If false set state to true and cache assets for future loads locally
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }
    // render view
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this.state.fontLoaded ? (
          <Fragment>
            {/* <Text style={styles.blue}>Menu</Text> */}
            <Button
              fontSize={40}
              loadingProps={{ size: 'large', color: 'rgba(111, 202, 186, 1)' }}
              buttonStyle={{
                backgroundColor: 'rgba(92, 99,216, 1)',
                width: 250,
                height: 100,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 5
              }}
              title='Start'
              onPress={() => {
                this.props.navigation.dispatch(
                  StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Game' })
                    ]
                  })
                )
              }}
            />
            <Image source={require('./assets/images/cow.png')} />
            <StatusBar hidden />
          </Fragment>
        ) : null}
      </View>
    )
  }
  // async caching action for list of image assets
  async _cacheResourcesAsync () {
    const images = [require('./assets/images/cow.png')]
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })
    return Promise.all(cacheImages)
  }
}

// Game view
class GameScreen extends Component {
  render () {
    return (
      // <View style={{ flex: 1, alignItems: 'start' }}>
      <Fragment>
        <Game />

        {/* <Text style={styles.blue}>Go To Home Screen</Text> */}
        <Button
          fontSize={40}
          backgroundColor='#841584'
          title='Exit'
          onPress={() => {
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })]
              })
            )
          }}
        />
        <Image source={require('./assets/images/cow.png')} />
        <StatusBar hidden />
      </Fragment>
      // </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Game: {
      screen: GameScreen
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

export default createAppContainer(AppNavigator)
