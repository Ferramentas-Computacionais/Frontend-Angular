import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { campanha_interface } from 'src/app/interfaces/campanha_interface'; 
import { CampanhaService } from 'src/app/services/campanha.service'; 

import { anuncio_interface } from 'src/app/interfaces/anuncio_interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  anunciosNaoValidados: anuncio_interface[] = []; // Array para armazenar anúncios não validados
  campanhasNaoVerificadas: campanha_interface[] = []; // Array para armazenar campanhas não verificadas

  novoUsuario = { // Defina o novo usuário aqui
    username: '',
    password: ''
  };

  constructor(
    private anuncioService: AnuncioService,
    private autenticacaoService: AutenticacaoService,
    private campanhaService: CampanhaService 

  ) { }

  ngOnInit(): void {
    this.carregarAnunciosNaoValidados();
    this.carregarCampanhasNaoVerificadas(); // Adicione esta linha

  }

  carregarAnunciosNaoValidados(): void {
    this.anuncioService.obterAnunciosAdmin().subscribe(
      (data) => {
        // Filtra apenas os anúncios não validados
        this.anunciosNaoValidados = data
      },
      (error) => {
        console.error('Erro ao carregar anúncios não validados', error);
      }
    );
  }
  carregarCampanhasNaoVerificadas(): void {
    this.campanhaService.obterCampanhasNaoVerificadas().subscribe(
      (data) => {
        // Filtra apenas as campanhas não verificadas
        this.campanhasNaoVerificadas = data
      },
      (error) => {
        console.error('Erro ao carregar campanhas não verificadas', error);
      }
    );
  }

  validarAnuncio(anuncioId: number): void {
    this.anuncioService.verificarAnuncioAdmin(anuncioId).subscribe(
      () => {
        // Atualiza a lista de anúncios não validados após a validação
        this.carregarAnunciosNaoValidados();
      },
      (error) => {
        console.error('Erro ao validar anúncio', error);
      }
    );
  }

  registrarUsuario(): void {
    // Implemente a lógica para criar um novo usuário
    const novoUsuario = {
      username: this.novoUsuario.username,
      password: this.novoUsuario.password
    };

    this.autenticacaoService.criarUsuario(novoUsuario).subscribe(
      () => {
        // Lógica de sucesso, se necessário
      },
      (error) => {
        console.error('Erro ao criar usuário', error);
      }
    );
  }
}
