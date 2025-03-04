import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Camera } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Diagnostic } from '@ionic-native/diagnostic';
@NgModule({
  declarations: [
  MyApp,
  HomePage
  ],
  imports: [
  BrowserModule,
  IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  HomePage
  ],
  providers: [
  StatusBar,
  SplashScreen,
  Camera,
  CameraPreview,Diagnostic,
  {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
