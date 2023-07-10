import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AjuDoe';
 

  
  constructor() {
    
  }
  //se isso aqui for verdadeiro o elemento que ta linkado com essa classe fica visivel 
  menuVariable:Boolean = false; 
  menu_icon_variable:Boolean = false;
  // função que faz os elementos que eu falei em cima ficarem visiveis
  openMenu(){
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
  }

}
