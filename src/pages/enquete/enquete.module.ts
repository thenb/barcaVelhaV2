import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnquetePage } from './enquete';

@NgModule({
  declarations: [
    EnquetePage,
  ],
  imports: [
    IonicPageModule.forChild(EnquetePage),
  ],
  exports: [
    EnquetePage
  ]
})
export class EnquetePageModule {}
