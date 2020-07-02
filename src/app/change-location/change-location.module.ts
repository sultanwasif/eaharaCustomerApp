import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { ChangeLocationComponent } from './change-location.component';



@NgModule({
  declarations: [ChangeLocationComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    OrderModule
  ]
})
export class ChangeLocationModule { }
