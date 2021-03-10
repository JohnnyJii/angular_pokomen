import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../services/trainer/trainer.service';
import { Router } from '@angular/router';

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

  onUsernameEntered() {
    if (this.trainer.username === '' || this.trainer.username == null) {
      alert("Please enter a username. Don't leave this field empty.");
      return;
    }

    this.trainerService.login(this.trainer.username);
    this.router.navigateByUrl('/pokemons');
  }
  ngOnInit(): void {}
}
