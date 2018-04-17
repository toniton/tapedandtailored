import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { OnboardingPageModule } from '../pages/onboarding/onboarding.module';
import { CategoryProvider } from '../providers/category/category';
import { ProductListPage } from '../pages/product-list/product-list';
import { ProductListPageModule } from '../pages/product-list/product-list.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideoPlayer } from '@ionic-native/video-player';
import { FilterModalPage } from '../pages/product-list/filter-modal/filter-modal';
import { MeasurementTutorialPage } from '../pages/measurement-tutorial/measurement-tutorial';
import { VideoMeasurementPage } from '../pages/video-measurement/video-measurement';
import { VideoMeasurementPageModule } from '../pages/video-measurement/video-measurement.module';
import { MeasurementTutorialPageModule } from '../pages/measurement-tutorial/measurement-tutorial.module';
import { Gyroscope } from '@ionic-native/gyroscope';
import { DeviceMotion } from '@ionic-native/device-motion';
import { NativeAudio } from '@ionic-native/native-audio';
import { VideoCapturePlus } from '@ionic-native/video-capture-plus';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { MediaCapture } from '@ionic-native/media-capture';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutPageModule } from '../pages/checkout/checkout.module';
import { CheckoutPage } from '../pages/checkout/checkout';
import { InfoPage } from '../pages/info/info';
import { ReviewPage } from '../pages/review/review';
import { MapPageModule } from '../pages/map/map.module';
import { MapPage } from '../pages/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { ProductProvider } from '../providers/product/product';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { ProductDetailsPageModule } from '../pages/product-details/product-details.module';
import { StyleModalPage } from '../pages/checkout/style-modal/style-modal';
import { SizeModalPage } from '../pages/checkout/size-modal/size-modal';
import { TailorModalPage } from '../pages/checkout/tailor-modal/tailor-modal';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    OnboardingPageModule,
    ProductListPageModule,
    ProductDetailsPageModule,
    MeasurementTutorialPageModule,
    VideoMeasurementPageModule,
    CheckoutPageModule,
    MapPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OnboardingPage,
    HomePage,
    ProductListPage,
    ProductDetailsPage,
    FilterModalPage,
    MeasurementTutorialPage,
    VideoMeasurementPage,
    CheckoutPage,
    StyleModalPage,
    SizeModalPage,
    TailorModalPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MediaCapture,
    VideoCapturePlus,
    VideoPlayer,
    NativeAudio,
    AndroidPermissions,
    Gyroscope,
    Geolocation,
    DeviceMotion,
    CategoryProvider,
    GoogleMaps,
    ProductProvider
  ]
})
export class AppModule {}
