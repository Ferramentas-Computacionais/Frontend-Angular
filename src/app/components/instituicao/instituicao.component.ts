import { Component,  OnInit,AfterViewInit  } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { anuncio_interface } from 'src/app/interfaces/anuncio_interface';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { campanha_interface } from 'src/app/interfaces/campanha_interface';
import { CampanhaService } from 'src/app/services/campanha.service';
import {InstituicaoService} from 'src/app/services/instituicao.service'
import { icon, Marker } from 'leaflet';

//import * as L from 'leaflet';
declare var google: any;
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
 



  constructor(
    private instituicaoService: InstituicaoService,
    private campanhaService: CampanhaService,
    private anuncioService: AnuncioService,
    private route: ActivatedRoute
  ) { }

  
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
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
        this.mostraMapa(this.coordenadasteste1,this.nomeInst );

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

//mapa

options: google.maps.MapOptions = {
  zoom :12,
  mapTypeId: 'hybrid',
  zoomControl: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  maxZoom: 15,
  minZoom: 2,
  center: google.maps.LatLngLiteral
};
center!:  google.maps.LatLngLiteral;
mostraMapa(coordenada:string, nomeInst:string){
  //essa gambiarra aqui é so pra dividir a string das coordenadas
  let cordInsti1 = coordenada;
   console.log(cordInsti1);
  
 
 console.log(cordInsti1,"teste1");

 let cordInsti = String(cordInsti1);

 console.log(cordInsti,"teste2");

   const coordenadasArray = cordInsti.split(",");
   const coordenadasArraynum = coordenadasArray.map(parseFloat);
   console.log(coordenadasArraynum, "teste arraynum");
  
 const latitudeInst = parseFloat(coordenadasArray[0]);
 const longitudeInst = parseFloat(coordenadasArray[1]);
//fim da gambiarra


 

}






// mostraMapa(coordenada:string, nomeInst:string) {
//   let cordInsti1 = coordenada;
//   console.log(cordInsti1);
  
 
// console.log(cordInsti1,"teste1");

// let cordInsti = String(cordInsti1);

// console.log(cordInsti,"teste2");

//   const coordenadasArray = cordInsti.split(",");
//   const coordenadasArraynum = coordenadasArray.map(parseFloat);
//   console.log(coordenadasArraynum, "teste arraynum");
  
// const latitudeInst = parseFloat(coordenadasArray[0]);
// const longitudeInst = parseFloat(coordenadasArray[1]);

// const mapOptions = {
//   center: { lat: latitudeInst, lng: longitudeInst },
//   zoom: 8
// };

//   const sucesso = (pos: GeolocationPosition) => {
//     // marcador da instituição
//     var marker = new google.maps.Marker({
//       position: {lat:coordenadasArraynum[0], lng: coordenadasArraynum[1] },
//       map: this.map,
//       title: this.nomeInst
      
      
//     });
    
//      //marcador da posição do individuo
//     const markervc = new google.maps.Marker({
//       position: {lat:pos.coords.latitude, lng: pos.coords.longitude},
//       map: this.map,
//       title:'Você esta aqui!'
//     });

//     if (this.map === undefined) {
//       const map = new google.maps.Map(document.getElementById('mapid'), {
//         center: { lat:coordenadasArraynum[0], lng: coordenadasArraynum[1] },
//         zoom: 20
       
        
//       });
     

//       console.log("carregou mapa");
      
//     } else {
//       this.map.remove();
//       const map = new google.maps.Map(document.getElementById('mapid'), {
//         center: { lat:coordenadasArraynum[0], lng: coordenadasArraynum[1] },
//         zoom: 20
//       });
//       console.log("carregou de novo");

//     }
//     marker.addListener("click", () => {
//       this.map.setZoom(8);
//       this.map.setCenter(marker.getPosition() as google.maps.LatLng);
//     });

    

   
//   };

//   function erro(err: GeolocationPositionError) {
//   console.log(err);
//   }

//   const watchID = navigator.geolocation.watchPosition(sucesso, erro, {
//     enableHighAccuracy: true,
//     timeout: 5000
//   });
// }






}