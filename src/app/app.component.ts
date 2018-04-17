import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { Storage } from '@ionic/storage';
import * as Constants from '../config/constants';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private storage: Storage) {
    this.storage.get(Constants.ONBOARDING_SEEN)
      .then((hasSeenOnBoarding) => {
        if (hasSeenOnBoarding) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = OnboardingPage;
        }
        this.platformReady();
      });
  }

  platformReady(): any {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
}

