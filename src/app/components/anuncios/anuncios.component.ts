import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { anuncio_interface } from 'src/app/interfaces/anuncio_interface';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 2;
  totalItems: number = 0;

  searchTerm: string = '';
  sortBy: string = 'mais-recentes';

  anuncios: anuncio_interface[] = [];
  originalAnuncios: anuncio_interface[] = []; 

  constructor(private anuncioService: AnuncioService) {}

  ngOnInit() {
    this.obterAnuncios();
    this.originalAnuncios = [...this.anuncios];

  }

  obterAnuncios() {
    this.anuncioService.obter().subscribe(
      (data: anuncio_interface[]) => {
        this.totalItems = data.length;
        this.originalAnuncios = data;
        this.anuncios = this.originalAnuncios.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      },
      error => {
        console.log('Ocorreu um erro ao obter os anúncios:', error);
      }
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
  searchAnuncios() {
    if (this.searchTerm !== "") {
      this.anuncios = this.originalAnuncios.filter(anuncio =>
        anuncio.nome.toLowerCase().includes(this.searchTerm.toLowerCase()),
        console.log(this.anuncios)
      );
  
      this.totalItems = this.anuncios.length; 
      this.currentPage = 1; 
      this.paginateAnuncios(); 
    } else {
      this.currentPage = 1; 
      this.totalItems = this.originalAnuncios.length; // Atualizar o total de itens
      this.paginateAnuncios(); 
    }
  }
  paginateAnuncios() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;
    this.anuncios = this.anuncios.slice(startIndex, endIndex);
  }
  sortAnuncios() {
    // Lógica para ordenar os anúncios com base no valor de 'sortBy'
    // Atualize a lista 'anuncios' com os resultados ordenados
  }

}
