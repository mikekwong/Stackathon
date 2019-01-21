import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  AppRegistry,
  ImageBackground
} from 'react-native'
import { Font, Asset, AppLoading } from 'expo'
import { Button } from 'react-native-elements'
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from 'react-navigation' // Version can be specified in package.json
// import GameScreen from './components/Game'
import { styles } from './components/stylesheet/styles'
import Game from './components/Game'

const { width, height } = Dimensions.get('screen')

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
      major: require('./assets/fonts/major.ttf')
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
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000'
        }}
      >
        {this.state.fontLoaded ? (
          <Fragment>
            <Text style={styles.title1}>STACK</Text>
            <Text style={styles.title2}>ATHON</Text>

            <Button
              fontFamily='major'
              fontSize={40}
              color='#000'
              loadingProps={{
                size: 'large',
                color: '#000'
              }}
              buttonStyle={{
                backgroundColor: '#fff',
                width: 200,
                height: 80,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 5
              }}
              title='start'
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
  constructor () {
    super()
    this.state = {
      score: 0
    }
  }
  render () {
    return (
      // <View style={{ flex: 1, alignItems: 'start' }}>
      <Fragment>
        <Game score={this.state.score} />
        <Button
          fontFamily='major'
          fontSize={20}
          color='#FFF'
          buttonStyle={{
            position: 'absolute',
            backgroundColor: '#000',
            width: 90,
            height: 50,
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 5,
            top: -760,
            left: 20
          }}
          title='menu'
          onPress={() => {
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })]
              })
            )
          }}
        />

        {/* <Text style={styles.blue}>Go To Home Screen</Text> */}

        {/* <Image source={require('./assets/images/8196.jpg')} /> */}
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
    // initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

export default createAppContainer(AppNavigator)

AppRegistry.registerComponent('App', () => App)
