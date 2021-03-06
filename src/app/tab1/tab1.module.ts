import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { BusRouteRoutingModule } from './tab1-routing.module';
import { FoodItemsModule } from '../food-items/food-items.module';
import { MyCartModule } from '../my-cart/my-cart.module';
import { CheckOutModule } from '../check-out/check-out.module';
import { ChangeLocationModule } from '../change-location/change-location.module';
import { SearchGlobalComponent } from './search-global/search-global.component';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ExapandableComponent } from '../exapandable/exapandable.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    BusRouteRoutingModule,
    FoodItemsModule,
    MyCartModule,
    CheckOutModule,
    ChangeLocationModule,
    OrderModule,
    FilterPipeModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page, SearchGlobalComponent, ExapandableComponent]
})
export class Tab1PageModule {}
