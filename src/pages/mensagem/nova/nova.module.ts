import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaPage } from './nova';

@NgModule({
  declarations: [
    NovaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaPage),
  ],
  exports: [
    NovaPage
  ]
})
export class NovaPageModule {}
