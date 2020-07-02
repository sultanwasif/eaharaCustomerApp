import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { YourProfileComponent } from './your-profile/your-profile.component';
import { YourAddressComponent } from './your-address/your-address.component';
import { MyCartComponent } from '../my-cart/my-cart.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: Tab3Page
      },
      {
        path: 'your-profile',
        component: YourProfileComponent
      },
      {
        path: 'your-address',
        component: YourAddressComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRouteRoutingModule {}
