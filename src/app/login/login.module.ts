import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";
// import {  AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from "@angular/forms";
import { Device } from "@ionic-native/device/ngx";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    LoginRoutingModule,
    FormsModule
    // AngularFontAwesomeModule
  ],
  providers: [Device]
})
export class LoginModule {}
