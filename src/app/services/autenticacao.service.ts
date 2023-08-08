import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthData } from '../interfaces/auth-data_interface'; // Importe a interface aqui
import { ConstantsService } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  // URL do endpoint de autenticação no backend
  private accessTokenKey = 'access_token';

  constructor(private http: HttpClient, private constantsService: ConstantsService) { }

  login(authData: AuthData): Observable<any> {
    return this.http.post<any>(`${this.constantsService.API_BASE_URL}/login`, authData).pipe(
      tap(response => {
        if (response && response.access_token) {
          localStorage.setItem(this.accessTokenKey, response.access_token);
          if (response.usuario_id) {
            localStorage.setItem('usuario_id', response.usuario_id.toString());
          }
        }
      })
    );
  }

  

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  getToken(): string | null{
    return localStorage.getItem(this.accessTokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Verifique se o token está presente e não expirou
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    // Implemente a lógica para verificar se o token expirou
    return false; // Implemente a lógica correta aqui
  }
}
