import { Component } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AjuDoe';
  menuVariable: boolean = false;
  menu_icon_variable: boolean = false;

  constructor(private authService: AutenticacaoService) {}

  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
