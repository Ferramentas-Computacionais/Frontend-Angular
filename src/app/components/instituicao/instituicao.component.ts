import { Component } from '@angular/core';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.scss']
})
export class InstituicaoComponent{
  instituicoes: any[] = [];
  campanhas: any[] = [];
  constructor(private instituicaoservice: InstituicaoService ){  
    this.obterinstituicoes();
    
}
obterinstituicoes() {
  this.instituicaoservice.obter().subscribe(
    (response: any[]) => {
      this.instituicoes = response;
     
    },
    (error) => {
      console.error(error);
    }
  );
}


obterinstituicaoPorId(userId: number): Observable<any[]> {
  return this.instituicaoservice.obter_pelo_id(userId);
}
}
