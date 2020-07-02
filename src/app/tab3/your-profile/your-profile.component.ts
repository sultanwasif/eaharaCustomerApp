import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth.service';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrls: ['./your-profile.component.scss'],
})
export class YourProfileComponent implements OnInit {
  Profile;
  TokenInfo: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.TokenInfo = this.authService.getTokenInfo();
    this.Profile = {};
    this.http.get<any>(env.API + 'CustomerById/' + this.TokenInfo.CustomerId).subscribe(data => {
      this.Profile = data;
      },
  err => console.log(err),
  );
  }

  SaveProfile() {

    this.http.post<any>(env.API + 'updateCustomer', this.Profile).subscribe(data => {
      if (data) {
        this.toastr.success( 'Successfully Updated Profile');
    }
    },
  err => {
    this.toastr.error( 'Network Error');
  });
}

}
