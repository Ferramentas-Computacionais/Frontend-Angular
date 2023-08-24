import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

import { AnuncioService } from 'src/app/services/anuncio.service';
import { anuncio_interface } from 'src/app/interfaces/anuncio_interface';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { campanha_interface } from 'src/app/interfaces/campanha_interface';
import { CampanhaService } from 'src/app/services/campanha.service';
import {InstituicaoService} from 'src/app/services/instituicao.service'
import { LatLng } from 'leaflet';
//variaveis usadas no mapa
let teste: string ="rua 100 caetes 1";
let map: any;
let marker: google.maps.Marker;
let geocoder: google.maps.Geocoder;
let responseDiv: HTMLDivElement;
let response: HTMLPreElement;
@Component({
  selector: 'app-crud-anuncios',
  templateUrl: './crud-anuncios.component.html',
  styleUrls: ['./crud-anuncios.component.scss']
})
export class CrudAnunciosComponent implements OnInit {
  minhaCampanha: campanha_interface[] = [];
  anuncios: anuncio_interface[] = [];
  originalAnuncios: anuncio_interface[] = []; 
  temInstituicao: boolean = false; 
  novaInstituicao: any = {}; 

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  searchTerm: string = '';
  
  constructor(
    private anuncioService: AnuncioService,
    private campanhaService: CampanhaService,
    private authService: AutenticacaoService,
    private InstituicaoService: InstituicaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
  var  coord =  this.initMap(teste);
  console.log(coord,"oithcua");
  
    console.log("carregou ");
    const usuarioId = Number(localStorage.getItem('usuario_id'));

    if (usuarioId) {
      this.InstituicaoService.verificarInstituicao(usuarioId).subscribe(
        (response) => {
          if (response.message === 'O usuário já possui uma instituição registrada') {
            console.log('Uma instituição já está registrada para este usuário.');
            this.temInstituicao = true;
          } else {
            this.temInstituicao = false;

              }
            
          
        },
        (error) => {
          console.error('Erro ao verificar a instituição:', error);
        }
      );
      this.campanhaService.obter_por_id_admin(usuarioId).subscribe(
        (campanha) => {
          this.minhaCampanha = campanha;
          

        },
        (error) => {
          console.error('Erro ao obter campanhas:', error);
        }
      );
        this.anuncioService.obter_por_id_admin(usuarioId).subscribe(
          (data: anuncio_interface[]) => {
            this.anuncios = data;
            this.originalAnuncios = [...this.anuncios];
          },
          error => {
            console.log('Ocorreu um erro ao obter os anúncios:', error);
          }
        );
    }
  }

  excluirAnuncio(anuncio: anuncio_interface): void {
    if (confirm('Tem certeza de que deseja excluir este anúncio?')) {
      this.anuncioService.excluirAnuncio(anuncio.id).subscribe(
        () => {
          this.anuncios = this.anuncios.filter(a => a.id !== anuncio.id);
          
          // Após a exclusão, chame novamente o método para atualizar a lista de anúncios
          const usuarioId = Number(localStorage.getItem('usuario_id'));
          this.anuncioService.obter_por_id_admin(usuarioId).subscribe(
            (data: anuncio_interface[]) => {
              this.anuncios = data;
              this.originalAnuncios = [...this.anuncios];
            },
            error => {
              console.log('Ocorreu um erro ao obter os anúncios:', error);
            }
          );
        },
        (error) => {
          console.error('Erro ao excluir anúncio:', error);
        }
      );
    }
  }
  excluirCampanha(campanha: campanha_interface): void {
    if (confirm('Tem certeza de que deseja excluir esta campanha?')) {
      this.campanhaService.excluirCampanha(campanha.id).subscribe(
        () => {
          this.minhaCampanha = this.minhaCampanha.filter(a => a.id !== campanha.id);
          
          // Após a exclusão, chame novamente o método para atualizar a lista de anúncios
          const usuarioId = Number(localStorage.getItem('usuario_id'));
          this.campanhaService.obter_por_id_admin(usuarioId).subscribe(
            (data: campanha_interface[]) => {
              this.minhaCampanha = data;
            },
            error => {
              console.log('Ocorreu um erro ao obter as campanhas', error);
            }
          );
        },
        (error) => {
          console.error('Erro ao excluir campanha', error);
        }
      );
    }
  }



