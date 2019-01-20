import Matter from 'matter-js'
import Circle from './entities/Circle'

const { Bodies, World } = Matter

const circle = (x, y, r, staticOrNot = false) => {
  return Bodies.circle(x, y, r, {
    isStatic: staticOrNot,
    restitution: 1
  })
}

const rect = (x, y, w, h, staticOrNot = false, rotate, frVal) => {
  return Bodies.rectangle(x, y, w, h, {
    isStatic: staticOrNot,
    restitution: 1,
    angle: rotate,
    friction: frVal
  })
}

// // functionality to create boxes
// let circleIds = 0
// // This gets called in systems
// const PopulateCircles = (entities, { touches, screen }) => {
//   let world = entities['physics'].world
//   let circleSize = 30
//   // for each action made which is a touch
//   // in that area generate a new rectangle in the world
//   // alternate the color of the boxes generated

//   let body = Bodies.circle(
//     300,
//     300,
//     circleSize,
//     { frictionAir: 0.011, restitution: 0.8 } // restitution enables friction bounce
//   )
//   World.add(world, [body])
//   // details of boxes generated ++ allows boxes to increment
//   entities[++circleIds] = {
//     body: body,
//     size: [circleSize, circleSize],
//     color: circleIds % 2 ? 'pink' : '#B8E986',
//     renderer: Circle
//   }

//   return entities
// }

export { circle, rect }
