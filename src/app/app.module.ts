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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InstituicaoComponent,

    

    AnunciosComponent,
    LoginComponent,
    CadastroComponent,
    CrudAnunciosComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMapLibreGLModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }