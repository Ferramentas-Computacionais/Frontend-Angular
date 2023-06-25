import { Component } from '@angular/core';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { CampanhaService } from 'src/app/services/campanha.service';
import { campanha_interface } from 'src/app/interfaces/campanha_interface';
import { Observable, catchError, map, of } from 'rxjs';

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
obterinstituicoes() {
  this.instituicaoservice.obter().subscribe(
    (response: any[]) => {
      this.instituicoes = response;
      this.preencherNomeCampanha();
    },
    (error) => {
      console.error(error);
    }
  );
}

preencherNomeCampanha() {
  this.instituicoes.forEach((instituicao) => {
    this.obtercampanhaPorId(instituicao.usuario_id).subscribe(
      (response: any) => {
        if (response) {
          instituicao.nome_campanha = response.nome;
        } else {
          instituicao.nome_campanha = 'N/A';
        }
      },
      (error) => {
        console.error(error);
      }
    );
  });
}

obtercampanhas(): void {
  this.campanhaservice.obter().subscribe(
    (response) => {
      this.campanhas = response;
    },
    (error) => {
      console.error(error);
    }
  );
}

obtercampanhaPorId(userId: number): Observable<any[]> {
  return this.campanhaservice.obter_por_id(userId);
}
}
