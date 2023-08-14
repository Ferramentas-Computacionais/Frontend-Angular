import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
// Importe os módulos do PrimeNG que você deseja usar

import { HomeComponent } from './components/home/home.component';
import { InstituicaoComponent } from './components/instituicao/instituicao.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { CrudAnunciosComponent } from './components/crud-anuncios/crud-anuncios.component';
import { CriacaoAnuncioComponent } from './components/criacao-anuncio/criacao-anuncio.component';
import { DetalheAnuncioComponent } from './components/detalhe-anuncio/detalhe-anuncio.component';
import { CriacaoCampanhaComponent } from './components/criacao-campanha/criacao-campanha.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InstituicaoComponent,

    

    AnunciosComponent,
    LoginComponent,
    CadastroComponent,
    CrudAnunciosComponent,
    CriacaoAnuncioComponent,
    DetalheAnuncioComponent,
    CriacaoCampanhaComponent,
    AdminComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMapLibreGLModule,
    FormsModule,
    ToastrModule.forRoot() 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }