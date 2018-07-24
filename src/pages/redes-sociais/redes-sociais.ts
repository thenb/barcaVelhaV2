import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { UtilsProvider } from '../../providers/utils/utils';
import { CONFIG } from '../../config/config_global';

/**
 * Generated class for the Tab2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-redes-sociais',
  templateUrl: 'redes-sociais.html',
})

export class RedesSociaisPage { 


private is_online : boolean; 

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      private http: HttpClient,
       public loadingController: LoadingController,
       private utilsProvider: UtilsProvider,
       private smartAudioProvider: SmartAudioProvider) {

        this.smartAudioProvider.preload('howl', 'assets/audio/howl.mp3'); 
        let loader = this.loadingController.create({
          content: "Carregando"
        }); 
        
        loader.present(); 
        this.http.get(CONFIG.url_twitch_api,  
          {
            headers: { 'Content-Type': 'application/json', 'Client-Id': CONFIG.id_client_twitch }
          })
          .toPromise().then(data => {
            var streamon = data["stream"];              
            window.localStorage.setItem('status_twitch', streamon);         
            let is_online_temp = window.localStorage.getItem('status_twitch');    
            if(is_online_temp==='null'){
              this.is_online = false;  
            }else{              
              this.is_online = true; 
              this.smartAudioProvider.play('howl');     
            }
            loader.dismiss();     
          }).catch(error => {
            console.log(error.status);
          });       
 }
 
 openWebpage(url : string) {  
  this.utilsProvider.openWebpage(url);
 }
 
}
