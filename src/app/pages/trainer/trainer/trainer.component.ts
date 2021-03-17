import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from '../../../services/trainer/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss'],
})

//Display  collected pokemons when logged in
export class TrainerComponent implements OnInit {
  public pokemons: any = [];

  constructor(private router: Router, private trainerService: TrainerService) {}

  // get data from localstorage
  displayPokemons() {
    const store = this.trainerService.getLocalStorage('trainer');
    // storage is empty, return null
    if (!store || store.pokemonsCollected == null) {
      return;
    }
    // pokemons stored, then sort pokemons by id
    this.pokemons = store.pokemonsCollected.sort(
      (pokeA, pokeB) => pokeA.id - pokeB.id
    );
  }

  ngOnInit(): void {
    this.displayPokemons();
  }

  // show clicked pokemon details
  onPokemonClicked(pokemon) {
    this.router.navigateByUrl('/pokemons/' + pokemon.id);
  }
  // delete pokemon from catch page
  onDeletePokemon(pokemon) {
    if (
      confirm(
        `Are you sure you want to get rid of ${pokemon.name}, no going back from this? \nPress OK to delete.`
      )
    ) {
      this.trainerService.deletePokemonFromUser(pokemon);
      this.displayPokemons();
    }
  }
}
