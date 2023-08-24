import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

  let map: any;
  let marker: google.maps.Marker;
  let geocoder: google.maps.Geocoder;
  let responseDiv: HTMLDivElement;
  let response: HTMLPreElement;
  
@Component({
  selector: 'app-quem-somos',
  templateUrl: './quem-somos.component.html',
  styleUrls: ['./quem-somos.component.scss']
})

export class QuemSomosComponent {
  coordenadas: string = ''; 
  

  ngOnInit() {
   this.initMap();
    console.log("carregou ");
    
  }
  
   initMap(): void {
    console.log("ate aqui 1");
    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 12,
      center: {  lat: -8.058652899035927,  lng: -34.903513703444595 },
      mapTypeControl: false,
    });
    console.log("ate aqui 2");
    
    geocoder = new google.maps.Geocoder();
  
    const inputText = document.createElement("input");
  
    inputText.type = "text";
    inputText.placeholder = "Enter a location";
  
    const submitButton = document.createElement("input");
  
    submitButton.type = "button";
    submitButton.value = "Geocode";
    submitButton.classList.add("button", "button-primary");
  
    const clearButton = document.createElement("input");
  
    clearButton.type = "button";
    clearButton.value = "Clear";
    clearButton.classList.add("button", "button-secondary");
  
    response = document.createElement("pre");
    response.id = "response";
    response.innerText = "";
  
    responseDiv = document.createElement("div");
    responseDiv.id = "response-container";
    responseDiv.appendChild(response);
  
    const instructionsElement = document.createElement("h4");
  
    instructionsElement.id = "instructions";
  
    instructionsElement.innerHTML =
      "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
  
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
  
    marker = new google.maps.Marker({
      map,
    });
  
    map.addListener("click", (e: google.maps.MapMouseEvent) => {
     var a = this.geocode({ location: e.latLng });
     console.log(a,"aqui ta as coordenadas");
     
     
      
    });
  
    submitButton.addEventListener("click", () =>
    this.geocode({ address: inputText.value })
    );
  
    clearButton.addEventListener("click", () => {
      this.clear();
    });
  
    this.clear();
  }
  
   clear() {
    marker.setMap(null);
    responseDiv.style.display = "none";
  }
  
   geocode(request: google.maps.GeocoderRequest): void {
    this.clear();
  
    geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;
        
        //aqui ele recebe as coordenadas
        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
        
        
        
        
       
        

        marker.setMap(map);
        responseDiv.style.display = "block";
        //response.innerText = JSON.stringify(result, null, 2);
        console.log(result)
        const firstResult = result.results[0];

        // Extraindo as coordenadas (latitude e longitude) do primeiro resultado
        const location = firstResult.geometry.location;
        
        const latitude = location.lat();
        const longitude = location.lng();
        
        console.log(`${latitude},${longitude}`);
        this.coordenadas = `${latitude}, ${longitude}`;
        
        //aqui ele retorna o endereço
        console.log(results[0].formatted_address,"resultados");
       
        
        return results
       
        
      })

      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
      });
  }
  




}