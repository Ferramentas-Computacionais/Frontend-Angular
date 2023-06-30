import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InstituicaoComponent } from './components/instituicao/instituicao.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';

import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'instituicao/:id',component: InstituicaoComponent},
  {path:'anuncios',component: AnunciosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
