import { Component,  OnInit,AfterViewInit  } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { anuncio_interface } from 'src/app/interfaces/anuncio_interface';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { campanha_interface } from 'src/app/interfaces/campanha_interface';
import { CampanhaService } from 'src/app/services/campanha.service';
import {InstituicaoService} from 'src/app/services/instituicao.service'

@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.scss']
})
export class InstituicaoComponent implements  OnInit{
  instituicoes: any;
  minhaCampanha: campanha_interface[] = [];
  anuncios: anuncio_interface[] = [];
  coordenadasteste1!: string;
  nomeInst! :string;
  //versao antiga do mapa
   private map!: L.Map;
  


  constructor(
    private instituicaoService: InstituicaoService,
    private campanhaService: CampanhaService,
    private anuncioService: AnuncioService,
    private route: ActivatedRoute
  ) { }

  
  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    console.log(userId);
    this.obterInstituicaoPorId(userId)
    this.obterAnunciosPorId(userId)
    this.obterCampanhasPorId(userId)
    //mapa

    //this.initMap();


  }
  //ngAfterViewInit() {
   // this.mostraMapa();
//  }

  obterInstituicaoPorId(userId: number) {
    this.instituicaoService.obter_pelo_id(userId).subscribe(
      (response) => {
        this.instituicoes = response;
        this.coordenadasteste1 = this.instituicoes.coordenadas;
        this.nomeInst = this.instituicoes.nome
         // atribui o resultado à variável instituicoes
      },
      (error) => {
        console.log(error);
      }
    );
  }
  obterCampanhasPorId(userId: number) {
    this.campanhaService.obter_por_id(userId).subscribe(
      (response) => {
        this.minhaCampanha = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obterAnunciosPorId(userId: number) {
    this.anuncioService.obter_por_id(userId).subscribe(
      (response) => {
        this.anuncios = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }







}