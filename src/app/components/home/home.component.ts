import { Component } from '@angular/core';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { CampanhaService } from 'src/app/services/campanha.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  instituicoes: any[] = [];
  campanhas: any[] = [];
  constructor(private instituicaoservice: InstituicaoService,private campanhaservice: CampanhaService ){  
    this.obterinstituicoes();
    this.obtercampanhas();
}
  obterinstituicoes(){
    this.instituicaoservice.obter().subscribe(
      (response) => {
        // Sucesso na obtenção das instituições
        //console.log(response)
        this.instituicoes = response;
        // Faça o processamento adicional dos dados recebidos
      },
      (error) => {
        // Tratamento de erro ao obter as instituições
        console.error(error);
        // Exiba uma mensagem de erro ou execute ação apropriada
      }
    );
  }

  obtercampanhas(){
    this.campanhaservice.obter().subscribe(
      (response) => {
        // Sucesso na obtenção das instituições
        console.log(response)
        this.campanhas = response;
        // Faça o processamento adicional dos dados recebidos
      },
      (error) => {
        // Tratamento de erro ao obter as instituições
        console.error(error);
        // Exiba uma mensagem de erro ou execute ação apropriada
      }
    );
  }
}
