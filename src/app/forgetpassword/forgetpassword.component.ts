import { Component, OnInit } from '@angular/core';
import { env } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  userId;
  register: Register;
  envName;
  appVer;
  phone = '';
  otp = '';
  otpRcv = '';
  rstPassVw = false;
  password = '';
  cpassword = '';
  isNew = false;
  RegUser;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService) {
    this.envName = env.NAME.trim().length > 0 ? `${env.NAME}` : '';
    this.appVer = env.APPVER;  }

  ngOnInit() {
    this.userId = '';
    this.RegUser = {
      Id: '',
      Password: '',
      CPassword: ''
  };
  }
  SendOtp() {
    if (this.phone.trim().length === 0 || this.phone.trim().length !== 10 ) {
      this.toastr.error( 'Phone No. Should be 10 digits');
      return '';
    }

    this.http.get<any>(env.API + 'SendTroubleOtp/' + this.phone).subscribe(data => {
    if (data.Message == 'Done') {
      this.toastr.success('OTP Sent');
      this.otpRcv = data.OTP;
      this.isNew = false;
      //this.user.Id = data.UserId;
      this.userId = data.UserId;
      this.rstPassVw = true;
    } else if (data.Message == 'NotRegistered') {
      this.http.get<any>(env.API + 'SendRegisterOtp/' + this.phone).subscribe(data => {
        if (data == 2) {
          this.toastr.error( 'Mobile No Error !');
      } else if (data == 0) {
        this.toastr.error( 'Network Error !');
      } else {
        this.toastr.success( 'OTP Sent');
        this.isNew = true;
        this.rstPassVw = true;
        this.otpRcv = data;
        this.userId = '';
      }

      });
    } else {
      this.userId = '';
      this.toastr.error(data.Message);
    }
  });
  }

  onRegister() {
    if (this.password.trim().length == 0) {
      this.toastr.error( 'Password Should not be Blank');
      return '';
    }
    if (this.otp != this.otpRcv)
    {
      this.toastr.error( 'OTP Wrong')
      return '';
    };

    if (this.password != this.cpassword)
    {
      this.toastr.error( 'Password Not Matched')
      return '';
    }
    if (this.isNew) {
      
    this.register = {
      UserName: this.phone,
      Password: this.password,
      IsCheckedTerms: true,
      CustomerMMethods:[],
      MobileNo: this.phone
    };

    this.http.post<any>(env.API + 'RegisterCustomer', this.register).subscribe(data => {
      if (data == 1) {
        this.toastr.success('Successfully Registered');
        this.router.navigate(['/login']);
    } else if (data == 2) {
        this.toastr.error('Mobile Number Error');
        this.rstPassVw = false;
    } else {
      this.toastr.error('Network Error');
    }

    });
    } else {
      this.RegUser = {
        Id: this.userId,
        Password: this.password,
        CPassword: this.cpassword
    };
      this.http.post<any>(env.API + 'ChangePassword', this.RegUser).subscribe(data => {
      if (data) {
        this.toastr.success( 'Successfully Changed Password');
        this.router.navigate(['/login']);
    }
    },
  err => {
    this.toastr.error( 'Network Error');
  });
    }
  }

}
