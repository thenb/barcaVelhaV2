import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { CONFIG } from '../../config/config_global';
import { UtilsProvider } from '../../providers/utils/utils'
/**
 * Generated class for the News page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mensagens',
  templateUrl: 'mensagens.html',
})
export class MensagensPage {

  msgs: any;
  curtindo: boolean;
  private is_online : boolean;  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    public loadingController: LoadingController,
    private utilsProvider: UtilsProvider) {
      
    this.curtindo= false;
    let is_online_temp = window.localStorage.getItem('status_twitch');
    if(is_online_temp==='null'){
      this.is_online = false;  
    }else{
      this.is_online = true;
    }
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: "Carregando"
    }); 
    loader.present();
    this.getAllMensagems()
    loader.dismiss();
  }

  curtir(mensagem: any) {  
    if(mensagem.curtido){
      mensagem.curtido = false;
    }else{
      mensagem.curtido = true;
    }
    let id_usuario = window.localStorage.getItem('id_usuario'); 
    let params= {
      id_usuario : id_usuario,
      id_mensagem: mensagem.id,
      curtido: mensagem.curtido        
    };
    let loader = this.loadingController.create({
      content: "Carregando"
    }); 
    loader.present();
    
    this.http.post(CONFIG.url_api+'curtirMsg', params, 
    {
      headers: { 'Content-Type': 'application/json' }
    })
    .toPromise().then(data => {
      loader.dismiss();
      this.getAllMensagems()
    }).catch(error => {
      console.log(error.status);
    });
  }

  getAllMensagems() {
    let id_usuario = window.localStorage.getItem('id_usuario');     
    let params= {
      id_usuario : id_usuario            
    };
    this.http.post(CONFIG.url_api+'getAllMsgs', params, 
    {
      headers: { 'Content-Type': 'application/json' }
    })
    .toPromise().then(data => {
      this.msgs = data;     
    }).catch(error => {
      console.log(error.status);
    });
  }

  openWebpage(url : string) {  
    this.utilsProvider.openWebpage(url);
   }

   doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getAllMensagems();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }


}