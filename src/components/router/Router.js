import React, { Component } from 'react';

const getCurrentPath = () => {
  const path = document.location.pathname;
  return path.substring(path.lastIndexOf('/'))
}

export class Link extends Component {
  state = {
    route: getCurrentPath()
  }

  render () {
    return (<div>{this.props.children}</div>)
  }
}