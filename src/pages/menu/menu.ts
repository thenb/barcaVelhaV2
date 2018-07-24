import { PageInterface } from './menu';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { AlertController, Platform } from 'ionic-angular';


export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
  providers: [AuthService]
})
export class MenuPage {

  rootPage = 'TabsPage';

  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    { title: 'Nova Mensagem', pageName: 'NovaPage', tabComponent: 'NovaPage', index: 0, icon: 'book' },
    { title: 'Nova Enquete', pageName: 'EnquetePage', tabComponent: 'EnquetePage', index: 1, icon: 'calendar' }
  ]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    private alertCtrl: AlertController,
    private platform: Platform) {  }

  openPage(page: PageInterface) {   
    this.nav.setRoot(page.pageName);
  }

  isActive(page: PageInterface) {
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
  }

  doLogout() {
    this.auth.logout();
    this.navCtrl.setRoot('LoginPage');
  }  


  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Deseja Sair?',
      message: 'Você deseja sair do aplicativo?',
      buttons: [
        {
          text: 'Não',
          role: 'nao',
          handler: () => { }
        },
        {
          text: 'Sim',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }
}
