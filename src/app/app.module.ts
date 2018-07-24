import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule} from '@angular/common/http';
import { MenuPage } from '../pages/menu/menu';
import { MyApp } from './app.component';
import {InAppBrowser } from '@ionic-native/in-app-browser'
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Device } from '@ionic-native/device';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { NativeAudio } from '@ionic-native/native-audio';
import { Firebase } from '@ionic-native/firebase';
import { UtilsProvider } from '../providers/utils/utils';




@NgModule({
  declarations: [
    MyApp     
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['janeiro', 'fevereiro', 'março', 'abril', "maio", 'junho', 'julho', 'agosto',
        'setembro', 'outubro', 'novembro', 'dezembro'],
      monthShortNames: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set',
        'out', 'nov', 'dez'],
      dayNames: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 
        'quinta-feira', 'sexta-feira', 'sábado' ],
      dayShortNames: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ],
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    InAppBrowser,
    PhotoViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Device,
    SmartAudioProvider,
    NativeAudio,
    Firebase,
    UtilsProvider
  ]
})
export class AppModule {}
