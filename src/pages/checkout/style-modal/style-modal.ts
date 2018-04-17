import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the FilterModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-style-modal',
  templateUrl: 'style-modal.html',
})
export class StyleModalPage {
  public style = {
    name: '',
    description: ''
  };

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterModalPage');
  }

  saveStyle(form){
    this.viewCtrl.dismiss(form.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
