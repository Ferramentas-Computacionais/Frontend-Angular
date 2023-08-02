import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { instituicao_interface } from '../interfaces/instituicao_interface';
import { ConstantsService } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  constructor(
    private httpclient: HttpClient,
    private constantsService: ConstantsService
  ) { }

  obter() {
    return this.httpclient.get<instituicao_interface[]>(`${this.constantsService.API_BASE_URL}/mostrar-instituicao/2`);
  }

  obter_pelo_id(userId: number) {
    return this.httpclient.get<instituicao_interface[]>(`${this.constantsService.API_BASE_URL}/mostrar-instituicao/id/${userId}`);
  }

}
