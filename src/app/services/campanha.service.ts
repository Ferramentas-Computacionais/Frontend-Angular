import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { campanha_interface } from '../interfaces/campanha_interface';
import { ConstantsService } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {

  constructor(
    private httpclient: HttpClient,
    private constantsService: ConstantsService
  ) { }

  obter() {
    return this.httpclient.get<campanha_interface[]>(`${this.constantsService.API_BASE_URL}/mostrar-campanha/5`);
  }

  obter_por_id(userId: number) {
    return this.httpclient.get<campanha_interface[]>(`${this.constantsService.API_BASE_URL}/campanhas/${userId}`);
  }
  criarCampanha(data: FormData) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.httpclient.post(`${this.constantsService.API_BASE_URL}/create-campanha`, data, { headers });
  }
  obterCampanhasNaoVerificadas() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.httpclient.get<campanha_interface[]>(`${this.constantsService.API_BASE_URL}/campanhas_admin`, { headers });
  }

  obter_por_id_admin(userId: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.httpclient.get<campanha_interface[]>(`${this.constantsService.API_BASE_URL}/campanhas_admin/${userId}`, { headers });
  }
  	
}
