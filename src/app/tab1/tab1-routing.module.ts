import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { FoodItemsComponent } from '../food-items/food-items.component';
import { MyCartComponent } from '../my-cart/my-cart.component';
import { CheckOutComponent } from '../check-out/check-out.component';
import { ChangeLocationComponent } from '../change-location/change-location.component';


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
      },
      {
        path: 'change-location',
        component: ChangeLocationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusRouteRoutingModule {}
