import React, { Component } from 'react'

export default class DogCard extends Component {
  render() {
    const { picture } = this.props.dog;

    return (
      <li>
        <img src={picture} alt='eita' />
      </li>
    )
  }
}
