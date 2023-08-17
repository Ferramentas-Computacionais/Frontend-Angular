import { Component,  OnInit,AfterViewInit  } from '@angular/core';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
      },
      error => {
        console.log('Ocorreu um erro ao obter os anúncios:', error);
      }
    );
  }






}