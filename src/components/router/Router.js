import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const getCurrentPath = () => {
  const path = document.location.pathname;
  return path.substring(path.lastIndexOf('/'))
}

export class Router extends Component {
  state = {
    route: getCurrentPath()
  }

  handleLinkClick = (route) => {
    this.setState({route})
    history.pushState(null, '', route) // eslint-disable-line
  }

  static childContextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }

  getChildContext() {
    return {
      route: this.state.route,
      linkHandler: this.handleLinkClick
    }
  }

  componentDidMount() {
    // this will fire every time we use the Back and Forward button
    window.onpopstate = () => {
      this.setState({
        route: getCurrentPath()
      })
    }
  }

  render () {
    return (<div>{this.props.children}</div>)
  }
}