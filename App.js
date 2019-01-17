import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Font, Asset, AppLoading } from 'expo'

const styles = StyleSheet.create({
  blue: {
    color: 'blue',
    fontSize: 30,
    fontFamily: 'Montserrat'
  },
  red: {
    color: 'red',
    fontSize: 35,
    fontFamily: 'Montserrat-Bold'
  }
})

export default class LotsOfStyles extends Component {
  constructor () {
    super()
    this.state = {
      fontLoaded: false,
      isReady: false
    }
  }

  async componentDidMount () {
    await Font.loadAsync({
      Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  render () {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <Image source={require('./assets/images/expo-icon.png')} />
        <Image source={require('./assets/images/slack-icon.png')} />
      </View>
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //   {this.state.fontLoaded ? (
      //     <Fragment>
      //       <Text style={styles.blue}>Hello, world!</Text>
      //       <Text style={styles.red}>Hello, now!</Text>
      //     </Fragment>
      //   ) : null}
      // </View>
    )
  }
  async _cacheResourcesAsync () {
    const images = [
      require('./assets/images/expo-icon.png'),
      require('./assets/images/slack-icon.png')
    ]
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })
    return Promise.all(cacheImages)
  }
}
