import { Component, OnInit } from '@angular/core';
import { env } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../core/auth.service';
import { ToastrService } from 'ngx-toastr';

interface Register {
  UserName?: string;
  Password?: string;
  IsCheckedTerms?: boolean;
  CustomerMMethods?: any;
  MobileNo: string;
}

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent implements OnInit {
  private user: UserInfo;
  private register: Register;
  envName;
  appVer;
  phone = '';
  otp = '';
  otpRcv = '';
  rstPassVw = false;
  password = '';
  cpassword = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService) {
    this.envName = env.NAME.trim().length > 0 ? `${env.NAME}` : '';
    this.appVer = env.APPVER;  }

  ngOnInit() {}
  SendOtp() {
    if (this.phone.trim().length === 0 || this.phone.trim().length !== 10 ) {
      this.toastr.error('Error', 'Phone No. Should be 10 digits');
      return '';
    }

    this.http.get<any>(env.API + 'SendTroubleOtp/' + this.phone).subscribe(data => {
    if (data.Message == 'Done') {
      this.toastr.success('OTP Sent');
      this.otpRcv = data.OTP;
      this.user.Id = data.UserId;
      this.rstPassVw = true;
    } else if (data.Message == 'NotRegistered') {
      this.http.get<any>(env.API + 'SendRegisterOtp/' + this.phone).subscribe(data => {
        if (data == 2) {
          this.toastr.error('Error', 'Mobile No Error !');
      } else if (data == 0) {
        this.toastr.error('Error', 'Network Error !');
      } else {
        this.toastr.success('Success', 'OTP Sent');
        this.rstPassVw = true;
        this.otpRcv = data;
        this.user.Id = '';
      }

      });
    }
    else {
          this.user.Id = '';          
          this.toastr.error('Error',data.Message);
    }
  });
  }

  onRegister() {
    debugger
    if (this.password.trim().length == 0) {
      this.toastr.error('Error','Password Should not be Blank')
      return ''; 
    };
    if (this.otp !== this.otpRcv)
    {
      this.toastr.error('Error','OTP Wrong')
      return '';      
    };

    if (this.password !== this.cpassword)
    {
      this.toastr.error('Error','Password Not Matched')
      return '';      
    };
    
    this.register = {
      UserName: this.phone,
      Password: this.password,
      IsCheckedTerms: true,
      CustomerMMethods:[],
      MobileNo: this.phone
    };

    this.http.post<any>(env.API + 'RegisterCustomer', this.register).subscribe(data => {
      if (data == 1) {
        this.toastr.success('Success','Successfully Registered')
        this.router.navigate(['/login']);
    } else if (data == 2) {
        this.toastr.error('Error','Mobile Number Error')
        this.rstPassVw = false;
    } else {
      this.toastr.error('Error','Network Error')
    }

    });
  }

}
