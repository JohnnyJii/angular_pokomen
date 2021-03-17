import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Get pokemons from api

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private BASE_URL: string = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getAllPokemons(): Promise<any> {
    return this.http
      .get(this.BASE_URL + 'pokemon?offset=0&limit=100')
      .toPromise();
  }

  getPokemonById(id: number): Promise<any> {
    return this.http.get(this.BASE_URL + 'pokemon/' + id).toPromise();
  }

  getSpeciesById(id: number): Promise<any> {
    return this.http.get(this.BASE_URL + 'pokemon-species/' + id).toPromise();
  }
}
