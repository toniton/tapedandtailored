import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { StyleModalPage } from './style-modal/style-modal';
import { SizeModalPage } from './size-modal/size-modal';
import { TailorModalPage } from './tailor-modal/tailor-modal';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the CheckoutPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
  public styles = [];
  public sizes = [];
  public tailor = {};


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) { }


  openMapPage() {
    this.navCtrl.push(MapPage);
  }

  showStyleModal(product) {
    let modal = this.modalCtrl.create(StyleModalPage);
    modal.onDidDismiss(data => {
      if (data) {
        if (JSON.stringify(data) !== '{}') {
          this.styles.push(data);
        }
      }
    });
    modal.present();
  }

  deleteStyle(style) {
    const index = this.styles.findIndex((x) => x === style);
    this.styles.splice(index, 1);
  }

  showSizeModal(product) {
    let modal = this.modalCtrl.create(SizeModalPage);
    modal.onDidDismiss((data) => {
      if (data) {
        if (JSON.stringify(data) !== '{}') {
          this.sizes.push(data);
        }
      }
    });
    modal.present();
  }

  deleteSize(size) {
    const index = this.sizes.findIndex((x) => x === size);
    this.sizes.splice(index, 1);
  }

  showTailorModal(product) {
    this.navCtrl.push(MapPage, {
      callback: this.tailorCallback
    });
  }

  tailorCallback(tailor) {
    let self = this;
    self.tailor = tailor;
    return Observable.create((observer) => {
      if (tailor) {
        self.tailor = tailor;
        observer.next(tailor);
      } else {
        observer.error(new Error("error message"));
      }
      observer.complete();
    });
  }
}
