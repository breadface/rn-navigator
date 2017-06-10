//@flow
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import RouterState from './RouterState'

type Route = {
  id: string,
  component: React$Element<*>
}

type Props = {
  renderRoute: (Route, Object) => React$Element<*>,
  defaultRoutes: Array<Route>
}

type State = {
  activeRoutes: Array<Route>
}

class Router extends React.Component {
  props: Props
  state: State

  state = {
    activeRoutes: [this.props.defaultRoutes[0]]
  }

  render(){
    let { defaultRoutes, renderRoute } =  this.props
    let { activeRoutes } = this.state

    let getActiveRoute = routeParams => {
      let { id, otherProps } = routeParams
      let routeIndex = defaultRoutes.findIndex((obj) => obj.id === id)

      //do nothing if route not found
      if(routeIndex === -1) return
      let newRoute = defaultRoutes[routeIndex]

      return otherProps ?
        { ...newRoute, otherProps }
        : newRoute
    }

    let goTo = route => {
      let active = getActiveRoute(route)
      let routeIndex = activeRoutes.findIndex(obj => obj.id === route.id)

      let setRoute = () => {
        //avoid saving duplicate routes
        if(!active)
          return activeRoutes

        if(routeIndex !== -1){
          return [active, ...activeRoutes.slice(0, routeIndex), ...activeRoutes.slice(routeIndex + 1)]
        }
        return [active, ...activeRoutes]
      }


      this.setState({activeRoutes: setRoute()})
    }

    let goBack = (n=1) => {
      let routes = [ ...activeRoutes.slice(n,n+1), activeRoutes[0], ...activeRoutes.slice(n+1) ]
      this.setState({activeRoutes: routes})
    }

    let navProps = { goTo, goBack }

    return (
      <RouterState
        routes={this.state.activeRoutes}
        renderRoute={route => renderRoute(route, navProps)}
      />
    )
  }
}

export default Router
