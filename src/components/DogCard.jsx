import React, { Component } from 'react'

export default class DogCard extends Component {
  render() {
    const { dog } = this.props;
    if (!dog) return null;

    const { picture } = dog;

    return (
      <li>
        <img src={picture} alt='eita' />
      </li>
    )
  }
}
