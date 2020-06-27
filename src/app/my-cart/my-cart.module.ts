import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { MyCartComponent } from './my-cart.component';



@NgModule({
  declarations: [MyCartComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    OrderModule
  ]
})
export class MyCartModule { }
