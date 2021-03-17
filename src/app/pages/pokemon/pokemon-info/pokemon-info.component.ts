import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../../services/pokemon/pokemon.service';
import { TrainerService } from '../../../services/trainer/trainer.service';


@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss'],
})

// Check if User is logged in. if not, redirect to loginpage.
// If logged in, show a specific Pokemon together with its stats, by
// accessing path variable in this page. Ex: /{id}.
export class PokemonInfoComponent implements OnInit {
  private pokemonId: number = 0;
  private IMAGE_BASE_URL: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
  public pokemonDetails: any = {};
  public species: any = {};
  public loading: boolean = true;
  public pokemonImage: string = '';

  public isAlreadySaved: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private trainerService: TrainerService
  ) {
    this.pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  }

  // If promiseAll causes issues, switch to async/await
  async displayPokemonStats() {
    Promise.all([
      this.pokemonService.getPokemonById(this.pokemonId),
      this.pokemonService.getSpeciesById(this.pokemonId),
    ])
      .then((result: any) => {
        this.pokemonDetails = result[0];
        this.pokemonDetails.name =
          this.pokemonDetails.name.charAt(0).toUpperCase() +
          this.pokemonDetails.name.slice(1);
        this.pokemonImage =
          this.IMAGE_BASE_URL + this.pokemonDetails.id + '.png';
        this.species = result[1];

        this.isAlreadySaved = this.trainerService.isPokemonStored(
          this.pokemonId
        );

        this.loading = false;
      })
      .catch((err) => console.log(err));
  }

  // when pokemon is saved, add to user
  onSavePokemon() {
    this.trainerService.addPokemonToUser({
      id: this.pokemonDetails.id,
      name: this.pokemonDetails.name,
      image: this.pokemonImage,
    });
    this.isAlreadySaved = true;
  }

  ngOnInit(): void {
    this.displayPokemonStats();
  }
}
