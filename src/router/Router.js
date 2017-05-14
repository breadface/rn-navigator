//@flow
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import RouterState from './RouterState'

type Route = {
  id: string,
  component: React$Element
}

type Props = {
  renderRoute: (Route, Object) => React$Element,
  defaultRoute: Array<Route>
}

type State = {
  activeRoutes: Array<Route>
}

class Router extends Component<Props, State> {
  props: Props
  state: State

  state = {
    activeRoutes: [this.props.defaultRoutes[0]]
  }

  render(){
    let { defaultRoutes, renderRoute } =  this.props
    let getActiveRoute = routeParams => {
      let routeKeys = defaultRoutes.map((obj) => obj.id)
      let newRoute = defaultRoutes[routeKeys.indexOf(routeParams.id)]

      return routeParams.otherProps ?
        { ...newRoute, otherProps: routeParams.otherProps }
        : newRoute
    }

    let onNavigate = route => {
      this.setState({activeRoutes: [getActiveRoute(route), ...this.state.activeRoutes]})
    }

    let onBack = () => {
      let [ active, previousActive, inactiveRoutes ] = this.state.activeRoutes
      this.setState({activeRoutes: [previousActive, active, ...inactiveRoutes]})
    }

    let navProps = { onNavigate, onBack }

    return (
      <RouterState
        routes={this.state.activeRoutes}
        renderRoute={route => renderRoute(route, navProps)}
      />
    )
  }
}

export default Router
