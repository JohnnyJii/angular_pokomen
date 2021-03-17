import { Injectable } from '@angular/core';

// Save user to localstorage, get user from localstorage &
// get all saved pokemons by user.

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  constructor() {}

  login(username: string): void {
    this.setLocalStorage('trainer', { username, pokemonsCollected: [] });
  }

  isLoggedIn(): boolean {
    return this.getLocalStorage('trainer') !== null;
  }

  // check if pokemon is stored
  isPokemonStored(pokemonId: number): boolean {
    const trainer = this.getLocalStorage('trainer');
    const pokemon = trainer.pokemonsCollected.find((p) => p.id === pokemonId);

    return pokemon !== undefined || null;
  }

  // add pokemon to user
  addPokemonToUser(pokemon): void {
    if (this.isLoggedIn()) {
      const data = this.getLocalStorage('trainer');
      data.pokemonsCollected.push(pokemon);
      this.setLocalStorage('trainer', data);
    }
  }

  //deklete pokemon from user
  deletePokemonFromUser(pokemon) {
    if (this.isLoggedIn()) {
      let store = this.getLocalStorage('trainer');
      const username = store.username;
      store = store.pokemonsCollected.filter((p) => p.id !== pokemon.id);

      this.setLocalStorage('trainer', { username, pokemonsCollected: store });
    }
  }

  //setting up locastorage
  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  setLocalStorage(key, object): void {
    localStorage.setItem(key, JSON.stringify(object));
  }
}
