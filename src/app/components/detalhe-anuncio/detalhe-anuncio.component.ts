import { Component,  OnInit,AfterViewInit  } from '@angular/core';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { icon, Marker } from 'leaflet';
import * as L from 'leaflet';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { anuncio_interface } from 'src/app/interfaces/anuncio_interface';
import { FormsModule } from '@angular/forms'; 
import { data } from 'jquery';

@Component({
  selector: 'app-detalhe-anuncio',
  templateUrl: './detalhe-anuncio.component.html',
  styleUrls: ['./detalhe-anuncio.component.scss']
})
export class DetalheAnuncioComponent  implements  OnInit{
  instituicoes: any;
  coordenadasteste1!: string;
  nomeInst! :string;
  anuncios:any;
   private map!: L.Map;
  


  constructor(
    private instituicaoService: InstituicaoService,
    private route: ActivatedRoute,
   private anuncioService: AnuncioService
  ) { }

  
  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    console.log(userId);
    this.obterInstituicaoPorId(userId)
    this.obterAnunciosPorId(userId);
    



  }
  obterAnunciosPorId(userId: number){
    this.anuncioService.obter_por_id(userId).subscribe(
      (response)=>{
        this.anuncios = response;
      },
      error => {
        console.log('Ocorreu um erro ao obter os anúncios:', error);
      }
    );
  }

  obterInstituicaoPorId(userId: number) {
    this.instituicaoService.obter_pelo_id(userId).subscribe(
      (response) => {
        this.instituicoes = response;
        console.log(this.instituicoes);
        this.coordenadasteste1 = this.instituicoes.coordenadas;
        this.nomeInst = this.instituicoes.nome
        console.log(this.coordenadasteste1);
        this.mostraMapa(this.coordenadasteste1,this.nomeInst );
         // atribui o resultado à variável instituicoea
      },
      (error) => {
        console.log(error);
      }
    );
  }






//mapa

mostraMapa(coordenada:string, nomeInst:string) {
  let cordInsti1 = coordenada;
  console.log(cordInsti1);
  
 
console.log(cordInsti1,"teste1");

let cordInsti = String(cordInsti1);

console.log(cordInsti,"teste2");

  const coordenadasArray = cordInsti.split(",");
  const coordenadasArraynum = coordenadasArray.map(parseFloat);
  console.log(coordenadasArraynum, "teste arraynum");
  


  const sucesso = (pos: GeolocationPosition) => {
    if (this.map === undefined) {
      this.map = L.map('mapid').setView([coordenadasArraynum[0],coordenadasArraynum[1]], 20);
      
    } else {
      this.map.remove();
      this.map = L.map('mapid').setView([coordenadasArraynum[0],coordenadasArraynum[1]], 20);
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(this.map)
      .bindPopup('Você esta aqui!')
      .openPopup();

    L.marker([coordenadasArraynum[0],coordenadasArraynum[1]]).addTo(this.map)
      .bindPopup(this.nomeInst)
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