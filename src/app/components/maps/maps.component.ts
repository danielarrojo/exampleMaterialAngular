import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  lat!:number;
  lng!:number;
  zoom!:number;
  mapType:any;
  address:string | undefined;

  mapForm:FormGroup;

  public appearance = Appearance;

  constructor(private mapsAPILoader: MapsAPILoader) { 
    this.mapForm = this.buildForm();
  }

  ngOnInit(): void {
    this.setLocation( 36.73376012605022,-4.426672552725525,18,'hybrid');
  }

  buildForm(){
    return new FormGroup({
      lat: new FormControl('',[Validators.required]),
      lng: new FormControl('',[Validators.required]),
      mapType: new FormControl('',[Validators.required]),
      zoom: new FormControl('',[Validators.required])
    })
  }

  onAutocompleteSelected(result: PlaceResult){
    console.log('onAutocompleteSelected : ', result);
    this.address = result.formatted_address?.toString();
  }

  onLocationSelected(location: Location){
    console.log('onLocationSelected : ', location);
    this.lat = location.latitude;
    this.lng = location.longitude;
  }

  setPosition(){
    this.setLocation(
      this.mapForm.controls['lat'].value, 
      this.mapForm.controls['lng'].value, 
      this.mapForm.controls['zoom'].value,
      this.mapForm.controls['mapType'].value
    );
  }

  setLocation(lat:number, lng:number, zoom:number, mapType:any){
      this.lat = lat;
      this.lng = lng;
      this.zoom = zoom;
      this.mapType = mapType;
      this.getAddress(this.lat, this.lng);
  }
  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition(position => {
      this.setLocation(position.coords.latitude, position.coords.longitude, 18, 'roadmap');
    })
  }

  getAddress(lat:number, lng:number){
    this.mapsAPILoader.load().then(() =>{
      let geocoder = new google.maps.Geocoder;
      let latlng = {lat:lat, lng:lng};
      geocoder.geocode({'location':latlng},(results) =>{
          if(results[0]){
            console.log(results);
            this.address = results[0].formatted_address;
          } else {
            alert('No results found');
          }
      });
    }

    )
  }



}
