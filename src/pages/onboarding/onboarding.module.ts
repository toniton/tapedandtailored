import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnboardingPage } from './onboarding';
import { Slides } from 'ionic-angular/components/slides/slides';

@NgModule({
  declarations: [
    OnboardingPage,
  ],
  imports: [
    IonicPageModule.forChild(OnboardingPage),
  ]
})
export class OnboardingPageModule { }
