import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { YourProfileComponent } from './your-profile.component';



@NgModule({
  declarations: [YourProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    OrderModule,
    IonicModule.forRoot()
  ]
})
export class YourProfileModule { }
