import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { instituicao_interface } from '../interfaces/instituicao_interface';
import { ConstantsService } from '../services/constants.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  constructor(
    private httpclient: HttpClient,
    private constantsService: ConstantsService
  ) { }

  obter() {
    return this.httpclient.get<instituicao_interface[]>(`${this.constantsService.API_BASE_URL}/mostrar-instituicao/10`);
  }

  obter_pelo_id(userId: number) {
    return this.httpclient.get<instituicao_interface[]>(`${this.constantsService.API_BASE_URL}/mostrar-instituicao/id/${userId}`);
  }
  verificarInstituicao(userId: number): Observable<any> {
    return this.httpclient.get<any>(`${this.constantsService.API_BASE_URL}/verificar_instituicao/${userId}`);
  }

  criarInstituicao(data: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.httpclient.post(`${this.constantsService.API_BASE_URL}/create-instituicao`, data, { headers });
  }

}
