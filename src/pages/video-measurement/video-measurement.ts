import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player';
import { VideoCapturePlus, VideoCapturePlusOptions, MediaFile } from '@ionic-native/video-capture-plus';
import { AndroidPermissions } from '@ionic-native/android-permissions';

/**
 * Generated class for the VideoMeasurementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video-measurement',
  templateUrl: 'video-measurement.html',
})
export class VideoMeasurementPage {

  constructor(
    private videoPlayer: VideoPlayer,
    private nativeAudio: NativeAudio,
    private videoCapturePlus: VideoCapturePlus,
    public navCtrl: NavController,
    public navParams: NavParams,
    private androidPermissions: AndroidPermissions
  ) {
  }
  
  ionViewDidLoad() {
    // alert('loaded');
  }

  ionViewDidEnter() {
    this.nativeAudio.preloadComplex('move-back', 'assets/move_back.mp3', 1, 1, 300).then(() => {
      this.playMoveBackAudio();
    });
    console.log('ionViewDidLoad VideoMeasurementPage');
    // alert('entered');
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => setTimeout(() => this.startVideoRecording(), 600) && console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  }

  playMoveBackAudio(): void {
    this.nativeAudio.play('move-back')
      .then(()=>this.startVideoRecording())
      .catch(console.log);
      // this.startVideoRecording();
  }

  playSpinVideo(): void {
    this.videoPlayer.play('file:///android_asset/www/assets/introduction.mp4', <VideoOptions> {
      scalingMode: 1
    }).then(()=>this.startVideoRecording());
    // throw new Error("Method not implemented.");
  }

  startVideoRecording(): void {
    const options: VideoCapturePlusOptions = {
      duration: 3000,
      limit: 1,
      highquality: true,
      // portraitOverlay: 'assets/img/camera/overlay/portrait.png',
      // landscapeOverlay: 'assets/img/camera/overlay/landscape.png',
      frontcamera: true
    }
    this.videoCapturePlus.captureVideo(options).then((mediafile: MediaFile[]) => console.log(mediafile), error => console.log('Something went wrong'));
  }

  ionViewDidLeave(): void {
    this.nativeAudio.unload('move-back').then(console.log);
  }

}
