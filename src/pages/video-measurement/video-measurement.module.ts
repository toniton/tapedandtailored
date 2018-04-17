import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoMeasurementPage } from './video-measurement';

@NgModule({
  declarations: [
    VideoMeasurementPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoMeasurementPage),
  ],
})
export class VideoMeasurementPageModule {}
