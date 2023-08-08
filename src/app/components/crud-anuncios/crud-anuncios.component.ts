import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { AnuncioService } from 'src/app/services/anuncio.service';
import { anuncio_interface } from 'src/app/interfaces/anuncio_interface';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-crud-anuncios',
  templateUrl: './crud-anuncios.component.html',
  styleUrls: ['./crud-anuncios.component.scss']
})
export class CrudAnunciosComponent implements OnInit {
  anuncios: anuncio_interface[] = [];

  constructor(
    private anuncioService: AnuncioService,
    private authService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioId = Number(localStorage.getItem('usuario_id'));
    console.log(usuarioId)
    if (usuarioId) {
      this.anuncioService.obter_por_id(usuarioId).subscribe(
        (anuncios) => {
          this.anuncios = anuncios;
        },
        (error) => {
          console.error('Erro ao obter anúncios:', error);
        }
      );
    }
  }
}
