import { Component,  OnInit,AfterViewInit  } from '@angular/core';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
// @ts-ignore
//import { mostraMapa } from 'src/app/scripts/mapa.ts';

import * as L from 'leaflet';


@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.scss']
})
export class InstituicaoComponent implements  OnInit, AfterViewInit {
  instituicoes: any;
  //versao antiga do mapa
   private map!: L.Map;
  


  constructor(
    private instituicaoService: InstituicaoService,
    private route: ActivatedRoute
  ) { }

  
  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    console.log(userId);
    this.obterInstituicaoPorId(userId)
    //mapa

    //this.initMap();


  }
  ngAfterViewInit() {
    this.mostraMapa();
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





  public coordenada!: number;
  coord(coordenada: number) {
    console.log(coordenada);
    return coordenada
   }
//mapa
mostraMapa() {
  let cordInsti1 = this.coord;
  const latitude = -8.0592530792899;
  const longitude = -34.90333667809201;
console.log(cordInsti1,"teste1");

let cordInsti = String(cordInsti1);

console.log(cordInsti,"teste2");

  const coordenadasArray = cordInsti.split(",");
  const coordenadasArraynum = coordenadasArray.map(parseFloat);
//const latitudeInst = parseFloat(coordenadasArray[0]);
//const longitudeInst = parseFloat(coordenadasArray[1]);

//const coordenadas: L.LatLngExpression = [latitude, longitude];

  const sucesso = (pos: GeolocationPosition) => {
    //console.log(pos.coords.latitude, pos.coords.longitude);
    if (this.map === undefined) {
      this.map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 20);
    } else {
      this.map.remove();
      this.map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 20);
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(this.map)
      .bindPopup('Eu estou aqui!')
      .openPopup();

    L.marker(coordenadasArraynum as L.LatLngTuple).addTo(this.map)
      .bindPopup('A Poli esta aqui')
      .openPopup();
  };

  function erro(err: GeolocationPositionError) {
    console.log(err);
  }

  const watchID = navigator.geolocation.watchPosition(sucesso, erro, {
    enableHighAccuracy: true,
    timeout: 5000
  });
}


}