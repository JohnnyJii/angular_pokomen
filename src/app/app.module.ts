import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllPokemonsComponent } from './pages/all/all-pokemons.component';
import { PokemonInfoComponent } from './pages/pokemon/pokemon-info/pokemon-info.component';
import { TrainerComponent } from './pages/trainer/trainer/trainer.component';
import { LoginComponent } from './components/login/login.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { IsLoggedInResolver } from './guards/auth/isLoggedin-resolver';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    AllPokemonsComponent,
    PokemonInfoComponent,
    TrainerComponent,
    LoginComponent,
    PokemonCardComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [IsLoggedInResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
