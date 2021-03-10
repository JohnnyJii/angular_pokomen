import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-pokemons',
  templateUrl: './all-pokemons.component.html',
  styleUrls: ['./all-pokemons.component.scss'],
})

// Check if User is logged in. If he/she isn't, redirect to login page.
// Otherwise display all Pokemons.
export class AllPokemonsComponent implements OnInit {
  public pokemons: any = [];
  private IMAGE_BASE_URL: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  constructor(private pokemonService: PokemonService, private router: Router) {}

  async onDisplayPokemons() {
    try {
      const data = await this.pokemonService.getAllPokemons();

      this.pokemons = data.results.map((poke) => {
        const id = Number(poke.url.split('/')[6]);
        return {
          id,
          name: poke.name,
          image: this.IMAGE_BASE_URL + id + '.png',
        };
      });

      document.getElementById('loader').style.display = 'none';
    } catch (error) {
      console.log(error);
    }
  }

  onPokemonClicked(pokemon) {
    this.router.navigateByUrl('/pokemons/' + pokemon.id);
  }

  ngOnInit(): void {
    this.onDisplayPokemons();
  }
}
