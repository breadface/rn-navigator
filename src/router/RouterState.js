import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

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

class RouterState extends React.Component {
  render(){
    let { routes, renderRoute } = this.props
    let [ active, previousActive, ...inactiveRoutes ] = routes

    return(
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
          {renderRoute(active)}
        </Cover>
      </View>
    )
  }
}

export default RouterState
