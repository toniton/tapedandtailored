import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the FilterModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tailor-modal',
  templateUrl: 'tailor-modal.html',
})
export class TailorModalPage {
  @ViewChild('map_canvas') mapElement: ElementRef;
  map: GoogleMap;
  public tailor = {
    id: '',
    name: '',
    description: ''
  };

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController, 
    private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    setTimeout(()=>this.loadMap(), 3000);
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
    let element: HTMLElement = document.getElementById('map_canvas');

    this.map = GoogleMaps.create(element, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }
  saveTailor(form) {
    this.viewCtrl.dismiss(form.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
