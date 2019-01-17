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
  brown_bear: require('../../assets/images/brown_bear.png'),
  cat: require('../../assets/images/cat.png'),
  elephant: require('../../assets/images/elephant.png'),
  fox: require('../../assets/images/fox.png'),
  frog: require('../../assets/images/frog.png'),
  hamster: require('../../assets/images/hamster.png'),
  horse: require('../../assets/images/horse.png'),
  moose: require('../../assets/images/moose.png'),
  panda: require('../../assets/images/panda.png'),
  penguin: require('../../assets/images/penguin.png'),
  pig: require('../../assets/images/pig.png'),
  polar_bear: require('../../assets/images/polar_bear.png'),
  rabbit: require('../../assets/images/rabbit.png'),
  wolf: require('../../assets/images/wolf.png')
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
