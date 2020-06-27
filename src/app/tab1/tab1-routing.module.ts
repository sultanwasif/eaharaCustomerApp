import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { FoodItemsComponent } from '../food-items/food-items.component';
import { MyCartComponent } from '../my-cart/my-cart.component';
import { CheckOutComponent } from '../check-out/check-out.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: Tab1Page
      },
      {
        path: 'food-items',
        component: FoodItemsComponent
      },
      {
        path: 'my-cart',
        component: MyCartComponent
      },
      {
        path: 'check-out',
        component: CheckOutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusRouteRoutingModule {}
