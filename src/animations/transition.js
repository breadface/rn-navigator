import React from 'react'

import { Animated, Easing } from 'react-native'

export type AnimationInput = { width: number, height: number }

type EndResult = { finished: boolean }
type EndCallback = (result: EndResult) => void

export type CompositeAnimation = {
  start: (callback?: ?EndCallback) => void,
  stop: () => void
}

export type Transition = {
  next: ?Object,
  animation: CompsiteAnimation
}

export const interpol = (
  value: Animated.Value,
  to: number[],
  from: number[] = [0,1]
) => {
  return value.interpolate({
    inputRange: from,
    outputRange: to,
    extrapolate: 'clamp'
  })
}

export const bounceHorizontal = (from: 'left' | 'right') => ({
  width,
}: AnimationInput) => {
  const endPosition = from === 'right' ? width : -width
  const value = new Animated.Value(0)

  return {
    next: {
      transform: [ { translateX: interpol(value, [endPosition, 0])}]
    },
    animation: () => {
      return (
        Animated.timing(
          value, {
            toValue: 1,
            duration: 0,
            easing: Easing.linear,
            useNativeDriver: true
          }
        ))
    }
  }
}
