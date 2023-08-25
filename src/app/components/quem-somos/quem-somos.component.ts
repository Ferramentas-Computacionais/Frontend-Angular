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

  

  
}