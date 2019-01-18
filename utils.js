import { Dimensions, Platform } from 'react-native'

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
  'window'
)
export const TOP_AREA_HEIGHT = 120
export const GRID_AREA_WIDTH = SCREEN_WIDTH
export const GRID_AREA_HEIGHT = SCREEN_HEIGHT - TOP_AREA_HEIGHT
export const ANIMAL_SIZE = 57

export const FONT_FAMILY = 'pequena'

export const KILL_SCORE = 1
export const MISS_SCORE = 1
export const ESCAPE_SCORE = 1
export const MAX_MISSES = 5

export const IMAGES = {
  bear: require('./assets/images/bear.png'),
  buffalo: require('./assets/images/buffalo.png'),
  chick: require('./assets/images/chick.png'),
  chicken: require('./assets/images/chicken.png')
}

export const GUNS = [
  require('../../assets/sounds/shot_gun.mp3'),
  require('../../assets/sounds/laser_gun.mp3')
]

export const GROANS = [
  require('../../assets/sounds/angry_1.mp3'),
  require('../../assets/sounds/angry_3.mp3'),
  require('../../assets/sounds/angry_4.mp3'),
  require('../../assets/sounds/angry_5.mp3'),
  require('../../assets/sounds/angry_6.mp3'),
  require('../../assets/sounds/angry_7.mp3')
]
