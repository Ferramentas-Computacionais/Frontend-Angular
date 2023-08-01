import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthData } from '../interfaces/auth-data_interface'; // Importe a interface aqui

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private apiUrl = 'http://127.0.0.1:5000'; // URL do endpoint de autenticação no backend
  private accessTokenKey = 'access_token';

  constructor(private http: HttpClient) { }

  login(authData: AuthData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, authData).pipe(
      tap(response => {
        if (response && response.access_token) {
          localStorage.setItem(this.accessTokenKey, response.access_token);
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
