import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AnuncioService } from 'src/app/services/anuncio.service';
import { anuncio_interface } from 'src/app/interfaces/anuncio_interface';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { campanha_interface } from 'src/app/interfaces/campanha_interface';
import { CampanhaService } from 'src/app/services/campanha.service';

@Component({
  selector: 'app-crud-anuncios',
  templateUrl: './crud-anuncios.component.html',
  styleUrls: ['./crud-anuncios.component.scss']
})
export class CrudAnunciosComponent implements OnInit {
  minhaCampanha: campanha_interface[] = [];
  anuncios: anuncio_interface[] = [];
  originalAnuncios: anuncio_interface[] = []; 

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  searchTerm: string = '';
  
  constructor(
    private anuncioService: AnuncioService,
    private campanhaService: CampanhaService,
    private authService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioId = Number(localStorage.getItem('usuario_id'));

    if (usuarioId) {
      this.anuncioService.obter_por_id(usuarioId).subscribe(
        (data: anuncio_interface[]) => {
          this.anuncios = data;
          this.originalAnuncios = [...this.anuncios];
          this.obterAnuncios();
        },
        error => {
          console.log('Ocorreu um erro ao obter os anúncios:', error);
        }
      );

      this.campanhaService.obter_por_id(usuarioId).subscribe(
        (campanha) => {
          this.minhaCampanha = campanha; // Certifique-se de que campanhas seja um array
          console.log(campanha);
        },
        (error) => {
          console.error('Erro ao obter campanhas:', error);
        }
      );
    }
  }

  excluirAnuncio(anuncio: anuncio_interface): void {
    if (confirm('Tem certeza de que deseja excluir este anúncio?')) {
      this.anuncioService.excluirAnuncio(anuncio.id).subscribe(
        () => {
          // Atualize a lista de anúncios após a exclusão
          this.anuncios = this.anuncios.filter(a => a.id !== anuncio.id);
          this.obterAnuncios();
        },
        (error) => {
          console.error('Erro ao excluir anúncio:', error);
        }
      );
    }
  }

  obterAnuncios() {
    this.totalItems = this.anuncios.length;
    this.anuncios = this.originalAnuncios.filter(anuncio =>
      anuncio.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalItems = this.anuncios.length;
    this.anuncios = this.anuncios.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.obterAnuncios();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalItems / this.pageSize) {
      this.currentPage++;
      this.obterAnuncios();
    }
  }
}
