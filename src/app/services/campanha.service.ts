import { HttpClient } from '@angular/common/http';
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
    return this.httpclient.get<campanha_interface[]>(`${this.constantsService.API_BASE_URL}/mostrar-campanha/3`);
  }

  obter_por_id(userId: number) {
    return this.httpclient.get<campanha_interface[]>(`${this.constantsService.API_BASE_URL}/campanhas/${userId}`);
  }

}
