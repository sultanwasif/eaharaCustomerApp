import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { IonicModule } from '@ionic/angular';
import { YourAddressComponent } from './your-address.component';



@NgModule({
  declarations: [YourAddressComponent],
  imports: [
    CommonModule,
    FormsModule,
    OrderModule,
    IonicModule.forRoot()
  ]
})
export class YourAddressModule { }
