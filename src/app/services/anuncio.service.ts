import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { anuncio_interface } from '../interfaces/anuncio_interface';
import { ConstantsService } from '../services/constants.service';
import { Observable } from 'rxjs';

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

  obter_por_id_admin(userId: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.httpclient.get<anuncio_interface[]>(`${this.constantsService.API_BASE_URL}/listar-anuncios-usuario_admin/${userId}`, { headers });
  }
  criarAnuncio(data: FormData) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.httpclient.post(`${this.constantsService.API_BASE_URL}/create-anuncio`, data, { headers });
  }

  obter_por_id(userId: number) {


    return this.httpclient.get<anuncio_interface[]>(`${this.constantsService.API_BASE_URL}/listar-anuncios-usuario/${userId}`);
  }

  excluirAnuncio(anuncioId: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.httpclient.delete(`${this.constantsService.API_BASE_URL}/delete-anuncio/${anuncioId}`, { headers });
  }
  obterAnunciosAdmin(): Observable<anuncio_interface[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.httpclient.get<anuncio_interface[]>(`${this.constantsService.API_BASE_URL}/anuncios_admin`, { headers });
  }

  verificarAnuncioAdmin(anuncioId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.httpclient.get(`${this.constantsService.API_BASE_URL}/verificar_anuncios_admin/${anuncioId}`, { headers });
  }
  

}
