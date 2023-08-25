import { Component,  OnInit,AfterViewInit  } from '@angular/core';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { anuncio_interface } from 'src/app/interfaces/anuncio_interface';
import { FormsModule } from '@angular/forms'; 
import { data } from 'jquery';


let map: any;
let marker: google.maps.Marker;
let geocoder: google.maps.Geocoder;
let responseDiv: HTMLDivElement;
let response: HTMLPreElement;
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

  ngAfterViewInit(): void {
    // Chama o método initMap após a renderização das visualizações
    
      console.log();
      
      this.initMap( this.coordenadasteste1 );
    
  }
  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    console.log(userId);
    this.obterAnunciosPorId(userId);
  }

  obterAnunciosPorId(userId: number){
    this.anuncioService.obter_por_id_anuncio(userId).subscribe(
      (response)=>{
        this.anuncios = response;
        
        this.coordenadasteste1 = this.anuncios.instituicao.endereco;
        
        this.nomeInst = this.anuncios.instituicoes.nome;
      },
      error => {
        console.log('Ocorreu um erro ao obter os anúncios:', error);
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
   zoom: 15,
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