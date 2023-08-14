import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { catchError, switchMap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AutenticacaoService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const userType = localStorage.getItem('usuario_tipo');
    if (this.authService.isAuthenticated() && userType=='usuario_comum') {
      return of(true);
    } else {
      return this.authService.refreshAccessToken().pipe(
        switchMap(() => {
          if (this.authService.isAuthenticated() && userType=='usuario_comum') {
            return of(true);
          } else {
            // Redirecionar para a página de login se o usuário não estiver autenticado
            this.router.navigate(['/login']);
            return of(false);
          }
        }),
        catchError(() => {
          // Redirecionar para a página de login em caso de erro na renovação
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    }
  }
}
