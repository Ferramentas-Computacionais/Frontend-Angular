import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InstituicaoComponent } from './components/instituicao/instituicao.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CrudAnunciosComponent } from './components/crud-anuncios/crud-anuncios.component';
import { CriacaoAnuncioComponent} from './components/criacao-anuncio/criacao-anuncio.component';
import { DetalheAnuncioComponent} from './components/detalhe-anuncio/detalhe-anuncio.component';
import { CriacaoCampanhaComponent} from './components/criacao-campanha/criacao-campanha.component';
import { AdminComponent} from './components/admin/admin.component';
import { QuemSomosComponent } from './components/quem-somos/quem-somos.component';
import { AppComponent } from './app.component';

import { AuthGuard } from './auth.guard'

import { UsuarioEspecialGuard } from './usuario-especial.guard';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'instituicao/:id',component: InstituicaoComponent},
  {path:'anuncios',component: AnunciosComponent },
  {path:'login',component: LoginComponent},
  {path: 'cadastro',component: CadastroComponent},
  {path: 'meus_anuncios',component: CrudAnunciosComponent, canActivate: [AuthGuard]},
  {path: 'criacao_anuncio',component: CriacaoAnuncioComponent, canActivate: [AuthGuard]},
  {path: 'criacao_campanha',component: CriacaoCampanhaComponent, canActivate: [AuthGuard]},
  {path: 'admin',component: AdminComponent, canActivate: [UsuarioEspecialGuard]},
  {path: 'quem_somos', component: QuemSomosComponent},
  {path: 'detalhe_anuncio/:id',component: DetalheAnuncioComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
