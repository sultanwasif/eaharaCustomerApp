import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodItemsComponent } from './food-items.component';
// import {  AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { Device } from '@ionic-native/device/ngx';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';

@NgModule({
  declarations: [FoodItemsComponent],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    OrderModule,
    FilterPipeModule,
    // AngularFontAwesomeModule
  ],
  providers: [Device]
})
export class FoodItemsModule {
}
