import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { FoodItemsComponent } from '../food-items/food-items.component';


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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusRouteRoutingModule {}
