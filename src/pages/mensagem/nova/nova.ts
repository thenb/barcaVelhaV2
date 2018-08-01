import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, DateTime,  } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { ToastController } from 'ionic-angular';
import { CONFIG } from '../../../config/config_global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CONTENT } from '../../../assets/content/content';
import { UtilsProvider } from '../../../providers/utils/utils';

/**
 * Generated class for the Tab2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nova',
  templateUrl: 'nova.html',
})
export class NovaPage {

  private mensagem: FormGroup; 
  private is_online : boolean;  
  private descricao: string;
  private data: DateTime;
  private on_fire: boolean;
  private is_hidden : boolean;

  constructor(public navCtrl: NavController,  public navParams: NavParams, 
    private http: HttpClient,  public loadingController: LoadingController,
    private toastCtrl: ToastController,  private formBuilder: FormBuilder,
     private utilsProvider: UtilsProvider) 
    {
      this.is_hidden = false;
      this.mensagem = this.formBuilder.group({
        on_fire : [false],
        data_evento: ['', Validators.required],
        descricao: ['', Validators.required]
      });     
    }

  cancelar() {  
    this.navCtrl.setRoot('MenuPage');
  }
  
  enviarMensagem(){    
    if(!this.mensagem.valid){
      this.presentToast(CONTENT.Mensagem.erroCampoObrigatorio);
    }else{ 
      let params= {
        on_fire : this.on_fire,
        descricao: this.descricao,
        data_evento: this.data            
      };
      this.http.post(CONFIG.url_api+'newMsg', params, 
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .toPromise().then(data => {
        this.presentToast(data);
        this.navCtrl.setRoot('MenuPage');
        console.log(data);
      }).catch(error => {
        console.log(error.status);
      });
    }
  }


  presentToast(data) {
    
    let toast = this.toastCtrl.create({
      message: JSON.stringify(data),
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  openWebpage(url : string) {  
    this.utilsProvider.openWebpage(url);
   }

}
