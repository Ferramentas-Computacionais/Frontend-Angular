import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { AuthData } from 'src/app/interfaces/auth-data_interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authData: AuthData = {
    username: '',
    password: ''
  };
  loginError: string | null = null;

  constructor(private authService: AutenticacaoService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.authData).subscribe(
      () => {
        // Login bem-sucedido, redirecionar para a página protegida
       // this.router.navigate(['/home']);
       console.log('você conseguiu se logar')
       this.router.navigate(['/']);

      },
      error => {
        // Tratar erro de login (credenciais inválidas, por exemplo)
        this.loginError = 'Credenciais inválidas. Por favor, tente novamente.';
      }
    );
  }
}