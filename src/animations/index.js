import React from 'react'

type Props = {
  onLoad: () => any,
  active: boolean,
  children?: any
}

export default class TransitionLayer extends React.Component {
  props: Props
  componentDidUpdate(prevProps: Props): any {
    let { active, onLoad } = this.props

    if(active){
      onLoad()
    }
  }

  render(){
    return React.Children.only(this.props.children)
  }
}
