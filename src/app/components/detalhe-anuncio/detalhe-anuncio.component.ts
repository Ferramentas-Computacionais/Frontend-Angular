import { Component,  OnInit,AfterViewInit  } from '@angular/core';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { anuncio_interface } from 'src/app/interfaces/anuncio_interface';
import { FormsModule } from '@angular/forms'; 
import { data } from 'jquery';

declare var google: any;

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
  private map!:any;

  


  constructor(
    private instituicaoService: InstituicaoService,
    private route: ActivatedRoute,
   private anuncioService: AnuncioService
  ) { }

  
  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    console.log(userId);
    this.obterAnunciosPorId(userId);
    



  }
  obterAnunciosPorId(userId: number){
    this.anuncioService.obter_por_id_anuncio(userId).subscribe(
      (response)=>{
        this.anuncios = response;
        this.coordenadasteste1 = this.anuncios.instituicao.coordenada;
        this.nomeInst = this.anuncios.instituicoes.nome
        this.mostraMapa(this.coordenadasteste1,this.nomeInst );
      },
      error => {
        console.log('Ocorreu um erro ao obter os anúncios:', error);
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
  
const latitudeInst = parseFloat(coordenadasArray[0]);
const longitudeInst = parseFloat(coordenadasArray[1]);

const mapOptions = {
  center: { lat: latitudeInst, lng: longitudeInst },
  zoom: 8
};

  const sucesso = (pos: GeolocationPosition) => {

    if (this.map === undefined) {
      const map = new google.maps.Map(document.getElementById('mapid'), {
        center: { lat:coordenadasArraynum[0], lng: coordenadasArraynum[1] },
        zoom: 20
       
        
      });
      console.log("carregou mapa");
      
    } else {
      this.map.remove();
      const map = new google.maps.Map(document.getElementById('mapid'), {
        center: { lat:coordenadasArraynum[0], lng: coordenadasArraynum[1] },
        zoom: 20
      });
      console.log("carregou de novo");

    }

    
    // marcador da instituição
    var marker = new google.maps.Marker({
      position: {lat:coordenadasArraynum[0], lng: coordenadasArraynum[1] },
      map: this.map,
      title: this.nomeInst
      
      
    });
    
     //marcador da posição do individuo
    const markervc = new google.maps.Marker({
      position: {lat:pos.coords.latitude, lng: pos.coords.longitude},
      map: this.map,
      title:'Você esta aqui!'
    });

   
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