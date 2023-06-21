import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { campanha_interface } from '../interfaces/campanha_interface';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {

  constructor(private httpclient: HttpClient) { }

  obter(){
    return this.httpclient.get<campanha_interface[]>("http://127.0.0.1:5000/mostrar-campanha/3")
  }
}
