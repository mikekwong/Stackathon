import { createStackNavigator } from 'react-navigation'
import HomeScreen from '../HomeScreen'
import GameScreen from './components/Game'
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from 'react-navigation' // Version can be specified in package.json

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
    initialRouteName: 'Home'
  }
)

export default createAppContainer(AppNavigator)
