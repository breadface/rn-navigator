import React from 'react'
import {
  View,
  StyleSheet,
  Animated
} from 'react-native'

import TransitionLayer from '../animations'
import { Transition } from '../animations/transition'
import { requestAnimationFrameAsync, startAnimationAsync, stopAnimationAsync } from '../animations/utils'

const Cover = ({children}) => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'white',
    }}
    children={children}
  />
)

type State = {
  activeTransition: Transition
}

class RouterState extends React.Component {
    state = {
      transitioned: false
    }

    componentDidUpdate(prevProps) {
      let newRoutes = this.props.routes
      let oldRoutes = prevProps.routes

      if (newRoutes !== oldRoutes) {
        if(newRoutes[0] !== oldRoutes[0]) {
          this.setState({transitioned: true})
        }
      } else {
        this.setState({transitioned: false})
      }
    }


  render(){
    let { routes, renderRoute, activeTransition } = this.props
    let [ active, previousActive, ...inactiveRoutes ] = routes

    return(
      <TransitionLayer
        acticve={this.state.transitioned}
        onLoad={async () => {
          await requestAnimationFrameAsync()
          await startAnimationAsync(activeTransition.animation())
        }}
        >
        <View style={{flex: 1}}>
          <Cover>
            {
              inactiveRoutes && inactiveRoutes
              .slice().reverse().map((route, i) => {
                return (
                  <Cover
                    key={i}
                    >
                    {renderRoute(route)}
                  </Cover>
                )
              })
            }
          </Cover>
          <Cover>
            { previousActive && renderRoute(previousActive) }
          </Cover>
          <Cover>
            <Animated.View
              style={{}}
              children={renderRoute(active)}
            />
          </Cover>
        </View>
      </TransitionLayer>
    )
  }
}

export default RouterState
