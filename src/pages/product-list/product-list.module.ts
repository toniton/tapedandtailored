import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductListPage } from './product-list';
import { FormsModule } from '@angular/forms';
import { FilterModalPage } from './filter-modal/filter-modal';

@NgModule({
  declarations: [
    ProductListPage,
    FilterModalPage
  ],
  imports: [
    IonicPageModule.forChild(ProductListPage),
  ]
})
export class ProductListPageModule {}
