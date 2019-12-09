var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, camera) {
        this.navCtrl = navCtrl;
        this.camera = camera;
    }
    HomePage.prototype.openCamara = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
            // this.base64Image = normalizeURL(imagePath);
            var base64 = _this.base64Image;
            var img = new Image();
            console.log("img", img);
            var imageheight = 0;
            var imagewidth = 0;
            var imageX = 0;
            var imageY = 0;
            var centerX = 0;
            var centerY = 0;
            img.onload = function () {
                imageheight = img.height;
                imagewidth = img.width;
                imageX = Math.round((img.width / 2));
                imageY = Math.round((img.height / 2));
                centerX = imageX - 1;
                centerY = imageY - 1;
                console.log("height", imageheight + " / " + "width", imagewidth);
                console.log("imageX : ", imageX, "imageY : ", imageY);
                console.log("centerX : ", centerX, "centerY : ", centerY);
                var pixelData = img.drawImage(img, 0, 0, img.width, img.height);
                var imageData = context.getImageData(x, y, width, height);
                //color at (x,y) position
                var color = [];
                color['red'] = imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 0];
                color['green'] = imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 1];
                color['blue'] = imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 2];
            };
            img.src = _this.base64Image;
        }, function (err) {
            // Handle error
        });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, Camera])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map