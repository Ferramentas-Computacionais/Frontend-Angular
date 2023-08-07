import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { AuthData } from 'src/app/interfaces/auth-data_interface';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
    authdata: Authdata = {
    username: '',
    email: '',
    password: '',
}
cadastroError: string | null = null;

constructor(private authService: AutenticacaoService, private router: Router) { }
onCadastro(): void{
  this.authService.cadastro(this.authdata).subscribe(
  () => {
    console.log('Parabéns, seu cadastro foi efetuado com sucesso')
    this.router.navigate(['/']);

  }
  error => {
    this.cadastroError = 'Cadastro inválido. Por favor, tente novamente.';
}
  );
}
}
