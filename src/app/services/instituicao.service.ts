import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { instituicao_interface } from '../interfaces/instituicao_interface';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  constructor(private httpclient: HttpClient) { }

  obter(){
    return this.httpclient.get<instituicao_interface[]>("http://127.0.0.1:5000/mostrar-instituicao/2");
  }
  obter_pelo_id(userId: number){
    return this.httpclient.get<instituicao_interface>(`http://127.0.0.1:5000/mostrar-instituicao/id/${userId}`)
  }

}
