import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RedesSociaisPage } from './redes-sociais';

@NgModule({
  declarations: [
    RedesSociaisPage,
  ],
  imports: [
    IonicPageModule.forChild(RedesSociaisPage),
  ],
  exports: [
    RedesSociaisPage
  ]
})
export class RedesSociaisPageModule {}
