import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InstituicaoComponent } from './components/instituicao/instituicao.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CrudAnunciosComponent } from './components/crud-anuncios/crud-anuncios.component';
import { CriacaoAnuncioComponent} from './components/criacao-anuncio/criacao-anuncio.component';
import {DetalheAnuncioComponent} from './components/detalhe-anuncio/detalhe-anuncio.component';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard'
const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'instituicao/:id',component: InstituicaoComponent},
  {path:'anuncios',component: AnunciosComponent},
  {path:'login',component: LoginComponent},
  {path: 'cadastro',component: CadastroComponent},
  {path: 'meus_anuncios',component: CrudAnunciosComponent, canActivate: [AuthGuard]},
  {path: 'criacao_anuncio',component: CriacaoAnuncioComponent, canActivate: [AuthGuard]},
  {path: 'detalhe_anuncio/:id',component: DetalheAnuncioComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
