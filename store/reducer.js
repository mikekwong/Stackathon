import {
  IMAGES,
  GRID_AREA_HEIGHT,
  GRID_AREA_WIDTH,
  ANIMAL_SIZE
} from './store/reducer'

export const getRandomAnimal = (extraPandas = 0) => {
  let animals = Object.keys(IMAGES)
  let extraPandaArray = Array(extraPandas).fill('bear')
  animals = [...animals, ...extraPandaArray]
  return animals[Math.floor(Math.random() * animals.length)]
}

export const generateRandomPosition = () => {
  return {
    left: Math.random() * (GRID_AREA_WIDTH - ANIMAL_SIZE),
    top: Math.random() * (GRID_AREA_HEIGHT - ANIMAL_SIZE)
  }
}

export const randomFromArray = array => {
  return array[Math.floor(Math.random() * array.length)]
}
