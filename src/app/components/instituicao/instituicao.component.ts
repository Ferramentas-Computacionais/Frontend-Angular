import { Component,  OnInit  } from '@angular/core';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
// @ts-ignore
import { mostraMapa } from 'src/app/scripts/mapa.ts';

import * as L from 'leaflet';


@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.scss']
})
export class InstituicaoComponent implements  OnInit  {
  instituicoes: any;
  
  private map!: L.Map;
  private centroid: L.LatLngExpression = [42.3601, -71.0589]; //

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  
  }


  constructor(
    private instituicaoService: InstituicaoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    console.log(userId);
    this.obterInstituicaoPorId(userId)
    //mapa
    mostraMapa();
    //this.initMap();


  }
  
  obterInstituicaoPorId(userId: number) {
    this.instituicaoService.obter_pelo_id(userId).subscribe(
      (response) => {
        this.instituicoes = response; // atribui o resultado à variável instituicoes
      },
      (error) => {
        console.log(error);
      }
    );
  }
//mapa

}