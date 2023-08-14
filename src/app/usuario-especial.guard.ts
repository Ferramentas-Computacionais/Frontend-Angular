import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioEspecialGuard implements CanActivate {
  constructor(private authService: AutenticacaoService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      const userType = localStorage.getItem('usuario_tipo');

      if (userType === 'usuario_especial') {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
