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
        this.instituicoes = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtercampanhas(){
    this.campanhaservice.obter().subscribe(
      (response) => {
        console.log(response)
        this.campanhas = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  obternomecampanhaPorId(userId: number){
    
  }

}
