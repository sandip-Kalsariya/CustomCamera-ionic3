import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Slides } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Diagnostic } from '@ionic-native/diagnostic';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('slides') slides: Slides;

  TopRGBA: [{ "color": any }, { "color": any }, { "color": any }, { "color": any }];
  BottomRGBA: [{ "color": any }, { "color": any }, { "color": any }, { "color": any }];
  CenterRGBA: [{ "color": any }, { "color": any }, { "color": any }, { "color": any }];
  LeftRGBA: [{ "color": any }, { "color": any }, { "color": any }, { "color": any }];
  RightRGBA: [{ "color": any }, { "color": any }, { "color": any }, { "color": any }];

  public picture;
  localized: boolean = false;

  private cameraPreviewOpts = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height - 200,
    camera: 'rear',
    toBack: false,
    tapPhoto: false,
    tapFocus: true,
    previewDrag: false
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public diagnostic: Diagnostic,
    private cameraPreview: CameraPreview,
    public toastCtrl: ToastController
  ) {

    this.checkPermissions();
  }

  initializePreview() {
    // for start Camera
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res)
        //Get Refresh image pixel Color Code evey 1 Second
        setInterval(() => {
          this.takePhoto();
        }, 1000);
      },
      (err) => {
        //error if camera not Start
        console.log(err)
      });
  }

  checkPermissions() {
    // for access Camera Permition Alert Box 
    this.diagnostic.isCameraAuthorized().then((authorized) => {
      if (authorized) {
        this.initializePreview();
      }
      else {
        this.diagnostic.requestCameraAuthorization().then((status) => {
          if (status == this.diagnostic.permissionStatus.GRANTED)
            this.initializePreview();
          else {
            console.log("Cannot access camera");
            const toast = this.toastCtrl.create({
              message: 'Cannot access camera',
              duration: 3000,
              position: 'bottom',
            });
            toast.present();
          }
        });
      }
    });
  }

  takePhoto() {
    const pictureOpts: CameraPreviewPictureOptions = {
      width: window.screen.width,
      height: window.screen.height - 200,
      quality: 100,

    };
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      var base64 = this.picture;
      var img = new Image();

      img.src = this.picture;
      var imageheight = 0;
      var imagewidth = 0;
      var imageX = 0;
      var imageY = 0;
      var centerX = 0;
      var centerY = 0;
      // create canvas
      var cvs = document.createElement('canvas');
      cvs.width = 0;
      cvs.height = 0;

      // set all pixel Color Code Variable
      var TopRGBA: [{ "color": any }, { "color": any }, { "color": any }, { "color": any }];
      var BottomRGBA: [{ "color": any }, { "color": any }, { "color": any }, { "color": any }];
      var CenterRGBA: [{ "color": any }, { "color": any }, { "color": any }, { "color": any }];
      var LeftRGBA: [{ "color": any }, { "color": any }, { "color": any }, { "color": any }];
      var RightRGBA: [{ "color": any }, { "color": any }, { "color": any }, { "color": any }];


      img.onload = function () {
        imageheight = img.height;             //get image height
        imagewidth = img.width;               //get image width
        imageX = Math.round((img.width / 2)); //get image X position
        imageY = Math.round((img.height / 2));//get image Y position
        centerX = imageX - 1;                 //get image Center X position
        centerY = imageY - 1;                 //get image Center Y position


        cvs.width = imagewidth;
        cvs.height = imageheight;
        var ctx = cvs.getContext('2d');
        ctx.drawImage(img, 0, 0, imagewidth, imageheight);

        //get image data fron imageWidth and imageheight
        var idt = ctx.getImageData(0, 0, imagewidth, imageheight);

        //get pixel Position from image
        var Tind = (centerY - 1) * idt.width + centerX;
        var Bind = (centerY + 1) * idt.width + centerX;
        var Cind = centerY * idt.width + centerX;
        var Lind = centerY * idt.width + (centerX - 1);
        var Rind = centerY * idt.width + (centerX + 1);


        //for get pixel number
        var Ti = Tind * 4,
          Bi = Bind * 4,
          Ci = Cind * 4,
          Li = Lind * 4,
          Ri = Rind * 4,
          d = idt.data;

        TopRGBA = [{ "color": "R : " + d[Ti] }, { "color": "G : " + d[Ti + 1] }, { "color": "B : " + d[Ti + 2] }, { "color": "A : " + d[Ti + 3] }]    // returns array [red, green, blue, alpha] for Top Pixel 
        BottomRGBA = [{ "color": "R : " + d[Bi] }, { "color": "G : " + d[Bi + 1] }, { "color": "B : " + d[Bi + 2] }, { "color": "A : " + d[Bi + 3] }] // returns array [red, green, blue, alpha] for  Bottom Pixel
        CenterRGBA = [{ "color": "R : " + d[Ci] }, { "color": "G : " + d[Ci + 1] }, { "color": "B : " + d[Ci + 2] }, { "color": "A : " + d[Ci + 3] }] // returns array [red, green, blue, alpha] for Center Pixel
        LeftRGBA = [{ "color": "R : " + d[Li] }, { "color": "G : " + d[Li + 1] }, { "color": "B : " + d[Li + 2] }, { "color": "A : " + d[Li + 3] }]   // returns array [red, green, blue, alpha] for Left Pixel
        RightRGBA = [{ "color": "R : " + d[Ri] }, { "color": "G : " + d[Ri + 1] }, { "color": "B : " + d[Ri + 2] }, { "color": "A : " + d[Ri + 3] }]  // returns array [red, green, blue, alpha] for Right Pixel
      }

      setTimeout(() => {      // for display  all Color Code
        this.TopRGBA = TopRGBA;
        this.BottomRGBA = BottomRGBA;
        this.CenterRGBA = CenterRGBA;
        this.LeftRGBA = LeftRGBA;
        this.RightRGBA = RightRGBA;
      }, 300);

    }, (err) => {
      console.log(err);
    });
  }

  ionViewWillEnter() {
    this.slides.update();
    this.slides._allowSwipeToNext = false;
    this.slides._allowSwipeToPrev = false;
  }
}
