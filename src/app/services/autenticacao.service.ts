import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthData } from '../interfaces/auth-data_interface'; // Importe a interface aqui
import { ConstantsService } from '../services/constants.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';

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
    const decodedToken: JwtPayload = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    
    return decodedToken.exp !== undefined && decodedToken.exp < currentTime
  }
  refreshAccessToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token'); // Supondo que você armazene o refresh token localmente
  
    if (!refreshToken) {
      return throwError('Refresh token not available');
    }
  
    const refreshTokenData = {
      refresh_token: refreshToken
    };
  
    return this.http.post<any>(`${this.constantsService.API_BASE_URL}/refresh-token`, refreshTokenData).pipe(
      tap(response => {
        if (response && response.access_token) {
          localStorage.setItem(this.accessTokenKey, response.access_token);
        }
      })
    );
  }
  
}


