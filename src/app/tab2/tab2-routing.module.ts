import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCartComponent } from '../my-cart/my-cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { Tab2Page } from './tab2.page';
import { MyTrackComponent } from './my-track/my-track.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: Tab2Page
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent
      },
      {
        path: 'my-track',
        component: MyTrackComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackRouteRoutingModule {}
