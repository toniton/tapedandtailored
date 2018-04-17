import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductListPage } from '../product-list/product-list';
import { CategoryProvider } from '../../providers/category/category';
import { API_ENDPOINT } from '../../config/constants';
import { SLIDE_IN_OUT } from '../../config/animations';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    SLIDE_IN_OUT()
  ]
})
export class HomePage {
  public categories;

  constructor(
    public navCtrl: NavController,
    private category: CategoryProvider
  ) {
  }

  ionViewDidLoad() {
    this.categories = this.category.getMenu().retry(3);
  }

  getImage(url) {
    return API_ENDPOINT.concat('/', url);
  }

  gotoProductList(category) {
    this.navCtrl.push(ProductListPage, category);
  }

}
