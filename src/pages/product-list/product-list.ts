import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FilterModalPage } from './filter-modal/filter-modal';
import { ProductProvider } from '../../providers/product/product';
import { API_ENDPOINT } from '../../config/constants';
import { ProductDetailsPage } from '../product-details/product-details';

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  public category;
  public selectedCategory: string;
  public productList;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private productProvider: ProductProvider
  ) {
    this.category = navParams.data;
  }

  ionViewDidLoad() {
    this.switchCategory(this.category.id);
  }

  switchCategory(category) {
    this.selectedCategory = category;
    this.productList = this.productProvider.getAllProducts(category);
  }

  getImage(url) {
    return ''.concat(API_ENDPOINT, '/', url);
  }

  showFilterModal() {
    let modal = this.modalCtrl.create(FilterModalPage);
    modal.present();
  }

  goToDetailsPage(product) {
    this.navCtrl.push(ProductDetailsPage, product);
  }

}
