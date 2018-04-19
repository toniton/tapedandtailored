import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  GoogleMapsMapTypeId
} from '@ionic-native/google-maps';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map_canvas') mapElement: ElementRef;
  map: GoogleMap;
  private callback: (any) => Observable<any>;
  public tailors = [{
    id: 1,
    name: 'Ademola Adetokunbo',
    rating: new Array(5),
    geolocation: [
      9.072264,
      7.491302
    ]
  },{
    id: 2,
    name: 'Pius Anyim',
    rating: new Array(4),
    geolocation: [
      9.0535390,
      7.4602490
    ]
  }];
  public selectedTailor;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps,
    private ngZone: NgZone
  ) {
    this.callback = this.navParams.get("callback");
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  watchGeolocation() {
    this.geolocation.getCurrentPosition().then((data) => {
      this.map.setOptions({
        mapTypeId: GoogleMapsMapTypeId.ROADMAP,
        camera: {
          target: {
            lat: data.coords.latitude,
            lng: data.coords.longitude
          },
          zoom: 15,
          tilt: 20
        }
      });
      for(let tailor of this.tailors){
        this.addTailorToMap(tailor.id);
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      mapTypeId: GoogleMapsMapTypeId.ROADMAP
    };
    let element: HTMLElement = document.getElementById('map_canvas');

    this.map = GoogleMaps.create(element, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.on(GoogleMapsEvent.MAP_READY)
      .subscribe(() => {
        console.log('Map is ready!');
        // Now you can use all methods safely.
        this.watchGeolocation();
      });
  }

  addTailorToMap(id) {
    let self = this;
    let tailor = this.tailors.find((x) => x.id === id);
    if(tailor){
      this.map.addMarker({
        title: tailor.name,
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: tailor.geolocation[0],
          lng: tailor.geolocation[1]
        }
      }).then((marker:Marker) => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            self.ngZone.run(()=>this.selectedTailor = tailor);
            self.map.setOptions({
              mapTypeId: GoogleMapsMapTypeId.ROADMAP,
              camera: {
                target: {
                  lat: tailor.geolocation[0],
                  lng: tailor.geolocation[1]
                },
                zoom: 16,
                tilt: 20
              }
            });
          });
      });
    }
  }

  selectTailor(tailor) {
    this.callback(tailor).subscribe(() => {
      this.navCtrl.pop();
    });
  }
}