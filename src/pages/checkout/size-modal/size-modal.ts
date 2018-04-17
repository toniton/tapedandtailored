import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { MeasurementTutorialPage } from '../../measurement-tutorial/measurement-tutorial';

/**
 * Generated class for the FilterModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-size-modal',
  templateUrl: 'size-modal.html',
})
export class SizeModalPage {
  public size = {
    value: '',
    unit: ''
  };

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterModalPage');
  }

  goToMeasurementPage() {
    this.navCtrl.push(MeasurementTutorialPage);
  }

  saveSize(form){
    this.viewCtrl.dismiss(form.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
