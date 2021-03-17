import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../services/trainer/trainer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public trainer: any = {
    username: '',
  };
  constructor(private trainerService: TrainerService, private router: Router) {}

  //  must give name for trainer otherwise error message.
  onUsernameEntered() {
    if (this.trainer.username === '' || this.trainer.username == null) {
      Swal.fire("No name?", "Give your trainer a name", "error");
      return;
    }

    // use given name for trainer
    this.trainerService.login(this.trainer.username);
    this.router.navigateByUrl('/pokemons');
    Swal.fire("Welcome", "you are now ready poke-e-mon", "success");
  }
  ngOnInit(): void {}
}
