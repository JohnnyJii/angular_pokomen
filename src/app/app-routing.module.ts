import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPokemonsComponent } from './pages/all/all-pokemons.component';
import { PokemonInfoComponent } from './pages/pokemon/pokemon-info/pokemon-info.component';
import { TrainerComponent } from './pages/trainer/trainer/trainer.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { IsLoggedInResolver } from './guards/auth/isLoggedin-resolver';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    resolve: [IsLoggedInResolver],
  },
  {
    path: 'pokemons',
    component: AllPokemonsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pokemons/:id',
    component: PokemonInfoComponent,
    canActivate: [AuthGuard],
  },
  { path: 'trainer', component: TrainerComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
