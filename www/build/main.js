webpackJsonp([0],{

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera_preview__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, diagnostic, cameraPreview, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.diagnostic = diagnostic;
        this.cameraPreview = cameraPreview;
        this.toastCtrl = toastCtrl;
        this.localized = false;
        this.cameraPreviewOpts = {
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
        this.checkPermissions();
    }
    HomePage.prototype.initializePreview = function () {
        var _this = this;
        // for start Camera
        this.cameraPreview.startCamera(this.cameraPreviewOpts).then(function (res) {
            console.log(res);
            //Get Refresh image pixel Color Code evey 1 Second
            setInterval(function () {
                _this.takePhoto();
            }, 1000);
        }, function (err) {
            //error if camera not Start
            console.log(err);
        });
    };
    HomePage.prototype.checkPermissions = function () {
        var _this = this;
        // for access Camera Permition Alert Box 
        this.diagnostic.isCameraAuthorized().then(function (authorized) {
            if (authorized) {
                _this.initializePreview();
            }
            else {
                _this.diagnostic.requestCameraAuthorization().then(function (status) {
                    if (status == _this.diagnostic.permissionStatus.GRANTED)
                        _this.initializePreview();
                    else {
                        console.log("Cannot access camera");
                        var toast = _this.toastCtrl.create({
                            message: 'Cannot access camera',
                            duration: 3000,
                            position: 'bottom',
                        });
                        toast.present();
                    }
                });
            }
        });
    };
    HomePage.prototype.takePhoto = function () {
        var _this = this;
        var pictureOpts = {
            width: window.screen.width,
            height: window.screen.height - 200,
            quality: 100,
        };
        this.cameraPreview.takePicture(pictureOpts).then(function (imageData) {
            _this.picture = 'data:image/jpeg;base64,' + imageData;
            var base64 = _this.picture;
            var img = new Image();
            img.src = _this.picture;
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
            var TopRGBA;
            var BottomRGBA;
            var CenterRGBA;
            var LeftRGBA;
            var RightRGBA;
            img.onload = function () {
                imageheight = img.height; //get image height
                imagewidth = img.width; //get image width
                imageX = Math.round((img.width / 2)); //get image X position
                imageY = Math.round((img.height / 2)); //get image Y position
                centerX = imageX - 1; //get image Center X position
                centerY = imageY - 1; //get image Center Y position
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
                var Ti = Tind * 4, Bi = Bind * 4, Ci = Cind * 4, Li = Lind * 4, Ri = Rind * 4, d = idt.data;
                TopRGBA = [{ "color": "R : " + d[Ti] }, { "color": "G : " + d[Ti + 1] }, { "color": "B : " + d[Ti + 2] }, { "color": "A : " + d[Ti + 3] }]; // returns array [red, green, blue, alpha] for Top Pixel 
                BottomRGBA = [{ "color": "R : " + d[Bi] }, { "color": "G : " + d[Bi + 1] }, { "color": "B : " + d[Bi + 2] }, { "color": "A : " + d[Bi + 3] }]; // returns array [red, green, blue, alpha] for  Bottom Pixel
                CenterRGBA = [{ "color": "R : " + d[Ci] }, { "color": "G : " + d[Ci + 1] }, { "color": "B : " + d[Ci + 2] }, { "color": "A : " + d[Ci + 3] }]; // returns array [red, green, blue, alpha] for Center Pixel
                LeftRGBA = [{ "color": "R : " + d[Li] }, { "color": "G : " + d[Li + 1] }, { "color": "B : " + d[Li + 2] }, { "color": "A : " + d[Li + 3] }]; // returns array [red, green, blue, alpha] for Left Pixel
                RightRGBA = [{ "color": "R : " + d[Ri] }, { "color": "G : " + d[Ri + 1] }, { "color": "B : " + d[Ri + 2] }, { "color": "A : " + d[Ri + 3] }]; // returns array [red, green, blue, alpha] for Right Pixel
            };
            setTimeout(function () {
                _this.TopRGBA = TopRGBA;
                _this.BottomRGBA = BottomRGBA;
                _this.CenterRGBA = CenterRGBA;
                _this.LeftRGBA = LeftRGBA;
                _this.RightRGBA = RightRGBA;
            }, 300);
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.slides.update();
        this.slides._allowSwipeToNext = false;
        this.slides._allowSwipeToPrev = false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('slides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Slides */])
    ], HomePage.prototype, "slides", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"E:\Devalopment\Application\ionic\ionic3\CamApp-6-9-19\CamApp\src\pages\home\home.html"*/'<ion-content>\n\n  <ion-slides style="height: calc(100% - 100px);" #slides (ionSlideWillChange)="onSlideChangeStart($event)" pager dir="rtl">\n\n  </ion-slides>\n\n  <div ion-item>\n\n    <label>Top -></label>\n\n    <label class="colorLable" *ngFor="let item of TopRGBA"> {{item.color}}</label>\n\n  </div>\n\n  <div ion-item>\n\n    <label>Bottom -></label>\n\n    <label class="colorLable" *ngFor="let item of BottomRGBA"> {{item.color}}</label>\n\n  </div>\n\n  <div ion-item>\n\n    <label>Center -></label>\n\n    <label class="colorLable" *ngFor="let item of CenterRGBA"> {{item.color}}</label>\n\n  </div>\n\n  <div ion-item>\n\n    <label>Left -></label>\n\n    <label class="colorLable" *ngFor="let item of LeftRGBA"> {{item.color}}</label>\n\n  </div>\n\n  <div ion-item>\n\n    <label>Right -></label>\n\n    <label class="colorLable" *ngFor="let item of RightRGBA"> {{item.color}}</label>\n\n  </div>\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"E:\Devalopment\Application\ionic\ionic3\CamApp-6-9-19\CamApp\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera_preview__["a" /* CameraPreview */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(219);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera_preview__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_diagnostic__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera_preview__["a" /* CameraPreview */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_diagnostic__["a" /* Diagnostic */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Devalopment\Application\ionic\ionic3\CamApp-6-9-19\CamApp\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"E:\Devalopment\Application\ionic\ionic3\CamApp-6-9-19\CamApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[196]);
//# sourceMappingURL=main.js.map