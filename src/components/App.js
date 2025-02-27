import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (inputType) => {
    this.setState({
      filters: { 
        type: inputType 
      }
    })
  }

  endPoint = () => {
    let api = '/api/pets'
    if (this.state.filters.type === "all") return api
    return `${api}?type=${this.state.filters.type}` 
  }

  onFindPetsClick = () => {
    fetch(this.endPoint()) 
      .then(resp => resp.json())
      .then((filteredPets) => {
        this.setState({
          pets: filteredPets
        })
      })
  }

  onAdoptPet = (id) => {
    this.setState(previousState => ({
      pets: previousState.pets.map(pet => pet.id === id ? {...pet, isAdopted: true} : pet)
    }))
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
