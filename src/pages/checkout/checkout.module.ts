import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPage } from './checkout';
import { InfoPageModule } from '../info/info.module';
import { ReviewPageModule } from '../review/review.module';
import { StyleModalPage } from './style-modal/style-modal';
import { SizeModalPage } from './size-modal/size-modal';
import { TailorModalPage } from './tailor-modal/tailor-modal';

@NgModule({
  declarations: [
    CheckoutPage,
    StyleModalPage,
    SizeModalPage,
    TailorModalPage
  ],
  imports: [
    InfoPageModule,
    ReviewPageModule,
    IonicPageModule.forChild(CheckoutPage),
  ]
})
export class CheckoutPageModule {}
