import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { YourAddressModule } from './your-address/your-address.module';
import { YourProfileModule } from './your-profile/your-profile.module';
import { MyCartModule } from '../my-cart/my-cart.module';
import { ProfileRouteRoutingModule } from './tab3-routing.module';
import { ChangePasswordModule } from './change-password/change-password.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    YourAddressModule,
    YourProfileModule,
    MyCartModule,
    ProfileRouteRoutingModule,
    ChangePasswordModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