  onImagemChange(event: any) {
    this.novaInstituicao.imagemFile = event.target.files[0];
  }

  registrarInstituicao(): void {
    
    
    const usuarioId = Number(localStorage.getItem('usuario_id'));
    
    if (!usuarioId) {
      console.error('ID de usuário não encontrado.');
      return;
    }
  
    const formData = new FormData();
    formData.append('nome', this.novaInstituicao.nome);
    formData.append('email', this.novaInstituicao.email);
    formData.append('telefone', this.novaInstituicao.telefone);
    formData.append('cnpj', this.novaInstituicao.cnpj);
    formData.append('descricao', this.novaInstituicao.descricao);
    formData.append('coordenadas', this.novaInstituicao.coordenadas);
    formData.append('imagem', this.novaInstituicao.imagemFile);


          this.InstituicaoService.criarInstituicao(formData).subscribe(
            (result) => {
              console.log('Nova instituição registrada com sucesso:', result.message);
              // Atualize a variável temInstituicao para true
              this.temInstituicao = true;
              // Atualize a página ou faça qualquer outra ação necessária
            },
            (error) => {
              console.error('Erro ao registrar a instituição:', error);
            }
          );
        }

    //******************
    //Aqui começa o mapa
    //******************
    initMap(teste:string) {
      console.log("ate aqui 1");
      map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        zoom: 8,
        center: { lat: -8.058652899035927,  lng:  -8.058652899035927},
        mapTypeControl: false,
      });
      console.log("ate aqui 2");
      geocoder = new google.maps.Geocoder();
      const inputText = document.createElement("input");
    
      inputText.type = "text";
      inputText.placeholder = "Digite o Endereço";
    
      const submitButton = document.createElement("input");
    
      submitButton.type = "button";
      submitButton.value = "Buscar";
      submitButton.classList.add("button", "button-primary");
    
      const clearButton = document.createElement("input");
    
      clearButton.type = "button";
      clearButton.value = "Limpar";
      clearButton.classList.add("button", "button-secondary");
    
      //mostra os dados na tela
       response = document.createElement("pre");
       response.id = "response";
       response.innerText = "";
    
      responseDiv = document.createElement("div");
      responseDiv.id = "response-container";
      responseDiv.appendChild(response);
    
      const instructionsElement = document.createElement("h4");
    
      instructionsElement.id = "instructions";
    
      instructionsElement.innerHTML =
        "<strong>Instructions</strong>:Digite um endereço ou Clique no mapa para inserir a Localização da Sua instituição";
        //gambiarra
        const inicia = document.createElement("input")
        inicia.type = "button";

        inicia.value = "gambiarra";
        inicia.classList.add("button", "button-primary");

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(inicia);

      marker = new google.maps.Marker({
        map,
      });
        this.converte(teste);


      var ab = inicia.addEventListener("click",(a:any) => {
        var a:any  = this.geocode({ address: teste})
        console.log(a,"se funcionar eu choro");
        
      });
      









      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        this.geocode({ location: e.latLng });
       
        
      });
    
      submitButton.addEventListener("click", () =>
      this.geocode({ address: inputText.value })
      
      
      );
    
      clearButton.addEventListener("click", () => {
        this.clear();
      });
      console.log(ab,"oioioi");

      return ab;
      this.clear();
      
    }

    converte(teste:any){
        var real = this.geocode({ address: teste })
        console.log(real,"isso ai ");
        
        console.log(teste,"oq mais");
        
      new google.maps.Marker({
        position: teste,
        map,
        title:"vasco da gama"
      });
      marker.setMap

    }
    
     clear() {
      marker.setMap(null);
      responseDiv.style.display = "none";
    }
    
     geocode(request: google.maps.GeocoderRequest){
      this.clear();
    
      geocoder
        .geocode(request)
        .then((result) => {
          const { results } = result;
          
          //aqui ele recebe as coordenadas
          map.setCenter(results[0].geometry.location);
          console.log(results[0].geometry.location);
          
          marker.setPosition(results[0].geometry.location);
          marker.setMap(map);
          responseDiv.style.display = "block";
         // response.innerText = JSON.stringify(result, null, 2);
  
  
          //aqui ele retorna o endereço
          console.log(results[0].formatted_address,"resultados");
         
          
          return results[0].formatted_address
         
          
        })
  
        .catch((e) => {
          alert("Geocode was not successful for the following reason: " + e);
        });
  
  
      }
    }
