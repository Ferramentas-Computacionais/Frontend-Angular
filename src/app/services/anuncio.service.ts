import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { anuncio_interface } from '../interfaces/anuncio_interface';
import { ConstantsService } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(
    private httpclient: HttpClient,
    private constantsService: ConstantsService
  ) { }

  obter() {
    return this.httpclient.get<anuncio_interface[]>(`${this.constantsService.API_BASE_URL}/listar-anuncios`);
  }

  obter_por_id(userId: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.httpclient.get<anuncio_interface[]>(`${this.constantsService.API_BASE_URL}/listar-anuncios-usuario/${userId}`, { headers });
  }
  criarAnuncio(data: FormData) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.httpclient.post(`${this.constantsService.API_BASE_URL}/create-anuncio`, data, { headers });
  }
}
