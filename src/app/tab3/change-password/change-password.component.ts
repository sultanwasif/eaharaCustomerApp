import { Component, OnInit } from '@angular/core';
import { env } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
UserUpdate;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.UserUpdate = {
      Password: '',
      CPassword: '',
      Id: '',
  };
  }

  changePassword() {
    const TokenInfo = this.authService.getTokenInfo();
    if (TokenInfo) {
      this.UserUpdate.Id = TokenInfo.UserId;
        }

    if (this.UserUpdate.Password) {
      this.toastr.error( 'Enter Password');
                } else if (this.UserUpdate.CPassword) {
                  this.toastr.error( 'Enter Confirm Password');
                } else if (this.UserUpdate.Password !== this.UserUpdate.CPassword) {
                  this.toastr.error( 'Password Not Matched');
                  this.UserUpdate = {
                        Password: '',
                        CPassword: ''
                    };
                } else {
    this.http.post<any>(env.API + 'ChangePassword', this.UserUpdate).subscribe(data => {
      if (data) {
        this.toastr.error( 'Successfully Changed Password');
        this.UserUpdate = {
            Password: '',
            CPassword: ''
        };
    }
    });
  }
  }

}
