import Promise from 'bluebird'
import { Animated } from 'react-native'
import { CompositeAnimation } from './Transition'

export const startAnimationAsync = (animation: CompositeAnimation): Promise<{ finished: boolean}> => {
  return new promise(done => animation.start(done))
}

export const stopAnimationAsync = (animatedValue: Animated.Value): Promise<number> => {
  return new Promise(done => animatedValue.stopAnimation(done))
}

export const requestAnimationFrameAsync = (): Promise<void> => {
  return new Promise(done => requestAnimationFrame(done))
}
