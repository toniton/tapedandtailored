import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { API_ENDPOINT } from '../../config/constants';
import { CheckoutPage } from '../checkout/checkout';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  public product;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  getImage(url) {
    return ''.concat(API_ENDPOINT, '/', url);
  }

  goToCheckoutPage(product) {
    this.navCtrl.push(CheckoutPage, product);
  }

}
