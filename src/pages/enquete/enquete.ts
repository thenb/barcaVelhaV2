import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, DateTime } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { ToastController } from 'ionic-angular';
import { CONFIG } from '../../config/config_global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CONTENT } from '../../assets/content/content';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the Tab2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-enquete',
  templateUrl: 'enquete.html',
})
export class EnquetePage {

  private enquete : FormGroup;
  private is_online : boolean;
  private descricao: string;
  private data_fim: DateTime;
  private opcao_1: boolean; 
  private opcao_2: boolean; 
  private opcao_3: boolean; 
  private opcao_4: boolean;    

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private http: HttpClient, public loadingController: LoadingController,
    private toastCtrl: ToastController,  private formBuilder: FormBuilder, 
    private utilsProvider: UtilsProvider) {

      this.enquete = this.formBuilder.group({
        descricao: ['', Validators.required],
        data_fim: ['', Validators.required],
        opcao_1: [''],
        opcao_2: [''],
        opcao_3: [''],
        opcao_4: ['']
      });
  }

  cancelar() {  
    this.navCtrl.setRoot('MenuPage');
  }

  criarEnquete(){   
    if(!this.enquete.valid){     
      this.presentToast(CONTENT.Enquete.erroCampoObrigatorio);
    } else if (this.verificarOpcoes()){     
      this.presentToast(CONTENT.Enquete.erroOpcoes);
    }else{
      let params= {
        descricao : this.descricao,
        data_fim: this.data_fim,
        opcao_1: this.opcao_1,  
        opcao_2: this.opcao_2,  
        opcao_3: this.opcao_3,  
        opcao_4: this.opcao_4          
      };
      this.http.post(CONFIG.url_api+'newPoll', params, 
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

  verificarOpcoes(){
    var opcoesSelecionadas = 0;
    if(this.enquete.controls['opcao_1'].value != null && this.enquete.controls['opcao_1'].value.replace(/ /g,'') != ''){
      opcoesSelecionadas++;
    }
    
    if(this.enquete.controls['opcao_2'].value != null && this.enquete.controls['opcao_2'].value.replace(/ /g,'') != ''){
      opcoesSelecionadas++;
    }
    
    if(this.enquete.controls['opcao_3'].value != null && this.enquete.controls['opcao_3'].value.replace(/ /g,'') != ''){
      opcoesSelecionadas++;
    }
    
    if(this.enquete.controls['opcao_4'].value != null && this.enquete.controls['opcao_4'].value.replace(/ /g,'') != ''){
      opcoesSelecionadas++;
    }

    if(opcoesSelecionadas > 1){
      return false;
    }else{
      return true;
    }
  }
  
  openWebpage(url : string) {  
    this.utilsProvider.openWebpage(url);
   }

}
