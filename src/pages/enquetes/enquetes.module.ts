import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnquetesPage } from './enquetes';

@NgModule({
  declarations: [
    EnquetesPage,
  ],
  imports: [
    IonicPageModule.forChild(EnquetesPage),
  ],
  exports: [
    EnquetesPage
  ]
})
export class EnquetesPageModule {}
