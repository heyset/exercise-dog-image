import React, { Component } from 'react';
import CardList from './CardList';
import DogCard from './DogCard';

const BASE_URL = 'https://dog.ceo/api/breeds/image/random';

export default class DogLibrary extends Component {
  constructor() {
    super();
    this.state = {
      currentDog: {},
      loading: true,
      firstLoad: true,
      dogList: [],
    }

    this.fetchDog = this.fetchDog.bind(this);
    this.addDogToList = this.addDogToList.bind(this)
  }

  addDogToList() {
    this.setState((prev) => {
      const dogList = [...prev.dogList];

      dogList.push(prev.currentDog);

      return { dogList };
    })
  }

  fetchDog() {
    this.setState({loading: true});
    return new Promise((resolve, _reject) => {
      fetch(BASE_URL)
        .then((response) => response.json())
        .then((jsonData) => {
          if (jsonData.status === 'success') {
            this.setState({
              currentDog: {picture: jsonData.message},
              loading: false,
            });
            resolve();
            return;
          }

          throw new Error(jsonData.message);
        })
      .catch((error) => alert(`Eita! ${error}`));
    })
  }

  componentDidMount() {
    this.fetchDog()
      .then(() => this.setState({firstLoad: false}))
    .catch(() => alert('ue'));
  }

  render() {
    const { firstLoad, loading, currentDog, dogList } = this.state;

    return (
      firstLoad ? <p>Carregando...</p>
      : 
      <main>
        {loading ? <li>Carregando...</li> : <DogCard dog={currentDog} />}
        <button onClick={this.fetchDog}>Pega!</button>
        <button onClick={this.addDogToList}>Adicionar dog</button>
        <CardList dogList={dogList} />
        <p>Remover dog? Ta doido(a)?</p>
      </main>
    )
  }
}
