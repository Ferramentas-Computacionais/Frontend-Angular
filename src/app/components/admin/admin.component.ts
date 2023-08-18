import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { anuncio_interface } from 'src/app/interfaces/anuncio_interface';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { campanha_interface } from 'src/app/interfaces/campanha_interface';
import { CampanhaService } from 'src/app/services/campanha.service';
import {InstituicaoService} from 'src/app/services/instituicao.service'
import {instituicao_interface} from 'src/app/interfaces/instituicao_interface'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  anunciosNaoValidados: anuncio_interface[] = []; // Array para armazenar anúncios não validados
  campanhasNaoVerificadas: campanha_interface[] = []; // Array para armazenar campanhas não verificadas
  instituicoes: instituicao_interface[] = [];

  registroConcluido = false;
  message = '';
  novoUsuario = { // Defina o novo usuário aqui
    username: '',
    password: ''
  };

  constructor(
    private anuncioService: AnuncioService,
    private autenticacaoService: AutenticacaoService,
    private campanhaService: CampanhaService,
    private InstituicaoService: InstituicaoService,


  ) { }

  ngOnInit(): void {
    this.carregarAnunciosNaoValidados();
    this.carregarCampanhasNaoVerificadas(); // Adicione esta linha


    this.InstituicaoService.obter_admin().subscribe(
      (instituicoes) => {
        this.instituicoes = instituicoes;
      },
      error => {
        console.log('Erro ao obter instituições:', error);
        console.log('consegui chegar aqui')

      }
    );

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
  validarCampanha(campanhaId: number): void {
    this.campanhaService.verificarCampanhaAdmin(campanhaId).subscribe(
      () => {
        // Atualiza a lista de anúncios não validados após a validação
        this.carregarCampanhasNaoVerificadas();
      },
      (error) => {
        console.error('Erro ao validar campanha', error);
      }
    );
  }

  excluirInstituicao(instituicao: instituicao_interface): void {
    if (confirm(`Tem certeza de que deseja excluir a instituição "${instituicao.nome}"?`)) {
      this.InstituicaoService.deletarInstituicao(instituicao.usuario_id).subscribe(
        () => {
          // Remova a instituição da lista após a exclusão
          this.instituicoes = this.instituicoes.filter(inst => inst.usuario_id !== instituicao.usuario_id);
        },
        error => {
          console.error('Erro ao excluir instituição:', error);
        }
      );
    }
  }

  registrarUsuario(): void {
    // Implemente a lógica para criar um novo usuário
    const novoUsuario = {
      username: this.novoUsuario.username,
      password: this.novoUsuario.password
    };

    this.autenticacaoService.criarUsuario(novoUsuario).subscribe(
      () => {
        this.registroConcluido = true;
        this.message = 'usuário criado com sucesso'
        this.novoUsuario.username = '';
        this.novoUsuario.password = '';
      },
      (error) => {
        this.message = 'erro, usuário existente ';
        this.registroConcluido = true;

      }
    );
  }
}
