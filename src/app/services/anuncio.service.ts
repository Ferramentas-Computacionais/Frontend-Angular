import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { anuncio_interface } from '../interfaces/anuncio_interface';
@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(private httpclient: HttpClient) { }
  obter(){
    return this.httpclient.get<anuncio_interface[]>("http://127.0.0.1:5000/listar-anuncios")
    
  }
}
