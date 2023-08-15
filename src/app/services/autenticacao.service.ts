import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthData } from '../interfaces/auth-data_interface'; // Importe a interface aqui
import { ConstantsService } from '../services/constants.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';


enum UserType {
  Normal = 'normal',
  Special = 'special'
}

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
            localStorage.setItem('usuario_nome', response.usuario_nome.toString());
            if (this.hasSpecialAccess(response.usuario_nome) == true ) {
              localStorage.setItem('usuario_tipo', 'usuario_especial');
            } else {
              localStorage.setItem('usuario_tipo', 'usuario_comum');
            }

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

  hasSpecialAccess(nome: string): boolean {
    // Verifique se o nome do usuário corresponde aos critérios para acessos especiais
    return nome === 'ajudoe'; // Substitua 'nome-especial' pelo nome que deve ter acessos especiais
  
  }

  criarUsuario(novoUsuario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.post(`${this.constantsService.API_BASE_URL}/create-user`, novoUsuario, { headers }).pipe(
      tap(response => {
        // Lógica de sucesso, se necessário
      }),
      catchError(error => {
        console.error('Erro ao criar usuário', error);
        throw error;
      })
    );
  }

  
  
}


