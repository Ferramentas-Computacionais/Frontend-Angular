import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isHomePage: boolean= false;
  title = 'AjuDoe';
  menuVariable: boolean = false;
  menu_icon_variable: boolean = false;

  constructor(private authService: AutenticacaoService, private router: Router) {}

  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  getUserType(): string | null {
    return localStorage.getItem('usuario_tipo');
  }
  ngOnInit(): void {
    // Verifica se a rota atual é a página inicial
    this.isHomePage = this.router.url === '/';
    //console.log("caiu aqui");
    
  }
}
