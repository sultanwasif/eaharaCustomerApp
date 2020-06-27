import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, UserInfo } from '../core/auth.service';
import {
  AppDataService,
  DeviceInfo
} from '../core/app-data.service';
import { AuthGuard } from '../core/auth.guard';
import { AlertController } from '@ionic/angular';
import { env } from '../../environments/environment';
import { Device } from '@ionic-native/device/ngx';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

interface User {
  UserName?: string;
  Password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private user: User;
  email = '';
  password = '';
  loginQuery;
  subscribeQuery;
  envName;
  appVer;
  postId;

  constructor(
    private router: Router,
    private device: Device,
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService
    ) {
      this.envName = env.NAME.trim().length > 0 ? `${env.NAME}` : '';
      this.appVer = env.APPVER;
      const TokenInfo = this.authService.getTokenInfo();
      if (TokenInfo) {
        this.router.navigate(['/tabs/tab1']);
        }
    }

  ngOnInit() {
    // this.subscribeUser();
    this.email = '';
    this.password = '';

    const deviceInfo: DeviceInfo = {
      uuid: this.device.uuid ? this.device.uuid : '9999',
      osVer: this.device.version ? this.device.version : '-NA-',
      platform: this.device.platform ? this.device.platform : '-NA-',
      manufacturer: this.device.manufacturer
        ? this.device.manufacturer
        : '-NA-',
      serial: this.device.serial ? this.device.serial : '-NA-'
    };
    localStorage.setItem('device', JSON.stringify(deviceInfo));
    localStorage.setItem('deviceID', deviceInfo.uuid);
  }

  onSubmit() {
    if (this.email.trim().length === 0) {
      this.toastr.error( 'Phone No. Should not be null');
      return '';
    }
    if (this.password.trim().length === 0) {
      this.toastr.error( 'Password. Should not be null');
      return '';
    }
    this.user = {
      UserName: this.email,
      Password: this.password
    };

    this.http.post<any>(env.API + 'Login', this.user).subscribe(data => {
      this.postId = data.CustomerId;
      this.authService.setTokenInfo(data);
      this.router.navigate(['/tabs/tab1']);
  },
  err => console.log(err),
  );
  }

  // onForget() {
  //   debugger
  //   this.router.navigate(['/forgetpassword']);
  // }

}
