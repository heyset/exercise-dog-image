import React, { Component } from 'react';
import DogCard from './DogCard';

export default class CardList extends Component {
  render() {
    const { dogList } = this.props;

    return (
      <ul>
        { dogList.map((dog) => <DogCard dog={dog} key={dog.picture} />) }
      </ul>
    );
  }
}
