import { Component,  OnInit,AfterViewInit  } from '@angular/core';

import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { anuncio_interface } from 'src/app/interfaces/anuncio_interface';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { campanha_interface } from 'src/app/interfaces/campanha_interface';
import { CampanhaService } from 'src/app/services/campanha.service';
import {InstituicaoService} from 'src/app/services/instituicao.service'
import { icon, Marker } from 'leaflet';


let map: any;
let marker: google.maps.Marker;
let geocoder: google.maps.Geocoder;
let responseDiv: HTMLDivElement;
let response: HTMLPreElement;
@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.scss']
})



export class InstituicaoComponent implements  OnInit{
  instituicoes: any;
  minhaCampanha: campanha_interface[] = [];
  anuncios: anuncio_interface[] = [];
  coordenadas: string = '';
  nomeInst :string ="";
  
  //versao antiga do mapa
 



  constructor(
    private instituicaoService: InstituicaoService,
    private campanhaService: CampanhaService,
    private anuncioService: AnuncioService,
    private route: ActivatedRoute,
    private router: Router  // Adicione o Router

  ) { }

  ngAfterViewInit(): void {
    // Chama o método initMap após a renderização das visualizações
    

      this.initMap(this.coordenadas);
    
  }
  ngOnInit() {

    
    const userId = this.route.snapshot.params['id'];
    console.log(userId);
    this.obterInstituicaoPorId(userId)
    this.obterAnunciosPorId(userId)
    this.obterCampanhasPorId(userId)


  }

  obterInstituicaoPorId(userId: number) {
    this.instituicaoService.obter_pelo_id(userId).subscribe(
      (response) => {
        this.instituicoes = response;
        this.coordenadas = this.instituicoes.coordenadas;
        this.nomeInst = this.instituicoes.nome
        
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/']); 
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



initMap(coordenada: string) {


  
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


  map = new google.maps.Map(
  
  document.getElementById("mapid") as HTMLElement,
  {
    zoom: 12,
    center:{ lat: latitudeInst, lng: longitudeInst },
  }
);

new google.maps.Marker({
  position: { lat: latitudeInst, lng: longitudeInst },
  map,
  title: "Hello World!",
});










}
}