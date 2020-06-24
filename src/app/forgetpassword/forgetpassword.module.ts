import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ForgetpasswordComponent } from "./forgetpassword.component";
import { ForgetpasswordRoutingModule } from "./forgetpassword-routing.module";
// import {  AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from "@angular/forms";
import { Device } from "@ionic-native/device/ngx";

@NgModule({
  declarations: [ForgetpasswordComponent],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    ForgetpasswordRoutingModule,
    FormsModule
    // AngularFontAwesomeModule
  ],
  providers: [Device]
})
export class ForgetpasswordModule {
}
