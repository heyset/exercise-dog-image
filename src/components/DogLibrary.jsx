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
    this.addDogToList = this.addDogToList.bind(this);
    this.changeDogName = this.changeDogName.bind(this)
  }

  addDogToList(e) {
    e.preventDefault();
    this.setState((prev) => {
      const dogList = [...prev.dogList];

      dogList.push(prev.currentDog);
      this.fetchDog();

      return { dogList };
    }, () => this.saveDogList());
  }

  changeDogName(e) {
    const currentUserInput = e.target.value
    this.setState(({currentDog}) => {
      const newDogState = {...currentDog};

      newDogState.name = currentUserInput;

      return {currentDog: newDogState};
    })
  }

  fetchDog() {
    this.setState({loading: true});
    return new Promise((resolve, _reject) => {
      fetch(BASE_URL)
        .then((response) => response.json())
        .then((jsonData) => {
          const { message, status } = jsonData;

          if (status === 'success') {
            const indexOfBreeds = message.search(/\/breeds\//);
            const endPortion = message.slice(indexOfBreeds + 8);
            const indexOfNextSlash = endPortion.search(/\//);
            const breed = endPortion.slice(0, indexOfNextSlash);

            this.setState({
              currentDog: {picture: message, breed, name: ''},
              loading: false,
            });
            resolve();
            return;
          }

          throw new Error(message);
        })
      .catch((error) => alert(`Eita! ${error}`));
    })
  }

  loadDogList() {
    if (!Storage || !localStorage) return;

    try {
      const parsedDogList = JSON.parse(localStorage.getItem('dog-list'));
      if (!parsedDogList) return;

      this.setState({
        dogList: parsedDogList,
      });
    } catch (e) {
      return console.error(e);
    }
  }

  saveDogList() {
    if (!Storage || !localStorage) return;

    localStorage.setItem('dog-list', JSON.stringify(this.state.dogList));
  }

  componentDidMount() {
    this.fetchDog()
      .then(() => this.setState({firstLoad: false}))
    .catch(() => alert('ue'));
    this.loadDogList();
  }

  render() {
    const { firstLoad, loading, currentDog, dogList } = this.state;

    return (
      firstLoad ? <p>Carregando...</p>
      : 
      <main>
        {loading ? <li>Carregando...</li> : <DogCard dog={currentDog} />}
        <p>{currentDog.breed}</p>
        <form onSubmit={this.addDogToList}>          
          <input type="text" placeholder="Nomeie o dog" value={this.state.currentDog.name} onChange={this.changeDogName}/>
          <button type="submit">Adicionar dog</button>
        </form>
        <button onClick={this.fetchDog}>Pega!</button>
        <CardList dogList={dogList} />
        <button onClick={() => alert('Remover dog? Ta doido(a)?!')}>Remover dog</button>
      </main>
    )
  }
}
