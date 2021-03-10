import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from '../../../services/trainer/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss'],
})

//Display all pokemons collected by given trainer (logged in trainer).
export class TrainerComponent implements OnInit {
  public pokemons: any = [];

  constructor(private router: Router, private trainerService: TrainerService) {}

  displayPokemons() {
    const store = this.trainerService.getLocalStorage('trainer');

    if (!store || store.pokemonsCollected == null) {
      return;
    }

    this.pokemons = store.pokemonsCollected.sort(
      (pokeA, pokeB) => pokeA.id - pokeB.id
    );
  }

  ngOnInit(): void {
    this.displayPokemons();
  }

  onPokemonClicked(pokemon) {
    this.router.navigateByUrl('/pokemons/' + pokemon.id);
  }
  onDeletePokemon(pokemon) {
    if (
      confirm(
        `Are you sure you want to delete ${pokemon.name}?\nPress OK to execute deletion.`
      )
    ) {
      this.trainerService.deletePokemonFromUser(pokemon);
      this.displayPokemons();
    }
  }
}
