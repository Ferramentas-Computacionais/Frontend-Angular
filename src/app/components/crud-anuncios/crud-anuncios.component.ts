import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AnuncioService } from 'src/app/services/anuncio.service';
import { anuncio_interface } from 'src/app/interfaces/anuncio_interface';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { campanha_interface } from 'src/app/interfaces/campanha_interface';
import { CampanhaService } from 'src/app/services/campanha.service';
import {InstituicaoService} from 'src/app/services/instituicao.service'

@Component({
  selector: 'app-crud-anuncios',
  templateUrl: './crud-anuncios.component.html',
  styleUrls: ['./crud-anuncios.component.scss']
})
export class CrudAnunciosComponent implements OnInit {
  minhaCampanha: campanha_interface[] = [];
  anuncios: anuncio_interface[] = [];
  originalAnuncios: anuncio_interface[] = []; 
  temInstituicao: boolean = false; 
  novaInstituicao: any = {}; 

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  searchTerm: string = '';
  
  constructor(
    private anuncioService: AnuncioService,
    private campanhaService: CampanhaService,
    private authService: AutenticacaoService,
    private InstituicaoService: InstituicaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioId = Number(localStorage.getItem('usuario_id'));

    if (usuarioId) {
      this.InstituicaoService.verificarInstituicao(usuarioId).subscribe(
        (response) => {
          if (response.message === 'O usuário já possui uma instituição registrada') {
            console.log('Uma instituição já está registrada para este usuário.');
            this.temInstituicao = true;
          } else {
            this.temInstituicao = false;

              }
            
          
        },
        (error) => {
          console.error('Erro ao verificar a instituição:', error);
        }
      );
      this.campanhaService.obter_por_id_admin(usuarioId).subscribe(
        (campanha) => {
          this.minhaCampanha = campanha;
          

        },
        (error) => {
          console.error('Erro ao obter campanhas:', error);
        }
      );
        this.anuncioService.obter_por_id_admin(usuarioId).subscribe(
          (data: anuncio_interface[]) => {
            this.anuncios = data;
            this.originalAnuncios = [...this.anuncios];
          },
          error => {
            console.log('Ocorreu um erro ao obter os anúncios:', error);
          }
        );
    }
  }

  excluirAnuncio(anuncio: anuncio_interface): void {
    if (confirm('Tem certeza de que deseja excluir este anúncio?')) {
      this.anuncioService.excluirAnuncio(anuncio.id).subscribe(
        () => {
          this.anuncios = this.anuncios.filter(a => a.id !== anuncio.id);
          
          // Após a exclusão, chame novamente o método para atualizar a lista de anúncios
          const usuarioId = Number(localStorage.getItem('usuario_id'));
          this.anuncioService.obter_por_id_admin(usuarioId).subscribe(
            (data: anuncio_interface[]) => {
              this.anuncios = data;
              this.originalAnuncios = [...this.anuncios];
            },
            error => {
              console.log('Ocorreu um erro ao obter os anúncios:', error);
            }
          );
        },
        (error) => {
          console.error('Erro ao excluir anúncio:', error);
        }
      );
    }
  }



  onImagemChange(event: any) {
    this.novaInstituicao.imagemFile = event.target.files[0];
  }

  registrarInstituicao(): void {
    const usuarioId = Number(localStorage.getItem('usuario_id'));
    
    if (!usuarioId) {
      console.error('ID de usuário não encontrado.');
      return;
    }
  
    const formData = new FormData();
    formData.append('nome', this.novaInstituicao.nome);
    formData.append('email', this.novaInstituicao.email);
    formData.append('telefone', this.novaInstituicao.telefone);
    formData.append('cnpj', this.novaInstituicao.cnpj);
    formData.append('descricao', this.novaInstituicao.descricao);
    formData.append('coordenadas', this.novaInstituicao.coordenadas);
    formData.append('imagem', this.novaInstituicao.imagemFile);
  

          this.InstituicaoService.criarInstituicao(formData).subscribe(
            (result) => {
              console.log('Nova instituição registrada com sucesso:', result.message);
              // Atualize a variável temInstituicao para true
              this.temInstituicao = true;
              // Atualize a página ou faça qualquer outra ação necessária
            },
            (error) => {
              console.error('Erro ao registrar a instituição:', error);
            }
          );
        }

    
  
  
}
