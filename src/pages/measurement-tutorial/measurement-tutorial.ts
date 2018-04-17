import { Component, ViewChild, ElementRef, trigger, state, style, transition, animate } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { VideoPlayer, VideoOptions } from '@ionic-native/video-player';
import { NativeAudio } from '@ionic-native/native-audio';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion';
import { Subscription } from 'rxjs/Subscription';
import { VideoMeasurementPage } from '../video-measurement/video-measurement';

/**
 * Generated class for the MeasurementTutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export const SENSOR_FREQUENCY: number = 600;
export const PI: number = 3.141592;
export const ANGLE_0: number = 0.00;
export const ANGLE_90: number = 90.00;
export const ANGLE_180: number = 180.00;
export const INDICATOR_HEIGHT: number = 16;
export const MEASUREMENT_PAGE_TIMEOUT: number = 5000;

@IonicPage({
  defaultHistory: ['product-list']
})
@Component({
  selector: 'page-measurement-tutorial',
  templateUrl: 'measurement-tutorial.html',
  animations: [
    trigger('indicatorState', [
      state('inactive', style({
        backgroundColor: '#eee'
      })),
      state('active', style({
        backgroundColor: '#10E84D'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class MeasurementTutorialPage {
  public nextPageTimeout: number;
  public sensorAcceleration: DeviceMotionAccelerationData;
  public zAngle;
  public newArrowPosition: number;
  public level: any;
  public range: any;
  public rangeColor: string;
  public isplayingLevelAudio: boolean = false;
  public acceleratorSubscription: Subscription;

  @ViewChild("arrow") arrow: ElementRef;
  @ViewChild("levelBar") levelBar: ElementRef;
  @ViewChild("indicatorRange") indicatorRange: ElementRef;

  constructor(
    private videoPlayer: VideoPlayer,
    private nativeAudio: NativeAudio,
    private deviceMotion: DeviceMotion,
    public navCtrl: NavController) {
    // this.playVideo();
  }

  ionViewDidLoad() {
    this.setLevelBarPosition();
  }

  setLevelBarPosition() {
    this.range = this.getOffsetFromDegree(72);
  }

  ionViewDidEnter() {
    // this.acceleratorSubscription = this.startWatchingAcceleration();
    this.startWatchingAcceleration();
    this.nativeAudio.preloadComplex('set-level-audio', 'assets/set_level_repeat.mp3', 1, 1, 300).then(() => {
      this.playSetLevelAudio();
    });
  }

  playVideo(): void {
    this.videoPlayer.play('file:///android_asset/www/assets/introduction.mp4', <VideoOptions>{
      scalingMode: 1
    }).then(() => this.navCtrl.push(VideoMeasurementPage))
    .catch((err) => console.log(err));
  }

  playSetLevelAudio(): void {
    this.isplayingLevelAudio = true;
    this.nativeAudio.play('set-level-audio', () => this.isplayingLevelAudio = false)
      .then(console.log)
      .catch(console.log);
  }

  stopSetLevelAudio(): void {
    this.nativeAudio.stop('set-level-audio')
      .then(() => this.isplayingLevelAudio = false);
  }

  // startWatchingAcceleration(): Subscription {
  //   let options: DeviceMotionAccelerometerOptions = {
  //     frequency: SENSOR_FREQUENCY
  //   };
  //   this.deviceMotion.getCurrentAcceleration().then(
  //     (acceleration: DeviceMotionAccelerationData) => {
  //       this.sensorAcceleration = acceleration;
  //     },
  //     (error: any) => console.log(error)
  //   );
  //   return this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
  //     this.zAngle = this.computeAngleOfPhoneFromFloor(acceleration);
  //     this.newArrowPosition = this.getOffsetFromDegree(this.zAngle);
  //     this.detectArrowInRange(this.newArrowPosition) == true ? this.goToVideoMeasurement() : this.clearVideoMeasurement();
  //   });
  // }

  startWatchingAcceleration(): void {
    let options: DeviceMotionAccelerometerOptions = {
      frequency: SENSOR_FREQUENCY
    };
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => {
        this.sensorAcceleration = acceleration;
      },
      (error: any) => console.log(error)
    );
    this.acceleratorSubscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.zAngle = this.computeAngleOfPhoneFromFloor(acceleration);
      this.newArrowPosition = this.getOffsetFromDegree(this.zAngle);
      this.detectArrowInRange(this.newArrowPosition) == true ? this.goToVideoMeasurement() : this.clearVideoMeasurement();
    });
  }

  computeAngleOfPhoneFromFloor(acceleration): any {
    let zAngle = Math.atan(Math.sqrt(Math.pow(acceleration.x, 2) + Math.pow(acceleration.y, 2)) / acceleration.z);
    zAngle *= ANGLE_180;
    zAngle /= PI;
    return zAngle;
  }

  getOffsetFromDegree(zAngle): any {
    zAngle = Math.round(zAngle);
    if (zAngle >= ANGLE_90) {
      zAngle = ANGLE_90;
    } else if (zAngle <= ANGLE_0) {
      zAngle = ANGLE_0;
    }
    // 90 degrees, the highest reference point
    let maxBarLevel = this.levelBar.nativeElement.offsetTop - (this.levelBar.nativeElement.height / 2);
    // 0 degrees, the lowest reference point
    let minBarLevel = maxBarLevel + this.levelBar.nativeElement.height;

    let zAngleOffset = minBarLevel - ((zAngle * this.levelBar.nativeElement.height) / ANGLE_90);
    if (zAngleOffset > minBarLevel) {
      return minBarLevel;
    }
    if (zAngleOffset < maxBarLevel) {
      return maxBarLevel;
    }
    return zAngleOffset;
  }

  detectArrowInRange(newArrowPosition): boolean {
    let isInRange = (this.newArrowPosition >= this.range) && (this.newArrowPosition <= (this.range + INDICATOR_HEIGHT));
    this.rangeColor = isInRange ? "#10E84D" : "#F93C28";
    if (!this.isplayingLevelAudio) {
      let playing = (!isInRange) ? this.playSetLevelAudio() : this.stopSetLevelAudio();
    }
    return isInRange;
  }

  goToVideoMeasurement() {
    if (this.nextPageTimeout === null) {
      this.nextPageTimeout = setTimeout(() => this.playVideo(), MEASUREMENT_PAGE_TIMEOUT);
    }
  }

  clearVideoMeasurement() {
    clearTimeout(this.nextPageTimeout);
    this.nextPageTimeout = null;
  }

  ionViewDidLeave(): void {
    this.stopSetLevelAudio();
    this.clearVideoMeasurement();
    this.nativeAudio.unload('set-level-audio').then(console.log);
    this.acceleratorSubscription.unsubscribe();
  }

}
