import React, { Component } from 'react';
import { PropTypes } from 'prop-types'

export class Link extends Component {
  handleClick = (evt) => {
    evt.preventDefault()
    history.pushState(null, '', this.props.to) // eslint-disable-line
  }

  render () {
    return (
      <div>{
        // eslint-disable-next-line
      }<a href='#' onClick={this.handleClick} >{this.props.children}</a>
      </div>
    )
  }
}

Link.propTypes = {
  to: PropTypes.string.isRequired
};